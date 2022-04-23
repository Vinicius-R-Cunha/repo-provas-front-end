import { Container, Spacer, GithubButton, InputsForm, LinkButtonDiv } from "./style";
import { IoEye } from 'react-icons/io5';

type Title = "Cadastro" | "Login";
interface AuthProps {
    title: Title;
}

export default function AuthForm({ title }: AuthProps) {

    function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();

        console.log('submit');
    }

    return (
        <Container>
            <p className="title">{title}</p>
            <GithubButton>Entrar com o GITHUB</GithubButton>
            <Spacer>
                <div></div>
                ou
                <div></div>
            </Spacer>
            <InputsForm>
                <input name="email" type="email" placeholder="Email" />
                <div className="password">
                    <input name="password" type="password" placeholder="Senha" />
                    <IoEye className="show-hide" />
                </div>
                {
                    title === 'Cadastro' &&
                    <div className="password">
                        <input
                            name="confirmation"
                            type="password"
                            placeholder="Confirme sua senha"
                        />
                        <IoEye className="show-hide" />
                    </div>
                }
                <LinkButtonDiv>
                    {title === 'Cadastro' ?
                        <>
                            <p>Já possuo cadastro</p>
                            <button onClick={e => handleSubmit(e)}>cadastrar</button>
                        </> :
                        <>
                            <p>Não possuo cadastro</p>
                            <button onClick={e => handleSubmit(e)}>entrar</button>
                        </>
                    }

                </LinkButtonDiv>
            </InputsForm>
        </Container>
    );
}