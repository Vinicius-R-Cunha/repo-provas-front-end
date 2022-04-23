import axios from "axios";
import { FormData } from "../components/AuthForm";

const BASE_URL = process.env.REACT_APP_BACK_URL;

function createConfig(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

export async function signUp(formData: FormData) {
    try {
        await axios.post(`${BASE_URL}/sign-up`, formData);
        return true;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function signIn(formData: FormData) {
    try {
        const promise = await axios.post(`${BASE_URL}/sign-in`, formData);
        return promise.data;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function validateToken(token: string) {
    try {
        const config = createConfig(token);
        await axios.get(`${BASE_URL}/token/validation`, config);
        return true;
    } catch (error: any) {
        console.log(error.response);
    }
}