import { Button, Typography } from "@mui/material";

export default function Forms() {
  return (
    <section className="w-full flex flex-col gap-4">
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
            placeholder="Nombre"
            className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Correo"
            className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Rol"
            className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <Button variant="contained" color="primary">
          Agregar
        </Button>
      </div>

      <div className="flex flex-col gap-8 items-center bg-white rounded-lg shadow-md p-4">
        <Typography
          variant="h4"
          component="h2"
          className="text-2xl font-bold text-gray-700"
        >
          Nueva fecha
        </Typography>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            placeholder="Correo"
            className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <Button variant="contained" color="primary">
          Agregar
        </Button>
      </div>
    </section>
  );
}
