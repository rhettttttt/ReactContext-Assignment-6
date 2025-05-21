import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SearchView() {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/search/movie",
                    {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_KEY,
                            query: query,
                            page: page,
                            language: "en-US",
                        },
                    }
                );
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query, page]);

    const handlePrevPage = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">
                Search Results for:{" "}
                <span className="font-semibold">{query}</span>
            </h2>
            {loading ? (
                <p>Loading...</p>
            ) : movies.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="bg-white rounded shadow p-4 flex flex-col"
                            >
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : "https://via.placeholder.com/500x750?text=No+Image"
                                    }
                                    alt={movie.title}
                                    className="w-full h-auto mb-4"
                                />
                                <h3 className="text-lg font-semibold">
                                    {movie.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Release Date: {movie.release_date || "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-4 space-x-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
