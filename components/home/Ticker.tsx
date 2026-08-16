const items = [
  "Kickboxing",
  "Muay Thai",
  "Boksning",
  "MMA",
  "Kick'n Burn",
  "Børn & unge",
  "Kamphold",
  "Open Gym",
];

export function Ticker() {
  return (
    <div className="ticker-bleed overflow-hidden bg-ama-red">
      <div className="marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center">
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-5 px-5 py-2.5 font-display text-xl text-white sm:text-2xl"
              >
                {item}
                <span className="text-white/40" aria-hidden>
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
