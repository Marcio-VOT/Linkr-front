import styled from "styled-components"
import FormSignup from "../../comps/FormSignup"

export default function Signup() {
    return (
        <ContainerLogin>
            <ContainerLogo>
                <h1>Linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </ContainerLogo>
            <FormSignup />
        </ContainerLogin>
    )
}

const ContainerLogin = styled.div`
width: 100%;
height: 100vh;
display: flex;
background-color: #151515;
`

const ContainerLogo = styled.div`
    height: 100vh;
    width: 905px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 144px;
    margin-top: -100px;
    h1 {
        font-family: 'Passion One', sans-serif;
        font-size: 106px;
        font-weight: 700;
        line-height: 116px;
        letter-spacing: 5%;
        width: 100%;
        max-width: 442px;
    }
    p {
        width: 100%;
        max-width: 442px;
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
    }
`
