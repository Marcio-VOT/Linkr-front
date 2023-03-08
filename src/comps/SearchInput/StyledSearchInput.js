import styled from "styled-components";
import searchImage from "../../assets/images/search.png";

export const StyledSearchInput = styled.div`
  width: 40%;
  position: relative;

  input {
    z-index: 2;
    width: 100%;
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

export const StyledSearchList = styled.div`
  a {
    text-decoration: none;
  }
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  padding-top: 59px;
  background: #e7e7e7;
  border-radius: 8px;
  display: column;
  div {
    display: flex;
    align-items: center;
    padding-left: 17px;
    margin-bottom: 17px;
    img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
      background-color: #333333;
    }
    h1 {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 23px;
      color: #515151;
      margin-left: 12px;
    }
  }
`;
