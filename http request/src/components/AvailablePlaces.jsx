import Places from "./Places.jsx";
import { useState, useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const places = await fetchAvailablePlaces();
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    const sortedPlaces = sortPlacesByDistance(
                        places,
                        latitude,
                        longitude
                    );
                    setAvailablePlaces(sortedPlaces);
                    // setIsLoading(false);
                });
            } catch (error) {
                setError({
                    message: error.message || `Failed to fetch places.`,
                });
            }
            setIsLoading(false);
        };
        fetchPlaces();
    }, []);
    if (error) {
        return (
            <Error
                title="An Error Occurred!"
                message={error.message}
                onConfirm={() => setError(null)}
            />
        );
    }
    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
            isLoading={isLoading}
            loadingText="Loading places..."
        />
    );
}
