import { useEffect, useState } from "react";
import { MenuItemCard } from "../item/Item";
import { imageForCode } from "../item/itemImage";
import NavBar, { type UserPage } from "../nav/NavBar";

type MenuItem = {
  id: number;
  code: string;
  name: string;
};

export default function User() {
  const [page, setPage] = useState<UserPage>("place");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [itemsError, setItemsError] = useState("");

  useEffect(() => {
    let ignore = false;
    fetch("http://127.0.0.1:8000/items/")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load items");
        return response.json() as Promise<MenuItem[]>;
      })
      .then((rows) => {
        if (!ignore) setItems(rows);
      })
      .catch(() => {
        if (!ignore) setItemsError("Could not load items");
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#eadfce]">
      <div className="dot-pattern pointer-events-none absolute inset-0 z-0 opacity-35" />
      <header className="relative z-10 w-full px-5 pt-8">
        <NavBar page={page} onChange={setPage} />
      </header>
      <div className="relative z-10 flex justify-center px-6 py-10">
        {page === "place" && (
          <section className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Place order">
            {itemsError && <p className="col-span-full text-[#ad2525]">{itemsError}</p>}
            {items.map((item) => (
              <MenuItemCard key={item.id} code={item.code} name={item.name} imageUrl={imageForCode(item.code)} />
            ))}
          </section>
        )}
        {page === "view" && (
          <h1 className="menu-item-name text-[2.4rem] text-[#29241f]">View order</h1>
        )}
        {page === "completed" && (
          <h1 className="menu-item-name text-[2.4rem] text-[#29241f]">Completed orders</h1>
        )}
      </div>
    </main>
  );
}
