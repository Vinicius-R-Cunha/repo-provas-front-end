import styled from "styled-components";

export const Container = styled.header`
    width: 100%;

    margin-top: 55px;
`

export const LoggedIn = styled.div`
    position: relative;
    
    img {
        margin-left: 5%;
    }

    .logout-button {
        font-size: 35px;

        position: absolute;
        top: -18px;
        right: 2%;
    }

    .input-div {
        display: flex;
        justify-content: center;

        margin-top: 48px;

        input {
            all: unset;

            width: 464px;
            height: 56px;

            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            text-indent: 10px;

            display: flex;
            align-items: center;
            letter-spacing: 0.15px;

            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 4px;

            ::placeholder {
                color: rgba(0, 0, 0, 0.6);
            }
        }
    }

    .separator {
        width: 100%;
        height: 2px;

        margin-top: 25px;

        background-color: #C4C4C4;
    }
`

export const LoggedOut = styled.div`
    display: flex;
    justify-content: center;
`