import styled from "styled-components";

export const AddForm = styled.form`
    width: 100%;

    display: flex;
    flex-direction: column;

    input {
        all: unset;

        width: 100%;
        height: 56px;

        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        text-indent: 10px;
        letter-spacing: 0.15px;

        margin-bottom: 30px;

        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;

        ::placeholder {
            color: rgba(0, 0, 0, 0.6);
        }
    }

    button {
        all: unset;

        width: 100%;
        height: 46px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: #FFFFFF;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #1976D2;

        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
        border-radius: 4px;

        cursor: pointer;
    }
`

export const CustomSelect = styled.div`
    width: 100%;

    position: relative;
`