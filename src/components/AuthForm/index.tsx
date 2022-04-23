import { Container, Spacer, GithubButton, InputsForm, LinkButtonDiv } from "./style";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import * as api from "../../services/api";
import UserContext from "../../contexts/UserContext";

type Title = "Cadastro" | "Login";
interface AuthProps {
    title: Title;
}

export interface FormData {
    email: string;
    password: string;
    passwordConfirmation?: string;
}

export default function AuthForm({ title }: AuthProps) {

    const navigate = useNavigate();
    const [isShowingPassword, setIsShowingPassword] = useState(false);
    const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', passwordConfirmation: '' } as FormData);

    const { setToken } = useContext(UserContext);

    function handleFormData(e: React.ChangeEvent) {
        var element = e.target as HTMLInputElement;
        setFormData({ ...formData, [element.name]: element.value })
    }

    async function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();

        if (title === "Cadastro") {
            const promise = await api.signUp(formData);
            if (promise) {
                navigate('/sign-in');
            }
        } else {
            delete formData.passwordConfirmation;
            const token = await api.signIn(formData);
            if (token) {
                localStorage.setItem('token', token);
                setToken(token);
                navigate('/');
            }
        }
    }

    return (
        <Container>
            <p className="title">{title}</p>
            <GithubButton>Entrar com o GITHUB</GithubButton>
            <Spacer>
                <div></div> ou <div></div>
            </Spacer>
            <InputsForm>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={e => handleFormData(e)}
                    value={formData.email}
                />
                <div className="password">
                    <input
                        name="password"
                        type={isShowingPassword ? "text" : "password"}
                        placeholder="Senha"
                        onChange={e => handleFormData(e)}
                        value={formData.password}
                    />
                    {isShowingPassword ?
                        <IoEyeOff
                            onClick={() => setIsShowingPassword(!isShowingPassword)}
                            className="show-hide"
                        />
                        :
                        <IoEye
                            onClick={() => setIsShowingPassword(!isShowingPassword)}
                            className="show-hide"
                        />
                    }
                </div>
                {
                    title === 'Cadastro' &&
                    <div className="password">
                        <input
                            name="passwordConfirmation"
                            type={isShowingConfirmation ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            onChange={e => handleFormData(e)}
                            value={formData.passwordConfirmation}
                        />
                        {isShowingConfirmation ?
                            <IoEyeOff
                                onClick={() => setIsShowingConfirmation(!isShowingConfirmation)}
                                className="show-hide"
                            />
                            :
                            <IoEye
                                onClick={() => setIsShowingConfirmation(!isShowingConfirmation)}
                                className="show-hide"
                            />
                        }
                    </div>
                }
                <LinkButtonDiv>
                    {title === 'Cadastro' ?
                        <>
                            <p onClick={() => navigate('/sign-in')}>Já possuo cadastro</p>
                            <button onClick={e => handleSubmit(e)}>cadastrar</button>
                        </> :
                        <>
                            <p onClick={() => navigate('/sign-up')}>Não possuo cadastro</p>
                            <button onClick={e => handleSubmit(e)}>entrar</button>
                        </>
                    }

                </LinkButtonDiv>
            </InputsForm>
        </Container>
    );
}