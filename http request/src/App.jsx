import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces, fetchUserPlaces } from "./http.js";
import Error from "./components/Error.jsx";
function App() {
    const selectedPlace = useRef();

    const [userPlaces, setUserPlaces] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const FETCHUSERPLACES = async () => {
            try {
                setIsLoading(true);
                const places = await fetchUserPlaces();
                setUserPlaces(places);
            } catch (error) {
                setErrorUpdatingPlaces({
                    message: "Failed to fetch user places",
                });
            }
            setIsLoading(false);
        };
        FETCHUSERPLACES();
    }, []);

    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    async function handleSelectPlace(selectedPlace) {
        setUserPlaces((prevPickedPlaces) => {
            if (!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if (
                prevPickedPlaces.some((place) => place.id === selectedPlace.id)
            ) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });
        try {
            await updateUserPlaces([selectedPlace, ...userPlaces]);
        } catch (error) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: "Failed to update user places",
            });
        }
    }

    const handleRemovePlace = useCallback(async () => {
        setUserPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter(
                (place) => place.id !== selectedPlace.current.id
            )
        );
        try {
            await updateUserPlaces(
                userPlaces.filter(
                    (place) => place.id !== selectedPlace.current.id
                )
            );
        } catch (error) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: "Failed to delete user places",
            });
        }

        setModalIsOpen(false);
    }, [userPlaces]);

    const handleErrorUpdatingPlaces = () => setErrorUpdatingPlaces(null);

    return (
        <>
            <Modal
                open={errorUpdatingPlaces}
                onClose={handleErrorUpdatingPlaces}
            >
                {errorUpdatingPlaces && (
                    <Error
                        title="An Error occurred"
                        message={errorUpdatingPlaces.message}
                        onConfirm={handleErrorUpdatingPlaces}
                    ></Error>
                )}
            </Modal>
            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe" />
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to
                    visit or you have visited.
                </p>
            </header>
            <main>
                <Places
                    title="I'd like to visit ..."
                    fallbackText="Select the places you would like to visit below."
                    places={userPlaces}
                    onSelectPlace={handleStartRemovePlace}
                    isLoading={isLoading}
                    loadingText="Loading user places..."
                />

                <AvailablePlaces onSelectPlace={handleSelectPlace} />
            </main>
        </>
    );
}

export default App;
