
export type DrinkType = "Водка" | "Уиски" | "Бяло Вино" | "Просеко";

export interface GuestSubmission {
  id: string;
  name: string;
  drink: DrinkType;
  softDrink: string;
  createdAt: string;
}

export interface DrinkStats {
  "Водка": number;
  "Уиски": number;
  "Бяло Вино": number;
  "Просеко": number;
}
