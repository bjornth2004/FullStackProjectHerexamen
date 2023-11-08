const getAllKoten = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/koten", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
};

const getKotById = {id: string} => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/koten/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const KotService = {
    getAllKoten,
    getKotById,
};

export default KotService;
