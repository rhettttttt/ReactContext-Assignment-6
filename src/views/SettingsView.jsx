import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SettingsView() {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        preferredGenre: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                preferredGenre: user.preferredGenre || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({
            ...user,
            firstName: formData.firstName,
            lastName: formData.lastName,
            preferredGenre: formData.preferredGenre,
        });
    };

    if (!user) {
        return (
            <>
                <Header />
                <main className="p-4">Please log in to access settings.</main>
                <Footer />
            </>
        );
    }

    return (
        <div className="p-4 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow max-w-md mx-auto w-full">
                <h2 className="text-2xl font-semibold mb-6">Settings</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="mt-1 w-full border border-gray-300 rounded bg-gray-100 px-3 py-2 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Preferred Genre
                        </label>
                        <input
                            type="text"
                            name="preferredGenre"
                            value={formData.preferredGenre}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}
