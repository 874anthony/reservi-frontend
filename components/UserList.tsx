"use client";
import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useBookings } from "@/context/BookingContext";
import { Bookings, User } from "@/data/data";

export default function UserList() {
  const { users, bookings, removeUser, removeBooking, updateUser } =
    useBookings();
  const attributes = ["name", "phone", "email", "city"];

  const [filters, setFilters] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Modals
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [openModalBooking, setOpenModalBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);

  const handleChange = (event: SelectChangeEvent<typeof filters>) => {
    const { value } = event.target;

    setFilters(typeof value === "string" ? value.split(",") : value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  const handleBookingEdit = (booking: Bookings) => {
    setSelectedBooking(booking);
    setOpenModalBooking(true);
  };

  const handleBookingDelete = (booking: Bookings) => {
    removeBooking(booking);
    setSelectedBooking(null);
    setOpenModalBooking(false);
  };

  const handleUpdate = () => {
    if (selectedUser) {
      updateUser(selectedUser);
      handleModalClose();
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let filteredUsers = users;

      if (search.trim()) {
        filteredUsers = users.filter((user: Omit<User, "id">) => {
          const searchTerm = search.toLowerCase();

          // No filters
          if (filters.length === 0) {
            return attributes.some((attribute) => {
              return user[attribute as keyof typeof user]
                ?.toLowerCase()
                .includes(searchTerm);
            });
          }

          // Filters applied
          if (filters.length > 0) {
            return filters.some((filter) => {
              return user[filter as keyof typeof user]
                ?.toLowerCase()
                .includes(searchTerm);
            });
          }
        });
      }

      setFilteredUsers(filteredUsers);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, filters, users]);

  return (
    <div className="w-full h-full p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">User List</h1>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearch}
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

      <div className="grid grid-cols-7 text-sm font-medium text-gray-500 bg-gray-100 p-2 rounded-md">
        <span>Avatar</span>
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
        <span>City</span>
        <span></span>
        <span>Actions</span>
      </div>

      {/* User List */}
      <div className="space-y-2">
        {filteredUsers.map((user, index) => {
          const userBookings = bookings.filter((b) => b.userId === user.id);

          return (
            <div
              key={index}
              className="grid grid-cols-7 items-center p-2 rounded-md hover:bg-gray-50 transition cursor-pointer"
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
                    onClick={() => handleBookingEdit(booking)}
                    className="inline-block w-6 h-6 rounded-full ml-2"
                    style={{ backgroundColor: booking.color }}
                    title={`${booking.startDate} - ${booking.endDate}`}
                  ></span>
                ))}
              </div>

              <div className="flex items-center gap-2 cursor-pointer">
                <Button variant="contained" onClick={() => handleEdit(user)}>
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeUser(user.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {openModal && selectedUser && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg text-black font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
            />

            <input
              type="text"
              value={selectedUser.phone}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, phone: e.target.value })
              }
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
            />

            <input
              type="text"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
            />

            <input
              type="text"
              value={selectedUser.city}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, city: e.target.value })
              }
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
            />

            <Button variant="contained" onClick={handleUpdate}>
              Save
            </Button>
            <Button sx={{ ml: 2 }} color="error" onClick={handleModalClose}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {openModalBooking && selectedBooking && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg text-black font-bold mb-4">
              Look Reservation
            </h2>
            <input
              type="text"
              value={selectedBooking.startDate}
              disabled
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
            />

            <input
              type="text"
              value={selectedBooking.endDate}
              disabled
              className="block w-full p-2 border border-gray-300 rounded-lg mb-4 text-black"
            />

            <Button
              sx={{ mr: 2 }}
              color="error"
              onClick={() => handleBookingDelete(selectedBooking as Bookings)}
            >
              Delete reservation
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                setSelectedBooking(null);
                setOpenModalBooking(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
