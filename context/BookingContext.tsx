import { createContext, ReactNode, useContext, useState } from "react";
import { Bookings, AddBooking, User } from "@/data/data";

interface BookingContextProps {
  users: User[];
  bookings: Bookings[];
  addUser: (user: Omit<User, "id">) => void;
  removeUser: (id: number) => void;
  addBooking: (booking: AddBooking, userId: number) => void;
  updateUser: (user: User) => void;
  removeBooking: (booking: Bookings) => void;
  calculateHeight: (startDate: string, endDate: string) => string;
  isBookingOverlap: (newBooking: AddBooking) => boolean;
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

  const [bookings, setBookings] = useState<Bookings[]>([]);

  const generateRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33C4FF",
      "#33FF57",
      "#FFC433",
      "#C433FF",
      "#040720",
      "#0C090A",
      "#34282C",
      "#3B3131",
      "#3A3B3C",
      "#454545",
      "#4D4D4F",
      "#413839",
    ];
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

  const addBooking = (booking: AddBooking, userId: number) => {
    const color = generateRandomColor();
    const lastBooking = bookings[bookings.length - 1];
    const id = lastBooking ? lastBooking.id + 1 : 1;

    const newBooking = { ...booking, userId, color, id };

    setBookings((prev) => sortBookings([...prev, newBooking]));
  };

  const isBookingOverlap = (newBooking: AddBooking) => {
    return bookings.some((booking) => {
      const newBookingStart = new Date(newBooking.startDate).getTime();
      const newBookingEnd = new Date(newBooking.endDate).getTime();
      const bookingStart = new Date(booking.startDate).getTime();
      const bookingEnd = new Date(booking.endDate).getTime();

      return (
        (newBookingStart >= bookingStart && newBookingStart <= bookingEnd) ||
        (newBookingEnd >= bookingStart && newBookingEnd <= bookingEnd)
      );
    });
  };

  const removeBooking = (booking: Bookings) => {
    setBookings(bookings.filter((b) => b.id !== booking.id));
  };

  const removeUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const updateUser = (user: User) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
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
        updateUser,
        calculateHeight,
        isBookingOverlap,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};
