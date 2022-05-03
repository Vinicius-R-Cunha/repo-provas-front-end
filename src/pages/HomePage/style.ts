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

    .margin-top {
        margin-top: 20px;
    }

    @media (max-width: 700px) {
        width: 100%;
    }
`

export const LoadingDiv = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #E5E5E5;

    position:absolute;
    top:0px;
    right:0px;
    bottom:0px;
    left:0px;

    z-index: -1;
`