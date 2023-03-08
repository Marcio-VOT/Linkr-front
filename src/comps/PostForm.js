import styled, { StyledComponent } from "styled-components";

export default function PostForm(){
    return(
        <PostFormContainer>
            <FormContent>
                <CustomerData>
                    <img src="https://static.wikia.nocookie.net/meme/images/7/72/Irineu.png/revision/latest?cb=20170223020835&path-prefix=pt-br"/>
                    <p>What are you going to share today?</p>
                </CustomerData>
                <form data-test="publish-box">
                    <input
                        className="link-input"
                        type="url"
                        id='url'
                        placeholder=' http://...'
                        required
                        name='url'
                        data-test='link'
                    />
                    <input
                        className="description-input"
                        type="text"
                        id='description'
                        placeholder=' Awesome article about #javascript'
                        required
                        name='description'
                        data-test='description'
                    />

                    <button 
                        type='submit' 
                        data-test='publish-btn'>Publish</button>
                </form>
            </FormContent>
        </PostFormContainer>
    )
}

const PostFormContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
`

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        input{
            width: 100%;
            background: #EFEFEF;
            border-radius: 5px;
            border: none;
            margin-bottom: 5px;
        }        
        
        .link-input{        
            height: 30px;
        }

        .description-input{
            height: 66px;
        }

        button{
            width: 20%;
            height: 31px;
            color: #FFFFFF;
            background: #1877F2;
            border-radius: 5px;
            border: none;
        }
    }
`

const CustomerData = styled.div`
    display: flex;
    align-items: center;

    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;

        color: #707070;
    }
`