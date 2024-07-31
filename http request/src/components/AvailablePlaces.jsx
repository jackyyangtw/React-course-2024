import Places from "./Places.jsx";
import { useState, useEffect } from "react";
export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const host = "http://localhost:3000";
    useEffect(() => {
        const fetchPlaces = async () => {
            const response = await fetch(`${host}/places`);
            const responseData = await response.json();
            setAvailablePlaces(responseData.places);
        };
        fetchPlaces();
    }, []);
    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
