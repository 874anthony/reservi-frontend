"use client";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const users = [
  { name: "John Doe", email: "john@doe.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@smith.com", role: "User" },
  { name: "Alice Johnson", email: "alice@johnson.com", role: "Editor" },
];

export default function UserList() {
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

      <div className="grid grid-cols-3 text-sm font-medium text-gray-500 bg-gray-100 p-2 rounded-md">
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
      </div>

      {/* User List */}
      <div className="space-y-2">
        {users.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-3 p-2 rounded-md hover:bg-gray-50 transition"
          >
            <span className="text-gray-800">{user.name}</span>
            <span className="text-gray-600">{user.email}</span>
            <span className="text-blue-500 font-medium">{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
