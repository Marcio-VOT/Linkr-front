import styled from "styled-components";

export const HomePageContainer = styled.div`
  width: 100%;
  margin-top: 70px;
  min-height: 100vh;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 19px;
  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
  @media (max-width: 600px){
    margin-top: -1px;
  }
`;

export const TimeLineContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 611px;
    padding-left: 16px;
    gap: 16px;
    img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #151515;
  }
`

export const SearchContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #333333;
  display: flex;
  align-items: center;
  padding: 15px;
  button:focus,
  textarea:focus,
  input:focus {
    outline: none;
  }
  display: none;
  @media(max-width: 600px){
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
  }
`;
