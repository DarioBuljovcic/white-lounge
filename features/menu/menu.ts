type MenuCategory = "coffee" | "jameson" | "cocktails" | "other";

type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  priceLabel: string;
};

const menuDescription = "Lorem ipsum dolor sit amet.";
const menuPriceLabel = "Cena uskoro";

const menuItems: MenuItem[] = [
  {
    id: "espresso",
    category: "coffee",
    name: "Espreso",
    description: menuDescription,
    priceLabel: menuPriceLabel,
  },
  {
    id: "filter",
    category: "coffee",
    name: "Filter kafa",
    description: menuDescription,
    priceLabel: menuPriceLabel,
  },
  {
    id: "jameson",
    category: "jameson",
    name: "Jameson",
    description: menuDescription,
    priceLabel: menuPriceLabel,
  },
  {
    id: "koktel-dana",
    category: "cocktails",
    name: "Koktel dana",
    description: menuDescription,
    priceLabel: menuPriceLabel,
  },
  {
    id: "negroni",
    category: "cocktails",
    name: "Negroni",
    description: menuDescription,
    priceLabel: menuPriceLabel,
  },
  {
    id: "cedjeni",
    category: "other",
    name: "Ceđeni sok",
    description: menuDescription,
    priceLabel: menuPriceLabel,
  },
  {
    id: "limunada",
    category: "other",
    name: "Limunada",
    description: menuDescription,
    priceLabel: menuPriceLabel,
  },
];

export const getMenu = async (): Promise<MenuItem[]> => menuItems;
