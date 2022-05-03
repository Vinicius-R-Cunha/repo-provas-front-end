import React from "react";
import { useContext } from "react";
import SearchContext from "../../contexts/SearchContext";
import UserContext from "../../contexts/UserContext";
import * as api from "../../services/api";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
    TestsDiv,
    TitleDiv,
    OpenContent,
    TestsData,
    Test,
} from "./style";

export default function Teachers({ teachersArray, setTeachersArray }: any) {
    const { searchInput } = useContext(SearchContext);
    const { token } = useContext(UserContext);

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

    function searchTeacherFilter(teacher: any) {
        return teacher?.teacherName?.toUpperCase()?.includes(searchInput.toUpperCase());
    }

    async function openPdf(link: string, id: number) {
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;

        const response = await api.updateViews(token, id);
        if (!response) {
            window.location.reload();
        }
    }

    return (
        <>
            {teachersArray?.filter(searchTeacherFilter)?.map((teacher: any) => {
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
            })}
        </>
    );
}