import useForm from "@/hooks/useForm";
import { useBookings } from "@/context/BookingContext";

import { Bookings } from "@/data/data";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const initialState = {
  id: 0,
  userId: 0,
  startDate: "",
  endDate: "",
  color: "",
};

const validationRules = {
  userId: "El usuario es requerido",
  startDate: "La fecha de inicio es requerida",
  endDate: "La fecha de fin es requerida",
};

export default function AddBookingForm() {
  const { users, addBooking } = useBookings();

  const { formData, errors, loading, handleChange, handleSubmit } =
    useForm<Bookings>(
      initialState,
      (data) => addBooking(data, data.userId),
      validationRules
    );

  return (
    <div className="flex flex-col gap-8 items-center bg-white rounded-lg shadow-md p-4">
      <Typography
        variant="h4"
        component="h2"
        className="text-2xl font-bold text-gray-700"
      >
        Nueva fecha
      </Typography>

      <div className="flex flex-col gap-4">
        <FormControl fullWidth>
          <InputLabel id="userId">Users</InputLabel>
          <Select
            labelId="userId"
            id="userId"
            name="userId"
            label="Users"
            value={String(formData.userId)}
            onChange={handleChange}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-black font-bold text-center">Start Date</span>

            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          {errors.startDate && (
            <span className="text-red-500">{errors.startDate}</span>
          )}

          <div className="flex flex-col gap-4">
            <span className="text-black font-bold text-center">End Date</span>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {errors.endDate && (
            <span className="text-red-500">{errors.endDate}</span>
          )}
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Agregar fecha"}
      </Button>
    </div>
  );
}
