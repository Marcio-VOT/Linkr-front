import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import FormSignup from "../../comps/FormSignup/FormSignup"
import { validToken } from "../../services/apiAuth"

export default function Signup() {
    const navigate = useNavigate()
    
    useEffect(() => {
        async function validateToken(){
            try {
                const token = localStorage.getItem("token")
                const result = await validToken({token})
                if(result.status === 200){
                    navigate("/timeline")  
                }
            } catch (error) {
                console.log(error)
            }
        }
        
        validateToken()
    }, [])


    return (
        <ContainerSignup>
            <ContainerLogo>
                <h1>Linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </ContainerLogo>
            <FormSignup />
        </ContainerSignup>
    )
}

const ContainerSignup = styled.div`
width: 100%;
height: 100vh;
display: flex;
background-color: #151515;
@media (max-width: 800px) {
    flex-direction: column;
}
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
    @media (max-width: 800px) {
        width: 100%;
        margin: auto;
        align-items: center;
        padding-left: 23px;
        padding-right: 23px;
        text-align: center;
        height: 375px;
    }
    h1 {
        font-family: 'Passion One', sans-serif;
        font-size: 106px;
        font-weight: 700;
        line-height: 116px;
        letter-spacing: 5%;
        width: 100%;
        max-width: 442px;
        @media (max-width: 800) {
            font-size: 76px;
        }
    }
    p {
        width: 100%;
        max-width: 442px;
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        @media (max-width) {
          font-size: 23px;
        }
    }
`
