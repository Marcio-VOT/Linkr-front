import styled from "styled-components";

export const ContainerForm = styled.form`
    height: 100vh;
    background-color: #333333;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 23px;
    padding-right: 23px;
    gap: 13px;
    a {
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        color: #FFFFFF;
    }
    button {
        width: 100vh;
        max-width: 429px;
        min-width: 350px;
        height: 65px;
        border-radius: 6px;
        border: none;
        background-color: #1877F2;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
        color: #FFFFFF;
        cursor: pointer;
    }
`
export const ContainerInputForm = styled.div`
    input {
        width: 100vw;
        max-width: 429px;
        min-width: 350px;
        height: 65px;
        border: none;
        border-radius: 6px;
        background-color: #ffffff;
        color: #000000;
        font-size: 27px;
        font-weight: 500;
        font-family: 'Oswald', sans-serif;
        padding-left: 17px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        &::placeholder {
            font-family: 'Oswald', sans-serif;
            color: #9F9F9F;
            line-height: 40px;
        }
    }
    span {
            display: block;
            font-size: 14px;
            font-family: 'Lato', sans-serif;
            color: #ffffff;
            margin-top: 2px;
        }
`