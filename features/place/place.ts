type Place = {
  name: string;
  street: string;
  city: string;
  phone: string;
  hours: string;
};

const place: Place = {
  name: "White Lounge",
  street: "Adresa uskoro",
  city: "Grad uskoro",
  phone: "+381 00 000 000",
  hours: "Vreme uskoro",
};

export const getPlace = async (): Promise<Place> => place;
