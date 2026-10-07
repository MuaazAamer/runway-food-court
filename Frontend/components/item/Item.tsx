import { useState } from "react";
import "./index.css";

type Portion = "full" | "half" | "quarter";

type MenuItemCardProps = {
  code?: string;
  imageUrl?: string;
  name: string;
};

type Quantity = "input" | "counter" | "none";

function portionsForCode(code: string): Portion[] {
  const value = code.toUpperCase();
  if (value.startsWith("KB")) return ["full", "half", "quarter"];
  if (value.startsWith("KR") || value.startsWith("SL") || value.startsWith("H")) return ["full", "half"];
  if (value.startsWith("BR") || value.startsWith("DP") || value.startsWith("PL") || value.startsWith("D")) return [];
  if (value.startsWith("B")) return ["full", "half", "quarter"];
  return [];
}

function quantityForCode(code: string): Quantity {
  const value = code.toUpperCase();
  if (value.startsWith("KB")) return "input";
  if (value.startsWith("KR") || value.startsWith("H")) return "none";
  if (value.startsWith("BR")) return "counter";
  if (value.startsWith("B")) return "input";
  return "counter";
}

export function MenuItemCard({ code = "", imageUrl, name }: MenuItemCardProps) {
  const portions = portionsForCode(code);
  const quantity = quantityForCode(code);
  const [portion, setPortion] = useState<Portion | null>(null);
  const [count, setCount] = useState(0);

  function portionClass(value: Portion) {
    const selected = portion === value;
    return selected
      ? "w-full cursor-pointer rounded-full border border-[#ad2525] bg-[#ad2525] px-0.5 py-1 text-[9px] whitespace-nowrap text-[#fff8ed] transition hover:bg-[#8e1e1e]"
      : "w-full cursor-pointer rounded-full border border-[#d8b6a2] bg-[#fff8ed] px-0.5 py-1 text-[9px] whitespace-nowrap text-[#29241f] transition hover:border-[#ad2525] hover:text-[#ad2525]";
  }
  return (
    <div className="relative">
      <article className="group relative overflow-hidden rounded-[1.4rem] border border-[#d8b6a2] bg-[#f7eee2] p-1.5 shadow-[0_18px_40px_-24px_rgba(48,42,36,0.35)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#b92a2a] hover:bg-[#f4dfd8]">
        <div className="relative aspect-[5/3.4] overflow-hidden rounded-[1.05rem] bg-[#d8c7b0]">
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
            />
          )}
          <div className="absolute inset-0 bg-[#a91f1f] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-30" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full border-[12px] border-[#bd2f2f]/90" />
        </div>

        <div className="relative mx-0.5 mb-0.5 mt-1.5 overflow-hidden rounded-[0.9rem] bg-[#ad2525] px-3 py-2.5">
          <div className="absolute -bottom-6 -right-4 h-16 w-16 rounded-full border border-white/15" />
          <div className="absolute -bottom-2 right-3 h-8 w-8 rounded-full border border-white/15" />
          <span className="mb-1.5 block h-px w-6 bg-[#edc6a4]" />
          <h2 className="menu-item-name relative min-h-[2.4rem] text-[1.15rem] leading-[1.05] tracking-[-0.03em] text-[#fff8ed]">
            {name}
          </h2>
        </div>
        <div className="relative z-10 mx-0.5 mb-0.5 mt-1.5 flex items-center gap-1">
          {portions.map((value) => (
            <button
              key={value}
              type="button"
              className={portionClass(value)}
              onClick={() => setPortion(portion === value ? null : value)}
            >
              {value === "full" ? "Full" : value === "half" ? "Half" : "Quarter"}
            </button>
          ))}
          {quantity === "input" && (
            <input
              type="number"
              min={0}
              defaultValue={0}
              inputMode="numeric"
              aria-label="Quantity"
              className="w-9 shrink-0 rounded-full border border-[#d8b6a2] bg-[#fff8ed] px-0.5 py-1 text-center text-[11px] text-[#29241f] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          )}
          {quantity === "counter" && (
            <div className="flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[#d8b6a2] bg-[#fff8ed] text-sm leading-none text-[#29241f] transition hover:border-[#ad2525] hover:text-[#ad2525]"
                onClick={() => setCount((current) => Math.max(0, current - 1))}
              >
                −
              </button>
              <span className="min-w-4 text-center text-[11px] text-[#29241f]" aria-live="polite">
                {count}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[#d8b6a2] bg-[#fff8ed] text-sm leading-none text-[#29241f] transition hover:border-[#ad2525] hover:text-[#ad2525]"
                onClick={() => setCount((current) => current + 1)}
              >
                +
              </button>
            </div>
          )}
          <button
            type="button"
            className="shrink-0 cursor-pointer rounded-full border border-[#ad2525] bg-[#ad2525] px-2 py-1 text-[9px] whitespace-nowrap text-[#fff8ed] transition hover:bg-[#8e1e1e]"
          >
            Add
          </button>
        </div>
      </article>
    </div>
  );
}

export default function App() {

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#eadfce] px-6 py-16">
      <div className="pointer-events-none absolute -left-28 -top-32 h-80 w-80 rounded-full border-[55px] border-[#b92a2a]/10" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#b92a2a]/10" />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-35" />

      <section className="relative w-full max-w-[23rem]" aria-label="Menu item">
        <MenuItemCard
          name="Herb Grilled Chicken"
          imageUrl="https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000"
        />
      </section>
    </main>
  );
}
