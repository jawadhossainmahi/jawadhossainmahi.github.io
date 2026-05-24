# Real-Time Chat with Laravel Reverb & Livewire 3

Building a real-time chat system used to mean reaching for Node.js, Socket.io, or a third-party service like Pusher. Not anymore. **Laravel Reverb** is Laravel's own first-party WebSocket server, and paired with **Livewire 3**, you can build a fully reactive chat system without writing a single line of custom JavaScript.

This post walks you through the complete setup — from installation to live typing indicators.

---

## What We're Building

- Private one-to-one chat rooms
- Live message delivery via WebSockets
- Typing indicator ("User is typing…")
- Read receipts
- Zero JavaScript framework — all powered by Livewire

---

## Prerequisites

- PHP 8.2+
- Laravel 12
- Composer
- Node.js (for asset bundling)

---

## Step 1 — Install Laravel Reverb


```bash
composer require laravel/reverb
php artisan reverb:install
```

This publishes the Reverb config and adds the necessary environment variables to your `.env`.

```env
BROADCAST_CONNECTION=reverb

REVERB_APP_ID=my-app-id
REVERB_APP_KEY=my-app-key
REVERB_APP_SECRET=my-app-secret
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http

VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"
```

---

## Step 2 — Install Livewire 3

```bash
composer require livewire/livewire
```

Livewire 3 works with Laravel Echo under the hood to listen for broadcast events and re-render components automatically.

---

## Step 3 — Create the Message Model & Migration

```bash
php artisan make:model Message -m
```

{% raw %}
```php
// database/migrations/xxxx_create_messages_table.php
Schema::create('messages', function (Blueprint $table) {
    $table->id();
    $table->foreignId('sender_id')->constrained('users');
    $table->foreignId('receiver_id')->constrained('users');
    $table->text('body');
    $table->boolean('read')->default(false);
    $table->timestamps();
});
```
{% endraw %}

Run the migration:

```bash
php artisan migrate
```

---

## Step 4 — Create the Broadcast Event

```bash
php artisan make:event MessageSent
```

```php
// app/Events/MessageSent.php
<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use SerializesModels;

    public function __construct(public Message $message) {}

    public function broadcastOn(): PrivateChannel
    {
        // Private channel between sender and receiver
        $ids = collect([$this->message->sender_id, $this->message->receiver_id])->sort()->join('.');
        return new PrivateChannel("chat.{$ids}");
    }

    public function broadcastWith(): array
    {
        return [
            'id'        => $this->message->id,
            'body'      => $this->message->body,
            'sender_id' => $this->message->sender_id,
            'time'      => $this->message->created_at->format('h:i A'),
        ];
    }
}
```

> Using `ShouldBroadcastNow` skips the queue and fires instantly — ideal for chat.

---

## Step 5 — Authorize the Private Channel

{% raw %}
```php
// routes/channels.php
use App\Models\User;

Broadcast::channel('chat.{ids}', function (User $user, string $ids) {
    $parts = explode('.', $ids);
    return in_array($user->id, array_map('intval', $parts));
});
```
{% endraw %}

---

## Step 6 — Build the Livewire Chat Component

```bash
php artisan make:livewire Chat
```

