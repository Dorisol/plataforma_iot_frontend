import axios from "axios";

//AQUI VOY A CONFIGURAR EL BACK
export const API_URL = "http://localhost:8000/plataforma_iot/api"; 


export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


