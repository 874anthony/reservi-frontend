import AddUserForm from "./AddUserForm";
import AddBookingForm from "./AddBookingForm";

export default function Forms() {
  return (
    <section className="w-full flex flex-col gap-4">
      <AddUserForm />

      <AddBookingForm />
    </section>
  );
}
