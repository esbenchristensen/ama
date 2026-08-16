import { Shell } from "@/components/Shell";
import { startSteps } from "@/content/site";

export function StartSteps() {
  return (
    <section id="proeve" className="section-y">
      <Shell>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
            {startSteps.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-fg sm:text-5xl lg:text-6xl">
            {startSteps.title}
          </h2>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {startSteps.items.map((item) => (
            <li
              key={item.step}
              className="rounded-[1.75rem] bg-surface px-6 py-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-ama-red sm:text-3xl">
                  {String(item.step).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-fg">{item.title}</h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
