import axios from "axios";
// const URL = "https://apigastos.onrender.com"
const URL = "http://localhost:8000"
export  async function getCategorias() {
    try {
        const response = await axios.get(`${URL}/api/categorias/`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};