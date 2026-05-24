# Jawad Hossain Mahi — Portfolio Site

A modern dark-themed personal portfolio with animated sections and a GitHub-powered blog system.

## 🚀 Deployment to GitHub Pages

1. Create a repository named exactly: `jawadhossainmahi.github.io`
2. Upload ALL files in this folder to that repo (keep folder structure intact)
3. Go to repo **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at: `https://jawadhossainmahi.github.io`

## 📁 File Structure

```
jawadhossainmahi.github.io/
├── index.html          ← Main portfolio page
├── jawad.png           ← Your profile photo
└── blogs/
    ├── posts.json      ← Blog index (edit this to add posts)
    ├── getting-started-with-laravel-reverb.md
    ├── react-performance-tips.md
    └── tailwind-css-advanced.md
```

## ✍️ How to Add a New Blog Post

### Step 1 — Write your post
Create a new `.md` file inside the `blogs/` folder, e.g. `blogs/my-new-post.md`.

Write it in standard Markdown. Code blocks with language hints will get syntax highlighting:

````markdown
# My New Post Title

Some intro text here.

## Section Heading

Explanation paragraph.

```php
// Code example
echo "Hello World";
```
````

### Step 2 — Register it in posts.json
Open `blogs/posts.json` and add an entry to the array:

```json
{
  "id": "my-new-post",
  "title": "My New Post Title",
  "date": "2025-06-01",
  "tags": ["Laravel", "PHP"],
  "excerpt": "A short 1-2 sentence description shown on the card.",
  "cover": "https://images.unsplash.com/photo-XXXXXX?w=800&q=80",
  "file": "blogs/my-new-post.md"
}
```

For the `cover` image, grab any free photo URL from [unsplash.com](https://unsplash.com).

### Step 3 — Push to GitHub
Commit and push both files. GitHub Pages will deploy automatically within ~1 minute.

## 🎨 Customization

- **Colors**: Edit the `tailwind.config` block in `index.html` — change `accent` (#00d4aa) or `accent2` (#6366f1)
- **Photo**: Replace `jawad.png` with any image file (keep the same filename or update the `<img>` src)
- **Social links**: Search for `jawadhossainmahi` and update URLs throughout `index.html`
- **Stats**: Find the "Stats row" comment and update the numbers
- **Projects**: Find the "PROJECTS" comment section and edit the cards

## 🛠 Tech Stack

- HTML5 + Tailwind CSS (CDN)
- Vanilla JavaScript + jQuery
- Marked.js (Markdown rendering)
- Highlight.js (Code syntax highlighting)
- Google Fonts (Syne + Space Mono + DM Sans)
- No build step required — pure static files