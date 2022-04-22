import { Container, LoggedIn, LoggedOut } from "./style";
import logo from '../../assets/logo.png';
import { RiLogoutBoxRLine } from 'react-icons/ri';

export interface HeaderProps {
    isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
    return (
        <Container>
            {isLoggedIn ?
                <LoggedIn>
                    <img src={logo} alt="" />
                    <RiLogoutBoxRLine className="logout-button" />
                    <div className="input-div">
                        <input type="text" placeholder="Pesquise por disciplina" />
                    </div>
                </LoggedIn>
                :
                <LoggedOut>
                    <img src={logo} alt="" />
                </LoggedOut>}
        </Container>
    );
}