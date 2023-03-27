import styled from "styled-components";

export const ReloadeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 17px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  border-color: transparent;
  min-height: 61px;
  height: 61px;
  img {
    margin-left: 8px;
  }
  @media (max-width: 600px) {
    border-radius: 0;
  }
`;
