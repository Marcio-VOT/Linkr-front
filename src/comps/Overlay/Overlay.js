import styled from "styled-components"

export function Overlay({setLog}){
    return(
        <OverlayStyle 
        onClick={() => {
            setLog((log) => !log);
          }}
          >
        </OverlayStyle>
    )
}

const OverlayStyle = styled.div`
position: absolute;
width: 100%;
height: 100vh;
top: 0;
left: 0;
`