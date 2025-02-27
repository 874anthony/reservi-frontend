import useForm from "@/hooks/useForm";
import { User } from "@/data/data";
import { useBookings } from "@/context/BookingContext";

import { Button, Typography } from "@mui/material";

const initialState = {
  id: 0,
  name: "",
  phone: "",
  email: "",
  city: "",
};

const validationRules = {
  name: "El nombre es requerido",
  phone: "El teléfono es requerido",
  email: "El correo es requerido",
  city: "La ciudad es requerida",
};

export default function AddUserForm() {
  const { addUser } = useBookings();

  const { formData, errors, loading, handleChange, handleSubmit } =
    useForm<User>(initialState, addUser, validationRules);

  return (
    <div className="flex flex-col gap-8 items-center bg-white rounded-lg shadow-md p-4">
      <Typography
        variant="h4"
        component="h2"
        className="text-2xl font-bold text-gray-700"
      >
        Nuevo usuario
      </Typography>

      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {errors.name && <span className="text-red-500">{errors.name}</span>}

        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {errors.phone && <span className="text-red-500">{errors.phone}</span>}

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {errors.email && <span className="text-red-500">{errors.email}</span>}

        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {errors.city && <span className="text-red-500">{errors.city}</span>}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={
          loading ||
          !formData.name ||
          !formData.phone ||
          !formData.email ||
          !formData.city
        }
      >
        {loading ? "Cargando..." : "Agregar"}
      </Button>
    </div>
  );
}
