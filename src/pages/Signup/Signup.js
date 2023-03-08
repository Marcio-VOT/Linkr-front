import { Link } from "react-router-dom"
import styled from "styled-components"
import { ContainerForm, ContainerInputForm } from "../../styles/FormStyle"

export default function Signup(){
    return(
        <ContainerLogin>
            <ContainerLogo>
                <h1>Linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </ContainerLogo>
                <ContainerForm>
                    <ContainerInputForm>
                        <input type="text" placeholder="e-mail" />
                    </ContainerInputForm>
                    <ContainerInputForm>
                        <input type="text" placeholder="password" />
                    </ContainerInputForm>
                    <ContainerInputForm>
                        <input type="text" placeholder="username" />
                    </ContainerInputForm>
                    <ContainerInputForm>
                        <input type="text" placeholder="picture url" />
                    </ContainerInputForm>
                    <button>Sign Up</button>
                    <Link to="/">Switch back to log in</Link>
                </ContainerForm>
            
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
        font-family: Passion One, "sans-serif";
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
        font-family: Oswald, "sans-serif";
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
    }
`
