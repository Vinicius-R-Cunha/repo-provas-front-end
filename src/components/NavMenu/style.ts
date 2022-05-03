import styled from "styled-components";

export const Container = styled.nav`
    width: 100%;

    display: flex;
    justify-content: space-between;

    margin-bottom: 56px;

    button {
        all: unset;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        text-align: center;
        line-height: 16px;
        color: #1976D2;

        background-color:#E5E5E5;

        padding: 10px 15px;

        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;

        cursor: pointer;
    }

    .selected {
        color: #FFFFFF;
        background-color: #1976D2;
    }

    @media (max-width: 465px) {
        button {
            font-size: 10px;
            padding: 2% 3.5%;
        }
    }
`