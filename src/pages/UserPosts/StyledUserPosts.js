import styled from "styled-components";

export const HomePageContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 125px;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 19px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    padding-top: 19px;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #151515;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 611px;
  padding-left: 16px;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
  }
`;

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
  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
  }
`;
