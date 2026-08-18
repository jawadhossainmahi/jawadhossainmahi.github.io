/** lucide-react dropped brand/logo icons; these small mono badges match
 * the site's existing "GH ↗" / "LI ↗" text-badge language instead. */

export function GithubMark({ size = 14 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center font-mono font-bold leading-none"
      style={{ fontSize: size * 0.62 }}
    >
      GH
    </span>
  );
}

export function LinkedinMark({ size = 14 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center font-mono font-bold leading-none"
      style={{ fontSize: size * 0.62 }}
    >
      in
    </span>
  );
}
