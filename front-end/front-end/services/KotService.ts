const getAllKoten = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/koten", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
};

const getKotById = {id: string} => {

};

const KotService = {
    getAllKoten,
    getKotById,
};

export default KotService;
