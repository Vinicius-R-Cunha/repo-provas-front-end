import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import * as api from "../../services/api";
import loadSvg from '../../assets/loading.svg';
import {
    Container,
    Content,
    LoadingDiv,
} from "./style";
import Header from "../../components/Header";
import NavMenu from "../../components/NavMenu";
import Disciplines from "../../components/Disciplines";
import Teachers from "../../components/Teachers";
import AddTest from "../../components/AddTest";

export type Tabs = 'disciplinas' | 'instrutores' | 'adicionar';

export default function HomePage() {

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState('adicionar' as Tabs);

    const [disciplinesArray, setDisciplinesArray]: any[] = useState([]);
    const [teachersArray, setTeachersArray]: any = useState([]);
    const [categories, setCategories]: any = useState([]);
    const [disciplines, setDisciplines]: any = useState([]);

    useEffect(() => {
        validateToken(token);
        renderPage();
    }, [selectedTab]);

    async function validateToken(token: string) {
        if (!await api.validateToken(token)) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/sign-in');
        };
    }

    async function renderPage() {
        await renderDisciplinesTab();
        await renderTeachersTab();
        await renderAddTestTab();
    }

    async function renderDisciplinesTab() {
        const disciplines = await api.getTestsByDisciplines(token) as any;
        setDisciplinesArray(() => {
            const newArr = [];
            for (let i = 0; i < disciplines?.data.length; i++) {
                const termData = disciplines.data[i]?.termData;
                const newObj = { ...disciplines.data[i], termData: addIsOpenKey(termData) };
                newArr.push(newObj);
            }

            return addIsOpenKey(newArr);
        });
    }

    async function renderTeachersTab() {
        const teachers = await api.getTestsByTeacher(token);
        setTeachersArray(addIsOpenKey(teachers?.data));
    }

    async function renderAddTestTab() {
        const categoriesPromise = await api.getCategories(token);
        const disciplinesPromise = await api.getDisciplines(token);
        setCategories(categoriesPromise);
        setDisciplines(disciplinesPromise);
    }

    function addIsOpenKey(array: any[]) {
        const answer = [] as any[];
        array.map(obj => {
            answer.push({ ...obj, isOpen: false })
        });
        return answer;
    }

    if (teachersArray.length === 0) {
        return (
            <>
                <Header isLoggedIn={true} inputType={selectedTab} />
                <LoadingDiv>
                    <img src={loadSvg} alt="" />
                </LoadingDiv>
            </>
        );
    }

    return (
        <>
            <Header isLoggedIn={true} inputType={selectedTab} />
            <Container>
                <Content>
                    <NavMenu
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />

                    {selectedTab === 'disciplinas' &&
                        <Disciplines
                            disciplinesArray={disciplinesArray}
                            setDisciplinesArray={setDisciplinesArray}
                        />
                    }

                    {selectedTab === 'instrutores' &&
                        <Teachers
                            teachersArray={teachersArray}
                            setTeachersArray={setTeachersArray}
                        />
                    }

                    {selectedTab === 'adicionar' &&
                        <AddTest categories={categories} disciplines={disciplines} setSelectedTab={setSelectedTab} />
                    }
                </Content>
            </Container>
        </>
    );
}