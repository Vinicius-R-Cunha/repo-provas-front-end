import React, { useState } from "react";
import {
    AddForm
} from "./style";
import DropDown from "../DropDown";

export default function AddTest() {

    const [formData, setFormData] = useState({ name: '', pdfUrl: '' });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');

    function handleFormData(e: React.ChangeEvent) {
        var element = e.target as HTMLInputElement;
        setFormData({ ...formData, [element.name]: element.value })
    }

    const categorias = [
        "P1", "P2", "P3"
    ]

    const disciplinas = [
        "Cálculo", "Álgebra Linear", "Computação"
    ]

    const professores = [
        "Bonnot", "Futorny", "Kira"
    ]

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
                items={categorias}
            />
            <DropDown
                selected={selectedDiscipline}
                setSelected={setSelectedDiscipline}
                title="Disciplina"
                items={disciplinas} />
            <DropDown
                selected={selectedTeacher}
                setSelected={setSelectedTeacher}
                title="Pessoa Instrutora"
                items={professores}
            />
            <button onClick={e => handleSubmit(e)}>ENVIAR</button>
        </AddForm>
    );
}