import { Shell } from "@/components/Shell";
import { barriers } from "@/content/site";

export function Barriers() {
  return (
    <section
      id="tryghed"
      className="section-y"
      aria-labelledby="tryghed-heading"
    >
      <Shell>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
            {barriers.eyebrow}
          </p>
          <h2
            id="tryghed-heading"
            className="mt-2 font-display text-4xl text-fg sm:text-5xl lg:text-6xl"
          >
            {barriers.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {barriers.lead}
          </p>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {barriers.items.map((item, i) => (
            <li
              key={item.id}
              className={`rounded-[1.75rem] bg-surface px-6 py-7 sm:px-7${
                i === 0 ? " md:col-span-2" : ""
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-ama-red sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-fg sm:text-3xl">
                  {item.fear}
                </h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {item.answer}
              </p>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
