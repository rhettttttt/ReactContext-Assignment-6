// src/views/RegisterView.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";

// Example genre list
const genreList = [
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Drama" },
    { id: 4, name: "Horror" },
    { id: 5, name: "Sci-Fi" },
    { id: 6, name: "Romance" },
    { id: 7, name: "Thriller" },
    { id: 8, name: "Documentary" },
];

export default function RegisterView() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
    });
    const [selectedGenres, setSelectedGenres] = useState([]);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleGenreChange = (e) => {
        const id = parseInt(e.target.value, 10);
        if (e.target.checked) {
            setSelectedGenres((prev) => [...prev, id]);
        } else {
            setSelectedGenres((prev) => prev.filter((g) => g !== id));
        }
    };

    const validateForm = () => {
        if (
            !form.firstName ||
            !form.lastName ||
            !form.email ||
            !form.password ||
            !form.password2
        ) {
            alert("All fields are required.");
            return false;
        }
        if (form.password !== form.password2) {
            alert("Passwords do not match.");
            return false;
        }
        if (selectedGenres.length < 5) {
            alert("Please select at least 5 genres.");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setUser({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            favoriteGenres: selectedGenres,
        });
        navigate(`/movies/genre/28`);
    };

    const isFormComplete =
        form.firstName &&
        form.lastName &&
        form.email &&
        form.password &&
        form.password2 &&
        form.password === form.password2 &&
        selectedGenres.length >= 5;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Register
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={form.firstName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        firstName: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={form.lastName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lastName: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={form.password2}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password2: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select at least 5 Genres
                            </label>
                            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
                                {genreList.map((genre) => (
                                    <label
                                        key={genre.id}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="checkbox"
                                            value={genre.id}
                                            onChange={handleGenreChange}
                                        />
                                        <span>{genre.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!isFormComplete}
                            className={`w-full py-2 text-white font-semibold rounded-lg transition ${
                                isFormComplete
                                    ? "bg-green-600 hover:bg-green-500"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
