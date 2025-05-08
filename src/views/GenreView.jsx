// src/views/GenreView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function GenreView() {
    const { genre_id } = useParams();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        axios
            .get("https://api.themoviedb.org/3/discover/movie", {
                params: {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                    with_genres: genre_id,
                    language: "en-US",
                    page,
                },
            })
            .then((res) => {
                setMovies(res.data.results);
                setTotalPages(res.data.total_pages);
            })
            .catch((err) => console.error(err));
    }, [genre_id, page]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow px-4 py-8 max-w-6xl mx-auto">
                {/* Movies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <Link
                            key={movie.id}
                            to={`/movies/details/${movie.id}`}
                            className="block bg-white rounded overflow-hidden shadow hover:shadow-lg transition"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-[300px] object-cover"
                            />
                            <div className="p-2">
                                <h3 className="text-sm font-semibold truncate">
                                    {movie.title}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {movie.release_date}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="text-gray-700">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
}
