import React, { useContext, useEffect, useState } from "react";
import {
    AddForm
} from "./style";
import DropDown from "../DropDown";
import * as api from "../../services/api";
import UserContext from "../../contexts/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    async function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();

        const newFormData: api.CreateTest = {
            ...formData,
            category: selectedCategory,
            discipline: selectedDiscipline,
            teacher: selectedTeacher
        }

        const promise = await api.createTest(token, newFormData);
        if (promise) {
            resetPage();
            toast.success('Prova adicionada com sucesso!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Falha ao adicionar prova', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    function resetPage() {
        setFormData({ name: '', pdfUrl: '' })
        setSelectedCategory('');
        setSelectedDiscipline('');
        setSelectedTeacher('');
        setTeachers([]);
    }

    return (
        <AddForm>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                closeButton={false}
            />
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