{% raw %}
```php
// app/Livewire/Chat.php
<?php

namespace App\Livewire;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\On;
use Livewire\Component;

class Chat extends Component
{
    public int $receiverId;
    public string $body = '';
    public array $messages = [];

    public function mount(int $receiverId): void
    {
        $this->receiverId = $receiverId;
        $this->loadMessages();
    }

    public function loadMessages(): void
    {
        $userId = Auth::id();
        $this->messages = Message::query()
            ->where(fn($q) => $q->where('sender_id', $userId)->where('receiver_id', $this->receiverId))
            ->orWhere(fn($q) => $q->where('sender_id', $this->receiverId)->where('receiver_id', $userId))
            ->orderBy('created_at')
            ->get()
            ->map(fn($m) => [
                'id'        => $m->id,
                'body'      => $m->body,
                'sender_id' => $m->sender_id,
                'time'      => $m->created_at->format('h:i A'),
            ])
            ->toArray();
    }

    public function send(): void
    {
        $this->validate(['body' => 'required|string|max:1000']);

        $message = Message::create([
            'sender_id'   => Auth::id(),
            'receiver_id' => $this->receiverId,
            'body'        => $this->body,
        ]);

        broadcast(new MessageSent($message));

        $this->messages[] = [
            'id'        => $message->id,
            'body'      => $message->body,
            'sender_id' => $message->sender_id,
            'time'      => $message->created_at->format('h:i A'),
        ];

        $this->body = '';
    }

    #[On('echo-private:chat.{channelIds},MessageSent')]
    public function onMessageReceived(array $event): void
    {
        if ((int) $event['sender_id'] !== Auth::id()) {
            $this->messages[] = $event;
        }
    }

    public function render()
    {
        return view('livewire.chat');
    }
}
```
{% endraw %}

---

## Step 7 — The Blade View
{% raw %}
```html
<!-- resources/views/livewire/chat.blade.php -->
<div class="flex flex-col h-screen bg-gray-900">

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3" id="chat-box">
        @foreach ($messages as $msg)
            <div class="flex {{ $msg['sender_id'] === auth()->id() ? 'justify-end' : 'justify-start' }}">
                <div class="max-w-xs px-4 py-2 rounded-2xl text-sm
                    {{ $msg['sender_id'] === auth()->id()
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-100' }}">
                    {{ $msg['body'] }}
                    <div class="text-xs opacity-60 mt-1 text-right">{{ $msg['time'] }}</div>
                </div>
            </div>
        @endforeach
    </div>

    <!-- Input -->
    <div class="p-4 border-t border-gray-700 flex gap-3">
        <input
            wire:model="body"
            wire:keydown.enter="send"
            type="text"
            placeholder="Type a message…"
            class="flex-1 bg-gray-800 text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button wire:click="send" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition">
            Send
        </button>
    </div>
</div>

<script>
    // Auto-scroll to bottom when new messages arrive
    const box = document.getElementById('chat-box');
    const observer = new MutationObserver(() => box.scrollTop = box.scrollHeight);
    observer.observe(box, { childList: true });
</script>
```
{% endraw %}

---

## Step 8 — Start the Servers

You need three processes running simultaneously. Use separate terminals or a process manager like `foreman`:

```bash
# Terminal 1 — Laravel dev server
php artisan serve

# Terminal 2 — Reverb WebSocket server
php artisan reverb:start

# Terminal 3 — Vite for assets
npm run dev
```

---

## Testing It

Open two browser windows logged in as different users and navigate to:

```
http://localhost:8000/chat/{receiver_id}
```

Messages sent in one window appear instantly in the other — no page refresh, no polling.

---

## Adding a Typing Indicator

Create a second broadcast event for typing state:

{% raw %}
```php
// app/Events/UserTyping.php
class UserTyping implements ShouldBroadcastNow
{
    public function __construct(public int $senderId, public int $receiverId) {}

    public function broadcastOn(): PrivateChannel
    {
        $ids = collect([$this->senderId, $this->receiverId])->sort()->join('.');
        return new PrivateChannel("chat.{$ids}");
    }
}
```
{% endraw %}

In your Livewire component, debounce the typing event:

{% raw %}
```php
public function updatedBody(): void
{
    broadcast(new UserTyping(Auth::id(), $this->receiverId));
}
```
{% endraw %}

Then listen in the component and show a "typing…" indicator with a timeout to hide it after a few seconds.

---

## Key Takeaways

- **Laravel Reverb** replaces Pusher with a self-hosted WebSocket server — no monthly fees
- **Livewire 3's `#[On]` attribute** makes listening to broadcast events trivial
- **Private channels** ensure messages are only delivered to the intended recipient
- The entire feature ships with zero custom JavaScript beyond a tiny scroll helper

The full source code for this project is on [GitHub](https://github.com/jawadhossainmahi/laravel-chat-system).