import styled from "styled-components";

export const StyledNav = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background-color: #151515;
  z-index: 10;
  button:focus,
  textarea:focus,
  input:focus {
    outline: none;
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
