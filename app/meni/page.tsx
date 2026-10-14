import type { Metadata } from "next";
import { getMenu } from "@/features/menu/menu";
import { getMessages } from "@/messages/sr";

const categoryOrder = ["coffee", "jameson", "cocktails", "other"] as const;

const { menu: menuCopy } = getMessages();

export const metadata: Metadata = {
  title: menuCopy.title,
  alternates: { canonical: "/meni" },
};

const MeniPage = async () => {
  const items = await getMenu();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-gutter py-16">
      <h1 className="font-display text-section-title text-ivory">
        {menuCopy.title}
      </h1>
      {categoryOrder.map((category) => {
        const categoryItems = items.filter((item) => item.category === category);

        if (categoryItems.length === 0) {
          return null;
        }

        return (
          <section key={category} className="flex flex-col gap-4">
            <h2 className="border-b border-hairline pb-3 font-display text-2xl text-brass">
              {menuCopy.categories[category]}
            </h2>
            <ul className="flex flex-col gap-5">
              {categoryItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-baseline justify-between gap-6"
                >
                  <div className="flex flex-col">
                    <span className="text-ivory">{item.name}</span>
                    <span className="text-muted">{item.description}</span>
                  </div>
                  <span className="shrink-0 text-muted">{item.priceLabel}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

export default MeniPage;
