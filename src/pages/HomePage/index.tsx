import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import UserContext from "../../contexts/UserContext";
import * as api from "../../services/api";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import loadSvg from '../../assets/loading.svg';
import {
    Container,
    Content,
    NavMenu,
    TestsDiv,
    TitleDiv,
    OpenContent,
    TestsData,
    Test,
    SubjectDiv,
    LoadingDiv
} from "./style";

type Tabs = 'disciplinas' | 'instrutores' | 'adicionar'

export default function HomePage() {

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('disciplinas' as Tabs);
    const [disciplinesArray, setDisciplinesArray] = useState([] as any[]);
    const [teachersArray, setTeachersArray] = useState([] as any[]);

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

        const teachers = await api.getTestsByTeacher(token);
        setTeachersArray(addIsOpenKey(teachers?.data));
    }

    function addIsOpenKey(array: any[]) {
        const answer = [] as any[];
        array.map(obj => {
            answer.push({ ...obj, isOpen: false })
        });
        return answer;
    }

    function toggleOpenCloseTeacher(obj: any) {
        setTeachersArray(() => {
            for (let i = 0; i < teachersArray.length; i++) {
                if (teachersArray[i].id === obj.id) {
                    teachersArray[i].isOpen = !teachersArray[i].isOpen;
                }
            }
            return [...teachersArray];
        });
    }

    function toggleOpenCloseTerm(obj: any) {
        setDisciplinesArray(() => {
            for (let i = 0; i < disciplinesArray.length; i++) {
                if (disciplinesArray[i].termNumber === obj.termNumber) {
                    disciplinesArray[i].isOpen = !disciplinesArray[i].isOpen;
                }
            }
            return [...disciplinesArray];
        });
    }

    function toggleOpenCloseDiscipline(obj: any) {
        setDisciplinesArray(() => {
            const newArr = [];
            for (let i = 0; i < disciplinesArray.length; i++) {
                const termData = disciplinesArray[i]?.termData;
                const aux = [];
                for (let j = 0; j < termData.length; j++) {
                    if (termData[j] === obj) {
                        aux.push({ ...termData[j], isOpen: !termData[j].isOpen })
                    } else {
                        aux.push({ ...termData[j] })
                    }
                }
                newArr.push({ ...disciplinesArray[i], termData: aux });
            }
            return newArr;
        });
    }

    if (teachersArray.length === 0) {
        return (
            <>
                <Header isLoggedIn={true} />
                <LoadingDiv>
                    <img src={loadSvg} alt="" />
                </LoadingDiv>
            </>
        );
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

                    {selectedTab === 'instrutores' &&
                        teachersArray?.map(teacher => {
                            return (
                                <TestsDiv key={teacher?.id}>
                                    {teacher?.isOpen ?
                                        <OpenContent>
                                            <TitleDiv className="border-fix">
                                                <p>{teacher?.teacherName}</p>
                                                <IoIosArrowUp
                                                    className="open-icon"
                                                    onClick={() => toggleOpenCloseTeacher(teacher)} />
                                            </TitleDiv>

                                            <TestsData>
                                                {teacher?.teacherData?.map((category: any) => {
                                                    return (
                                                        <Test key={category?.id}>
                                                            <p className="test-title">{category?.categoriyName}</p>
                                                            {category?.categoryData?.map((test: any) => {
                                                                return (
                                                                    <p key={test?.id} className="test-name">
                                                                        {`${test?.name} (${test?.teacherDiscipline?.discipline?.name})`}
                                                                    </p>
                                                                )
                                                            })}

                                                        </Test>
                                                    );
                                                })}
                                            </TestsData>
                                        </OpenContent>
                                        :
                                        <TitleDiv>
                                            <p>{teacher?.teacherName}</p>
                                            <IoIosArrowDown
                                                className="open-icon"
                                                onClick={() => toggleOpenCloseTeacher(teacher)}
                                            />
                                        </TitleDiv>
                                    }
                                </TestsDiv>
                            );
                        })}


                    {selectedTab === 'disciplinas' &&
                        disciplinesArray?.map(term => {
                            return (
                                <TestsDiv key={term?.termNumber}>
                                    {term?.isOpen ?
                                        <OpenContent>
                                            <TitleDiv className="border-fix">
                                                <p>{`${term?.termNumber}º Período`}</p>
                                                <IoIosArrowUp className="open-icon" onClick={() => toggleOpenCloseTerm(term)} />
                                            </TitleDiv>

                                            <TestsData>
                                                {term?.termData?.map((discipline: any) => {
                                                    return (
                                                        discipline?.isOpen ?
                                                            <OpenContent className="shadow-fix margin-fix" key={discipline?.disciplineName} >
                                                                <TestsData>
                                                                    <SubjectDiv className="border-fix">
                                                                        <p>{discipline?.disciplineName}</p>
                                                                        <IoIosArrowDown className="open-icon" onClick={() => toggleOpenCloseDiscipline(discipline)} />
                                                                    </SubjectDiv>
                                                                    {discipline?.disciplineData?.map((test: any) => {
                                                                        return (
                                                                            <Test key={test?.id}>
                                                                                <p className="test-title">{test?.category?.name}</p>
                                                                                <p className="test-name">{`${test?.name} (${test?.teacherDiscipline?.teacher?.name})`}</p>
                                                                            </Test>
                                                                        );
                                                                    })}
                                                                </TestsData>
                                                            </OpenContent>
                                                            :
                                                            <SubjectDiv key={discipline?.disciplineName} className="border-fix">
                                                                <p>{discipline?.disciplineName}</p>
                                                                <IoIosArrowUp
                                                                    className="open-icon"
                                                                    onClick={() => toggleOpenCloseDiscipline(discipline)}
                                                                />
                                                            </SubjectDiv>
                                                    );
                                                })}
                                            </TestsData>

                                        </OpenContent>
                                        :
                                        <TitleDiv>
                                            <p>{`${term?.termNumber}º Período`}</p>
                                            <IoIosArrowDown
                                                className="open-icon"
                                                onClick={() => toggleOpenCloseTerm(term)}
                                            />
                                        </TitleDiv>
                                    }
                                </TestsDiv>
                            );
                        })
                    }

                </Content>
            </Container>
        </>
    );
}