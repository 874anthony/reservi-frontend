export interface Bookings {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  color: string;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Anthony",
    phone: "1234567890",
    email: "user@user.com",
    city: "Bogota DC",
  },
];

export const bookings = [
  {
    id: 1,
    userId: 1,
    startDate: "2022-01-01T12:30:00",
    endDate: "2022-01-01T14:30:00",
  },
];
