const host = "http://localhost:3000";

const getPlaces = async (url) => {
    const response = await fetch(`${host}${url}`);
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message);
    }
    return responseData.places;
};

export const fetchAvailablePlaces = async () => getPlaces("/places");
export const fetchUserPlaces = async () => getPlaces("/user-places");

export const updateUserPlaces = async (places) => {
    const response = await fetch(`${host}/user-places`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ places }),
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error("failed to update user places");
    }
    return responseData.message;
};
