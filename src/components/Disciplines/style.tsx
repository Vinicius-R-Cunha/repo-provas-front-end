import styled from "styled-components";

export const TestsDiv = styled.div`
    width: 100%;

    .shadow-fix {
        box-shadow: none;
    }

    .margin-fix {
        margin: 0;
    }

    .hidden {
        max-height: 0;
        transition: max-height 0.2s ease-out;
        visibility: hidden;
        overflow: hidden;
        margin: 0;
    }
    
    .active {
        max-height: 10000px;
        transition: max-height 2.2s ease-in;
    }
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
    border-radius: 4px;

    margin: -3px 0;

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
    margin-bottom: 20px;

    background-color: #FFFFFF;

    border-radius: 4px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
`

export const TestsData = styled.div`
    padding-bottom: 4px;
`

export const Test = styled.div`
    box-sizing: border-box;
    
    padding: 5px 38px;

    p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0.15px;
    }
    
    .test-title {
        font-size: 14px;
        color: #000000;
        margin-bottom: 8px;
    }
    
    .test-name {
        font-size: 12px;
        line-height: 21px;
        color: #1976D2;
        margin-left: 12px;
        cursor: pointer;
    }
    
    .view-quantity {
        font-size: 12px;
        color: #8D8D8D;
        margin: 7px 0 12px 12px;
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