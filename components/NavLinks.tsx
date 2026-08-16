import { Icon } from "@/components/icons";
import type { Dictionary } from "@/content/dictionary";

type Item = Dictionary["megaNav"][number]["items"][number];

export function NavLinks({
  items,
  onNavigate,
  compact = false,
}: {
  items: readonly Item[];
  onNavigate?: () => void;
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "space-y-1" : "grid gap-2 sm:grid-cols-2"}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            onClick={onNavigate}
            className="flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-bg hover:text-fg"
          >
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ama-red/12 text-ama-red">
              <Icon name={item.icon} className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-base font-semibold text-fg">{item.label}</span>
              <span className="mt-0.5 block text-base leading-snug text-muted">
                {item.hint}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
