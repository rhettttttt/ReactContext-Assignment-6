import React, { useContext } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CartView() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow px-4 py-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <div className="grid gap-4">
                        {cartItems.map((movie) => (
                            <div
                                key={movie.id}
                                className="flex flex-col items-center bg-white shadow p-4 rounded"
                            >
                                <Link to={`/movies/details/${movie.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-24 h-36 object-cover rounded mb-4"
                                    />
                                </Link>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {movie.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {movie.release_date}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(movie.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
