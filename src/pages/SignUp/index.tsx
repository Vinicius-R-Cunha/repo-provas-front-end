import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";

export default function SignUp() {
    return (
        <>
            <Header isLoggedIn={false} />
            <AuthForm title="Login"></AuthForm>
        </>
    );
}