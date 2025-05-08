import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MoviesView from "./views/MoviesView";
import GenreView from "./views/GenreView";
import DetailView from "./views/DetailView";
import ErrorView from "./views/ErrorView";

const genreList = [
    { id: 28, genre: "Action" },
    { id: 12, genre: "Adventure" },
    { id: 16, genre: "Animation" },
    { id: 35, genre: "Comedy" },
    { id: 80, genre: "Crime" },
    { id: 99, genre: "Documentary" },
    { id: 18, genre: "Drama" },
    { id: 10751, genre: "Family" },
    { id: 14, genre: "Fantasy" },
    { id: 36, genre: "History" },
    { id: 27, genre: "Horror" },
    { id: 10749, genre: "Romance" },
    { id: 878, genre: "Sci-Fi" },
    { id: 10752, genre: "War" },
    { id: 10770, genre: "TV Movie" },
];

const defaultGenreId = genreList.length > 0 ? genreList[0].id : null;

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />

            <Route path="movies" element={<MoviesView genreList={genreList} />}>
                <Route
                    index
                    element={
                        defaultGenreId !== null ? (
                            <Navigate to={`genre/${defaultGenreId}`} replace />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />
                <Route path="genre/:genre_id" element={<GenreView />} />
                <Route path="details/:id" element={<DetailView />} />
            </Route>

            <Route path="*" element={<ErrorView />} />
        </Routes>
    );
}
