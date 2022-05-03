import { useContext } from "react";
import SearchContext from "../../contexts/SearchContext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as api from "../../services/api";
import UserContext from "../../contexts/UserContext";
import {
    TestsDiv,
    TestsData,
    TitleDiv,
    Test,
    OpenContent,
    SubjectDiv
} from "./style";

export default function Disciplines({ disciplinesArray, setDisciplinesArray }: any) {

    const { token } = useContext(UserContext);
    const { searchInput } = useContext(SearchContext);

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

    return (
        <>
            {disciplinesArray?.filter(searchDisciplineFilter)?.map((term: any) => {
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
            })}
        </>
    );
}