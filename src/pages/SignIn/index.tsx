import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";
import { Container } from "../SignUp/style";

export default function SignIn() {

    return (
        <>
            <Header isLoggedIn={false} />
            <Container>
                <AuthForm
                    title="Login"
                />
            </Container>
        </>
    );
}