const links = [
  { label: "YouTube", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 text-[11px] font-semibold text-white/70 backdrop-blur-md transition hover:text-white"
        >
          {link.label[0]}
        </a>
      ))}
    </div>
  );
}