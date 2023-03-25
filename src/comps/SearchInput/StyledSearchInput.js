import styled from "styled-components";
import searchImage from "../../assets/images/search.png";

export const StyledSearchInput = styled.div`
  width: ${(props) => (props.WindowWidth <= 600 ? "95%" : "40%")};
  position: relative;
  margin: auto;

  input {
    width: 100%;
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
    background-image: URL(${searchImage});
    background-repeat: no-repeat;
    background-position: calc(100% - 14px);
    background-size: 21px;
  }
`;

export const StyledSearchList = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  padding-top: 59px;
  background: #e7e7e7;
  border-radius: 8px;
  display: column;
`;
