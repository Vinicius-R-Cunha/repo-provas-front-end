import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";
import { Container } from "./style";

export default function SignUp() {
    return (
        <>
            <Header isLoggedIn={false} />
            <Container>
                <AuthForm
                    title="Cadastro"
                />
            </Container>
        </>
    );
}