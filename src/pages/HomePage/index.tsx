import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import UserContext from "../../contexts/UserContext";
import { Container } from "./style";
import * as api from "../../services/api";

export default function HomePage() {

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        validateToken(token);
    }, []);

    async function validateToken(token: string) {
        if (!await api.validateToken(token)) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/sign-in');
        };
    }

    return (
        <>
            <Header isLoggedIn={true} />
            <Container></Container>
        </>
    );
}