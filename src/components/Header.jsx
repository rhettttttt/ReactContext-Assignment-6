import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    const active = "underline text-red-400";
    const base = "hover:text-red-300 transition";

    return (
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <NavLink to="/" className="text-2xl font-bold">
                <span className="text-red-500">Qay</span>Flix
            </NavLink>
            <nav className="space-x-6">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${base} ${isActive ? active : ""}`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        `${base} ${isActive ? active : ""}`
                    }
                >
                    Movies
                </NavLink>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `${base} ${isActive ? active : ""}`
                    }
                >
                    Login
                </NavLink>
                <NavLink
                    to="/register"
                    className={({ isActive }) =>
                        `${base} ${isActive ? active : ""}`
                    }
                >
                    Register
                </NavLink>
            </nav>
        </header>
    );
}
