import "./index.css";
type MenuItemCardProps = {
  imageUrl: string;
  name: string;
};

export function MenuItemCard({ imageUrl, name }: MenuItemCardProps) {
  return (
    <div className="relative">
      <article className="group relative overflow-hidden rounded-[2.25rem] border border-[#d8b6a2] bg-[#f7eee2] p-2.5 shadow-[0_26px_65px_-30px_rgba(48,42,36,0.35)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-[#b92a2a] hover:bg-[#f4dfd8]">
        <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.7rem] bg-[#d8c7b0]">
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-[#a91f1f] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-30" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          <div className="absolute -right-11 -top-11 h-24 w-24 rounded-full border-[18px] border-[#bd2f2f]/90" />
        </div>

        <div className="relative mx-1 mb-1 mt-2 overflow-hidden rounded-[1.4rem] bg-[#ad2525] px-5 py-6">
          <div className="absolute -bottom-8 -right-5 h-24 w-24 rounded-full border border-white/15" />
          <div className="absolute -bottom-3 right-4 h-12 w-12 rounded-full border border-white/15" />
          <span className="mb-3 block h-px w-8 bg-[#edc6a4]" />
          <h2 className="menu-item-name relative max-w-[15rem] text-[2rem] leading-[0.98] tracking-[-0.035em] text-[#fff8ed]">
            {name}
          </h2>
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
