import styled from "styled-components";
import searchImage from "../../assets/images/search.png";

export const StyledNav = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  position: relative;

  background-color: #151515;
  textarea:focus,
  input:focus {
    outline: none;
  }
  input {
    position: relative;
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
export const StyledUsers = styled.div`
  display: table-column;
  position: absolute;
`;

export const StyledLogo = styled.div`
  margin-left: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;

  letter-spacing: 0.05em;

  color: #ffffff;
`;
