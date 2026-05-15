"use client";

interface ColorSwatchesProps {
  colors: Record<string, string>; // name -> hex swatch
  selected: string | null;
  onSelect: (color: string) => void;
}

export function ColorSwatches({
  colors,
  selected,
  onSelect,
}: ColorSwatchesProps) {
  const colorNames = Object.keys(colors);
  if (colorNames.length === 0) return null;

  return (
    <div className="mb-6">
      <p className="text-[0.65rem] tracking-[0.2em] text-white/50 mb-3 uppercase font-mono">
        Color
      </p>
      <div className="flex gap-3">
        {colorNames.map((name) => (
          <button
            key={name}
            className={`w-8 h-8 rounded-full border transition-all hover:scale-110 ${
              selected === name
                ? "border-white scale-110"
                : "border-white/20"
            }`}
            style={{ backgroundColor: colors[name] || "#fff" }}
            onClick={() => onSelect(name)}
            title={name}
            aria-label={`Color: ${name}`}
          />
        ))}
      </div>
    </div>
  );
}

interface SizeButtonsProps {
  sizes: string[];
  selected: string | null;
  onSelect: (size: string) => void;
  onSizeGuide: () => void;
}

export function SizeButtons({
  sizes,
  selected,
  onSelect,
  onSizeGuide,
}: SizeButtonsProps) {
  if (sizes.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <p className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-mono">
          Size
        </p>
        <button
          className="text-[0.6rem] font-mono text-white/40 hover:text-white underline underline-offset-4 uppercase tracking-widest"
          onClick={onSizeGuide}
        >
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`border font-mono text-xs px-4 py-2 hover:border-white hover:text-white transition-colors ${
              selected === size
                ? "border-white text-white bg-white/10"
                : "border-white/20 text-white/70"
            }`}
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
