import styled from "styled-components";

export const Container = styled.main`
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
`

export const Content = styled.div`
    width: 700px;
    height: 100vh;

    margin-top: 36px;

    @media (max-width: 700px) {
        width: 100%;
    }
`

export const NavMenu = styled.nav`
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

`

export const TestsDiv = styled.div`
    width: 100%;
`

export const TitleDiv = styled.div`
    width: 100%;
    height: 62px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 0 12px;

    background-color: #FFFFFF;

    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 4px 4px;

    margin: -6px 0;

    p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.15px;
        color: rgba(0, 0, 0, 0.8);
    }

    .open-icon {
        font-size: 28px;
        color: #8D8D8D;

        cursor: pointer;
    }
`

export const OpenContent = styled.div`
    margin: 20px 0; 

    background-color: #FFFFFF;

    border-radius: 4px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);

    .border-fix {
        border-radius: 4px 4px 0 0;
        box-shadow: none;
    }
`

export const TestsData = styled.div`
    margin-top: 6px;

    padding-bottom: 15px;
`

export const Test = styled.div`
    box-sizing: border-box;
    
    padding: 0 38px;

    p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0.15px;
    }
    
    .test-title {
        font-size: 14px;
        color: #000000;
        margin-top: 15px;
        margin-bottom: 8px;
    }
    
    .test-name {
        font-size: 12px;
        line-height: 25px;
        color: #8D8D8D;
    }
`

export const SubjectDiv = styled.div`
    width: 100%;
    height: 62px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 0 28px;

    background-color: #FFFFFF;

    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 4px 4px;

    margin: -6px 0;

    p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.15px;
        color: rgba(0, 0, 0, 0.8);
    }

    .open-icon {
        font-size: 28px;
        color: #8D8D8D;

        cursor: pointer;
    }
`