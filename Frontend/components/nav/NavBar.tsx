export type UserPage = "place" | "view" | "completed";

type NavBarProps = {
  page: UserPage;
  onChange: (page: UserPage) => void;
};

const items: { id: UserPage; label: string; icon: "place" | "view" | "completed" }[] = [
  { id: "place", label: "Place order", icon: "place" },
  { id: "view", label: "View order", icon: "view" },
  { id: "completed", label: "Completed orders", icon: "completed" },
];

function Icon({ name }: { name: "place" | "view" | "completed" }) {
  if (name === "place") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
        <path d="M4 7h16v12H4z" strokeLinejoin="round" />
        <path d="M8 7V5h8v2M8 12h8M8 16h5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "view") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
        <path d="M6 4h9l3 3v13H6z" strokeLinejoin="round" />
        <path d="M15 4v4h4M9 12h6M9 16h6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 12.5 11 15l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NavBar({ page, onChange }: NavBarProps) {
  return (
    <nav
      aria-label="User pages"
      className="flex w-full items-stretch justify-between gap-2 rounded-2xl bg-[#c45c5c] px-3 py-2"
    >
      {items.map((item) => {
        const selected = page === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={
              selected
                ? "relative flex flex-1 cursor-pointer items-center justify-center gap-2 px-3 py-2 text-sm text-white"
                : "flex flex-1 cursor-pointer items-center justify-center gap-2 px-3 py-2 text-sm text-white/75 transition hover:text-white"
            }
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {selected && <span className="absolute right-4 bottom-0 left-4 h-0.5 rounded-full bg-white" />}
          </button>
        );
      })}
    </nav>
  );
}
