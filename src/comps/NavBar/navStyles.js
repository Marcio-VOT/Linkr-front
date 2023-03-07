import styled from "styled-components";
import searchImage from "../../assets/images/search.png";

export const StyledNav = styled.div`
  height: 72px;
  width: 100%;
  display: flex;

  background-color: #151515;
  textarea:focus,
  input:focus {
    outline: none;
  }
  input {
    width: 40%;
    margin: auto;
    height: 45px;
    background: #ffffff;
    border-radius: 8px;
    border-style: none;
    border: none;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #c6c6c6;
    padding-left: 14px;
    padding-right: 50px;
    background-image: URL(${searchImage});
    background-repeat: no-repeat;
    background-position: calc(100% - 14px);
    background-size: 21px;
  }
`;
