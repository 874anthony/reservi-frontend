export interface Bookings {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  color: string;
}

export type AddBooking = Omit<Bookings, "color" | "userId" | "id">;

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
}
