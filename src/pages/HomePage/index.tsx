import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import UserContext from "../../contexts/UserContext";
import SearchContext from "../../contexts/SearchContext";
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
    const { searchInput, setSearchInput } = useContext(SearchContext);
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

    function searchTeacherFilter(teacher: any) {
        return teacher?.teacherName?.toUpperCase()?.includes(searchInput.toUpperCase());
    }

    function searchDisciplineFilter(term: any) {
        for (let i = 0; i < term?.termData.length; i++) {
            if (term?.termData[i]?.disciplineName?.toUpperCase().includes(searchInput.toUpperCase())) {
                return true;
            }
        }
        return false;
    }

    async function openPdf(link: string, id: number) {
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;

        const response = await api.updateViews(token, id);
        if (!response) {
            window.location.reload();
        }
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
                    <NavMenu>
                        <button
                            className={selectedTab === 'disciplinas' ? 'selected' : ''}
                            onClick={() => {
                                setSelectedTab('disciplinas');
                                setSearchInput('');
                            }}
                        >
                            disciplinas
                        </button>
                        <button
                            className={selectedTab === 'instrutores' ? 'selected' : ''}
                            onClick={() => {
                                setSelectedTab('instrutores');
                                setSearchInput('');
                            }}
                        >
                            pessoa instrutora
                        </button>
                        <button
                            className={selectedTab === 'adicionar' ? 'selected' : ''}
                            onClick={() => {
                                setSelectedTab('adicionar');
                                setSearchInput('');
                            }}
                        >
                            adicionar
                        </button>
                    </NavMenu>

                    {selectedTab === 'disciplinas' &&
                        disciplinesArray?.filter(searchDisciplineFilter)?.map(term => {
                            return (
                                <TestsDiv key={term?.termNumber} className={term?.isOpen ? 'margin-top' : ''}>

                                    <TitleDiv>
                                        <p>{`${term?.termNumber}º Período`}</p>
                                        {term?.isOpen ? <IoIosArrowUp
                                            className="open-icon"
                                            onClick={() => toggleOpenCloseTerm(term)} />
                                            :
                                            <IoIosArrowDown
                                                className="open-icon"
                                                onClick={() => toggleOpenCloseTerm(term)} />}
                                    </TitleDiv>

                                    <OpenContent className={term?.isOpen ? 'active' : 'hidden'}>
                                        {term?.termData?.map((discipline: any) => {
                                            return (
                                                <TestsData key={discipline?.disciplineName}>
                                                    <SubjectDiv className="border-fix">
                                                        <p>{discipline?.disciplineName}</p>
                                                        {discipline?.isOpen ?
                                                            <IoIosArrowUp
                                                                className="open-icon"
                                                                onClick={() => toggleOpenCloseDiscipline(discipline)} />
                                                            : <IoIosArrowDown
                                                                className="open-icon"
                                                                onClick={() => toggleOpenCloseDiscipline(discipline)} />}
                                                    </SubjectDiv>

                                                    <OpenContent className={`shadow-fix margin-fix ${discipline?.isOpen ? 'active' : 'hidden'}`} key={discipline?.disciplineName} >
                                                        <TestsData>
                                                            {discipline?.disciplineData?.map((test: any) => {
                                                                return (
                                                                    <Test key={test?.id}>
                                                                        <div>
                                                                            <p className="test-title">{test?.category?.name}</p>
                                                                            <p onClick={() => openPdf(test?.pdfUrl, test?.id)} className="test-name">{`${test?.name} (${test?.teacherDiscipline?.teacher?.name})`}</p>
                                                                        </div>
                                                                        <p className="view-quantity">{`${test?.views} visualizações`}</p>
                                                                    </Test>
                                                                );
                                                            })}
                                                        </TestsData>
                                                    </OpenContent>

                                                </TestsData>
                                            );
                                        })}
                                    </OpenContent>

                                </TestsDiv>
                            );
                        })
                    }

                    {selectedTab === 'instrutores' &&
                        teachersArray?.filter(searchTeacherFilter)?.map(teacher => {
                            return (
                                <TestsDiv key={teacher?.id} className={teacher?.isOpen ? 'margin-top' : ''}>

                                    <TitleDiv>
                                        <p>{teacher?.teacherName}</p>
                                        {teacher?.isOpen ? <IoIosArrowUp
                                            className="open-icon"
                                            onClick={() => toggleOpenCloseTeacher(teacher)} />
                                            :
                                            <IoIosArrowDown
                                                className="open-icon"
                                                onClick={() => toggleOpenCloseTeacher(teacher)} />}
                                    </TitleDiv>

                                    <OpenContent className={teacher?.isOpen ? 'active' : 'hidden'}>
                                        <TestsData>
                                            {teacher?.teacherData?.map((category: any) => {
                                                return (
                                                    <Test key={category?.id}>
                                                        <p className="test-title">{category?.categoryName}</p>
                                                        {category?.categoryData?.map((test: any) => {
                                                            return (
                                                                <React.Fragment key={test?.id}>
                                                                    <p onClick={() => openPdf(test?.pdfUrl, test?.id)} className="test-name">
                                                                        {`${test?.name} (${test?.teacherDiscipline?.discipline?.name})`}
                                                                    </p>
                                                                    {test?.views === 1 ?
                                                                        <p className="view-quantity">{`${test?.views} visualização`}</p>
                                                                        :
                                                                        <p className="view-quantity">{`${test?.views} visualizações`}</p>
                                                                    }
                                                                </React.Fragment>
                                                            )
                                                        })}

                                                    </Test>
                                                );
                                            })}
                                        </TestsData>
                                    </OpenContent>


                                </TestsDiv>
                            );
                        })
                    }

                </Content>
            </Container>
        </>
    );
}