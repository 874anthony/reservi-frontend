"use client";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import {
  Avatar,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useBookings } from "@/context/BookingContext";

export default function UserList() {
  const { users, bookings, addUser } = useBookings();

  const attributes = ["name", "email", "role"];
  const [filters, setFilters] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof filters>) => {
    const { value } = event.target;

    setFilters(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="w-full h-full p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">User List</h1>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Tags */}
          <FormControl fullWidth>
            <InputLabel id="filters-select-label">Filters</InputLabel>
            <Select
              labelId="filters-select-label"
              id="filters-select"
              label="Filters"
              multiple
              value={filters}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {attributes.map((attribute) => (
                <MenuItem key={attribute} value={attribute}>
                  {attribute}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="grid grid-cols-6 text-sm font-medium text-gray-500 bg-gray-100 p-2 rounded-md">
        <span>Avatar</span>
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
        <span>City</span>
        <span></span>
      </div>

      {/* User List */}
      <div className="space-y-2">
        {users.map((user, index) => {
          const userBookings = bookings.filter((b) => b.userId === user.id);

          return (
            <div
              key={index}
              className="grid grid-cols-6 items-center p-2 rounded-md hover:bg-gray-50 transition cursor-pointer"
            >
              <Avatar />
              <span className="text-gray-800">{user.name}</span>
              <span className="text-gray-600">{user.phone}</span>
              <span className="text-gray-600">{user.email}</span>
              <span className="text-gray-600">{user.city}</span>

              <div className="flex items-center space-x-2">
                {userBookings.map((booking, index) => (
                  <span
                    key={index}
                    className="inline-block w-6 h-6 rounded-full ml-2"
                    style={{ backgroundColor: booking.color }}
                    title={`${booking.startDate} - ${booking.endDate}`}
                  ></span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
