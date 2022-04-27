import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";
import { Container } from "../SignUp/style";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <Header isLoggedIn={false} inputType='disciplinas' />
            <Container>
                <AuthForm
                    title="Login"
                />
            </Container>
        </>
    );
}