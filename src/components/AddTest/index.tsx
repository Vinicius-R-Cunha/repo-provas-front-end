import React from "react";
import {
    AddForm
} from "./style";

export default function AddTest() {

    function sendForm(e: React.MouseEvent) {
        e.preventDefault();
        console.log('enviar');
    }

    return (
        <AddForm>
            <input type="text" placeholder="Título da prova" />
            <input type="text" placeholder="PDF da prova" />
            <input type="text" placeholder="Categoria" />
            <input type="text" placeholder="Disciplina" />
            <input type="text" placeholder="Pessoa Instrutora" />
            <button onClick={e => sendForm(e)}>ENVIAR</button>
        </AddForm>
    );
}