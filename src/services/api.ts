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

export async function getTestsByTeacher(token: string) {
    try {
        const config = createConfig(token);
        const promise = await axios.get(`${BASE_URL}/tests/teacher`, config);
        return promise;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function getTestsByDisciplines(token: string) {
    try {
        const config = createConfig(token);
        const promise = await axios.get(`${BASE_URL}/tests/discipline`, config);
        return promise;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function updateViews(token: string, id: number) {
    try {
        const config = createConfig(token);
        await axios.put(`${BASE_URL}/test/${id}`, {}, config);
        return true;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function getCategories(token: string) {
    try {
        const config = createConfig(token);
        const promise = await axios.get(`${BASE_URL}/categories`, config);
        return promise?.data;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function getDisciplines(token: string) {
    try {
        const config = createConfig(token);
        const promise = await axios.get(`${BASE_URL}/disciplines`, config);
        return promise?.data;
    } catch (error: any) {
        console.log(error.response);
    }
}

export async function getTeachersByDisciplines(token: string, discipline: string) {
    try {
        const config = createConfig(token);
        const promise = await axios.get(`${BASE_URL}/teacher/${discipline}`, config);
        return promise?.data;
    } catch (error: any) {
        console.log(error.response);
    }
}

export interface CreateTest {
    name: string,
    pdfUrl: string,
    category: string,
    discipline: string,
    teacher: string
}

export async function createTest(token: string, body: CreateTest) {
    try {
        const config = createConfig(token);
        await axios.post(`${BASE_URL}/tests`, body, config);
        return true;
    } catch (error: any) {
        console.log(error.response);
    }
}