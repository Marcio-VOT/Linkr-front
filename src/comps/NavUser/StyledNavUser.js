import styled from "styled-components";

export const StyledArrow = styled.img`
  width: 22px;
  height: 13px;
  transition: transform 0.1s;

  -webkit-transform: scaleY(${(props) => (props.log ? "1" : "-1")});
  transform: scaleY(${({ log }) => (log ? "1" : "-1")});
`;

export const StyledProfilePicture = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  margin-left: 15px;
`;

export const StyledNavUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 17px;
  z-index: 10;
`;
