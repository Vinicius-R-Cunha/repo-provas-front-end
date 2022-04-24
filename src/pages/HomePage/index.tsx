import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import UserContext from "../../contexts/UserContext";
import * as api from "../../services/api";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
    Container,
    Content,
    NavMenu,
    TestsDiv,
    TitleDiv,
    OpenContent,
    TestsData,
    Test,
    SubjectDiv
} from "./style";

type Tabs = 'disciplinas' | 'instrutores' | 'adicionar'

export default function HomePage() {

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('disciplinas' as Tabs);

    useEffect(() => {
        validateToken(token);
        renderPage()
    }, [selectedTab]);

    async function validateToken(token: string) {
        if (!await api.validateToken(token)) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/sign-in');
        };
    }

    function renderPage() {
        if (selectedTab === 'disciplinas') {
            console.log('renderizou');
        } else if (selectedTab === 'instrutores') {
            console.log('renderizou');
        } else if (selectedTab === 'adicionar') {
            console.log('renderizou');
        }
    }

    function openTab(tab: any) {
        console.log('abriu');
    }

    function closeTab(tab: any) {
        console.log('fechou');
    }

    return (
        <>
            <Header isLoggedIn={true} />
            <Container>
                <Content>
                    <NavMenu>
                        <button
                            className={selectedTab === 'disciplinas' ? 'selected' : ''}
                            onClick={() => setSelectedTab('disciplinas')}
                        >
                            disciplinas
                        </button>
                        <button
                            className={selectedTab === 'instrutores' ? 'selected' : ''}
                            onClick={() => setSelectedTab('instrutores')}
                        >
                            pessoa instrutora
                        </button>
                        <button
                            className={selectedTab === 'adicionar' ? 'selected' : ''}
                            onClick={() => setSelectedTab('adicionar')}
                        >
                            adicionar
                        </button>
                    </NavMenu>
                    {/* aba disciplinas
                    <TestsDiv>
                        <OpenContent>
                            <TitleDiv className="border-fix">
                                <p>10 Período</p>
                                <IoIosArrowUp className="open-icon" onClick={() => closeTab('Fulano')} />
                            </TitleDiv>

                            <TestsData>
                                <SubjectDiv className="border-fix">
                                    <p>CSS</p>
                                    <IoIosArrowUp className="open-icon" onClick={() => closeTab('Fulano')} />
                                </SubjectDiv>
                                <Test>
                                    <p className="test-title">P1</p>
                                    <p className="test-name">2022 - globo.com (CSS)</p>
                                </Test>
                                <Test>
                                    <p className="test-title">P1</p>
                                    <p className="test-name">2022 - globo.com (CSS)</p>
                                </Test>
                                <Test>
                                    <p className="test-title">P1</p>
                                    <p className="test-name">2022 - globo.com (CSS)</p>
                                </Test>

                                <SubjectDiv className="border-fix">
                                    <p>HTML</p>
                                    <IoIosArrowUp className="open-icon" onClick={() => closeTab('Fulano')} />
                                </SubjectDiv>
                                <SubjectDiv className="border-fix">
                                    <p>JAVASCRIPT</p>
                                    <IoIosArrowUp className="open-icon" onClick={() => closeTab('Fulano')} />
                                </SubjectDiv>
                            </TestsData>

                        </OpenContent>

                        <TitleDiv>
                            <p>10 Período</p>
                            <IoIosArrowDown className="open-icon" onClick={() => openTab('Fulano')} />
                        </TitleDiv>
                    </TestsDiv> */}

                    {/* aba instrutores
                    <TestsDiv>
                        <OpenContent>
                            <TitleDiv className="border-fix">
                                <p>Fulano</p>
                                <IoIosArrowUp className="open-icon" onClick={() => closeTab('Fulano')} />
                            </TitleDiv>
                            <TestsData>
                                <Test>
                                    <p className="test-title">P1</p>
                                    <p className="test-name">2022 - globo.com (CSS)</p>
                                </Test>
                                <Test>
                                    <p className="test-title">P2</p>
                                    <p className="test-name">2022 - globo.com (HTML)</p>
                                    <p className="test-name">2022 - instagram.com (HTML)</p>
                                </Test>
                                <Test>
                                    <p className="test-title">P3</p>
                                    <p className="test-name">2022 - parrots (JavaScript)</p>
                                </Test>
                            </TestsData>
                        </OpenContent>

                        <TitleDiv>
                            <p>Fulano</p>
                            <IoIosArrowDown className="open-icon" onClick={() => openTab('Fulano')} />
                        </TitleDiv>
                    </TestsDiv> */}
                </Content>
            </Container>
        </>
    );
}