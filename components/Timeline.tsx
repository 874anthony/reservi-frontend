import { useBookings } from "@/context/BookingContext";

export default function Timeline() {
  const { bookings, calculateHeight } = useBookings();

  const getHourAndMinutes = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <aside id="timeline" className="w-full h-full">
      {bookings.map((booking, index) => {
        const startHours = getHourAndMinutes(new Date(booking.startDate));
        const endHours = getHourAndMinutes(new Date(booking.endDate));

        return (
          <div
            key={index}
            className="rounded-sm flex flex-col justify-between overflow-hidden text-white text-[10px] px-2 cursor-pointer"
            style={{
              height: calculateHeight(booking.startDate, booking.endDate),
              backgroundColor: booking.color,
            }}
          >
            <span className="self-start bg-black bg-opacity-50 rounded px-1">
              {startHours}
            </span>
            <span className="self-end bg-black bg-opacity-50 rounded px-1">
              {endHours}
            </span>
          </div>
        );
      })}
    </aside>
  );
}
