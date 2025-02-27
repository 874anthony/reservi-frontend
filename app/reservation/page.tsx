"use client";

import Forms from "@/components/Forms";
import Timeline from "@/components/Timeline";
import UserList from "@/components/UserList";
import { BookingsProvider } from "@/context/BookingContext";

export default function ReservationPage() {
  return (
    <BookingsProvider>
      <main className="p-8 pb-20 min-h-screen grid grid-cols-[72px_1fr_328px] gap-5 items-center justify-items-center">
        <Timeline />

        <UserList />

        <Forms />
      </main>
    </BookingsProvider>
  );
}
