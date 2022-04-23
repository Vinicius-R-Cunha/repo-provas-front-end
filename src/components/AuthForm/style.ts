import styled from "styled-components";

export const Container = styled.div`
    width: fit-content;
    /* width: 100%; */
    
    background-color: green;

    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        letter-spacing: 0.15px;

        color: rgba(0, 0, 0, 0.8);
    }
`

export const GithubButton = styled.button`
    all: unset;

    width: 464px;
    height: 36px;

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

    margin-top: 30px;

    background-color: #424445;

    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
    border-radius: 4px;

    cursor: pointer;
`

export const Spacer = styled.div`
    width: 100%;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.8);

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 22px;

    div {
        width: 47%;
        height: 1px;

        background-color: #C4C4C4;
    }
`

export const InputsForm = styled.form`
    width: 464px;

    margin-top: 20px;

    .password {
        position: relative;

        .show-hide {
            font-size: 28px;
            color: rgba(0, 0, 0, 0.54);

            position: absolute;
            top: 15.5px;
            right: 14px;

            cursor: pointer;
        }
    }
    
    input {
        all: unset;
    
        width: 100%;
        height: 60px;
        
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.15px;
        text-indent: 12px;
        
        margin-bottom: 15px;
        
        box-sizing:border-box;
        
        border-radius: 4px;
        border: 1px solid #C4C4C4;
        
        ::placeholder {
            color: rgba(0, 0, 0, 0.6);
        }
    }
`

export const LinkButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 12px;

    p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: 0.15px;
        text-decoration-line: underline;
        color: rgba(70, 115, 202, 0.8);

        cursor: pointer;
    }

    button {
        all: unset;

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
        
        padding: 11px 16px;
        
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
        border-radius: 4px;

        cursor: pointer;
    }
`