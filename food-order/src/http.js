const host = "http://localhost:3000";

export const getMeals = async () => {
    const response = await fetch(`${host}/meals`);
    const data = await response.json();
    return data;
};

export const getOrders = async () => {
    const response = await fetch(`${host}/orders`);
    const data = await response.json();
    return data;
};

export const postOrder = async (order) => {
    const response = await fetch(`${host}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
    });
    const data = await response.json();
    return data;
};
