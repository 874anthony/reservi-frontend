import { createContext, ReactNode, useContext, useState } from "react";
import { Bookings, User } from "@/data/data";

interface BookingContextProps {
  users: User[];
  bookings: Bookings[];
  addUser: (user: Omit<User, "id">) => void;
  removeUser: (user: User) => void;
  addBooking: (
    booking: Omit<Bookings, "id" | "color" | "userId">,
    userId: number
  ) => void;
  removeBooking: (booking: Bookings) => void;
  calculateHeight: (startDate: string, endDate: string) => string;
}

const BookingsContext = createContext<BookingContextProps | undefined>(
  undefined
);

export const useBookings = () => {
  const context = useContext(BookingsContext);

  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }

  return context;
};

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Anthony",
      phone: "1234567890",
      email: "user@user.com",
      city: "Bogota DC",
    },
  ]);

  const [bookings, setBookings] = useState<Bookings[]>([
    {
      id: 1,
      userId: 1,
      startDate: "2022-01-01T12:30:00",
      endDate: "2022-01-01T14:30:00",
      color: "#FF5733",
    },
  ]);

  const generateRandomColor = () => {
    const colors = ["#FF5733", "#33C4FF", "#33FF57", "#FFC433", "#C433FF"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const sortBookings = (bookings: Bookings[]) => {
    return bookings.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  };

  const calculateHeight = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const totalDay = 24 * 60 * 60 * 1000;
    return ((end - start) / totalDay) * 100 + "%";
  };

  const addUser = (user: Omit<User, "id">) => {
    const lastUser = users[users.length - 1];
    const id = lastUser ? lastUser.id + 1 : 1;

    const newUser = {
      ...user,
      id,
    };

    setUsers([...users, newUser]);
  };

  const addBooking = (
    booking: Omit<Bookings, "color" | "userId" | "id">,
    userId: number
  ) => {
    const color = generateRandomColor();
    const lastBooking = bookings[bookings.length - 1];
    const id = lastBooking ? lastBooking.id + 1 : 1;

    const newBooking = { ...booking, userId, color, id };

    setBookings((prev) => sortBookings([...prev, newBooking]));
  };

  const removeBooking = (booking: Bookings) => {
    setBookings(bookings.filter((b) => b.id !== booking.id));
  };

  const removeUser = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <BookingsContext.Provider
      value={{
        users,
        bookings,
        addUser,
        addBooking,
        removeBooking,
        removeUser,
        calculateHeight,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};
