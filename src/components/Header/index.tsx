import { Container, LoggedIn, LoggedOut } from "./style";
import logo from '../../assets/logo.png';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export interface HeaderProps {
    isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {

    const { setToken } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/sign-in');
    }

    return (
        <Container>
            {isLoggedIn ?
                <LoggedIn>
                    <img src={logo} alt="" />
                    <RiLogoutBoxRLine onClick={handleLogout} className="logout-button" />
                    <div className="input-div">
                        <input type="text" placeholder="Pesquise por disciplina" />
                    </div>
                    <div className="separator"></div>
                </LoggedIn>
                :
                <LoggedOut>
                    <img src={logo} alt="" />
                </LoggedOut>}
        </Container>
    );
}