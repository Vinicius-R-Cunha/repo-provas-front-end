import React, { useContext, useEffect, useState } from "react";
import {
    AddForm
} from "./style";
import DropDown from "../DropDown";
import * as api from "../../services/api";
import UserContext from "../../contexts/UserContext";

export default function AddTest({ categories, disciplines }: any) {

    const { token } = useContext(UserContext);

    const [formData, setFormData]: any = useState({ name: '', pdfUrl: '' });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [teachers, setTeachers]: any = useState([]);

    useEffect(() => {
        getTeachers();
    }, [selectedDiscipline]);

    function handleFormData(e: React.ChangeEvent) {
        var element = e.target as HTMLInputElement;
        setFormData({ ...formData, [element.name]: element.value })
    }

    async function getTeachers() {
        if (selectedDiscipline !== '') {
            const promise = await api.getTeachersByDisciplines(token, selectedDiscipline);
            setTeachers(promise);
        }
    }

    function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();

        const newFormData = {
            ...formData,
            category: selectedCategory,
            discipline: selectedDiscipline,
            teacher: selectedTeacher
        }
        console.log(newFormData);
    }

    return (
        <AddForm>
            <input
                name="name"
                type="text"
                placeholder="Título da prova"
                onChange={e => handleFormData(e)}
                value={formData.name}
            />
            <input
                name="pdfUrl"
                type="url"
                placeholder="PDF da prova"
                onChange={e => handleFormData(e)}
                value={formData.pdfUrl}
            />
            <DropDown
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                title="Categoria"
                items={categories}
            />
            <DropDown
                selected={selectedDiscipline}
                setSelected={setSelectedDiscipline}
                title="Disciplina"
                items={disciplines}
            />
            <DropDown
                disabled={teachers.length === 0 ? true : false}
                selected={selectedTeacher}
                setSelected={setSelectedTeacher}
                title="Pessoa Instrutora"
                items={teachers}
            />
            <button onClick={e => handleSubmit(e)}>ENVIAR</button>
        </AddForm>
    );
}