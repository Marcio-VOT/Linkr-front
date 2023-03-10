import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #333333;

  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
`;

export const TimeLineContent = styled.div`
  margin-top: ${window.innerWidth <= 600 ? "50px" : "120px"};
  width: 50%;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #151515;
    margin-right: 18px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;
export const SearchContainer = styled.div`
  width: 100%;
  padding-top: 82px;
  background-color: #333333;
  position: relative;
  z-index: 0;
  button:focus,
  textarea:focus,
  input:focus {
    outline: none;
  }
  input {
    position: absolute;
    z-index: 1;
  }
`;
