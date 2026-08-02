interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Nếu item ít thì lặp thêm để track đủ dài
  const marqueeItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-white/15 bg-black py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((track) => (
          <div
            key={track}
            className="flex shrink-0 items-center"
            aria-hidden={track === 1}
          >
            {marqueeItems.map((item, i) => (
              <div key={`${track}-${i}`} className="flex shrink-0 items-center">
                <span className="px-6 font-mono text-xs uppercase tracking-[0.3em] text-white">
                  {item}
                </span>

                <span className="h-1 w-1 rounded-full bg-white/50" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
