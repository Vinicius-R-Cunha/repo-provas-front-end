import { Container, LoggedIn, LoggedOut } from "./style";
import logo from '../../assets/logo.png';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import SearchContext from "../../contexts/SearchContext";

export interface HeaderProps {
    isLoggedIn: boolean;
    inputType: 'disciplinas' | 'instrutores' | 'adicionar';
}

export default function Header({ isLoggedIn, inputType }: HeaderProps) {

    const { setToken } = useContext(UserContext);
    const { searchInput, setSearchInput } = useContext(SearchContext);
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
                        {inputType === 'adicionar' ?
                            <p>Adicione uma prova</p>
                            :
                            <input
                                type="text"
                                placeholder={inputType === 'disciplinas' ?
                                    'Pesquise por disciplina' :
                                    'Pesquise por pessoa instrutora'
                                }
                                onChange={e => setSearchInput(e.target.value)}
                                value={searchInput}
                            />}
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