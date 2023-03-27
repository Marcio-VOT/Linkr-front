import { Formik, Field } from "formik"
import * as Yup from "yup"
import { singUp } from "../../services/apiAuth"
import { Link, useNavigate } from "react-router-dom"
import { ContainerForm, ContainerInputForm } from "../../styles/FormStyle"

export default function FormSignup(){
    const navigate = useNavigate()

    async function submitSignup(values){
        try {
            if(values.username & values.email & values.password & values.pictureUrl){
                await singUp({name: values.username, email: values.email, password: values.password, profileUrl: values.pictureUrl})
            }
            else {
                alert("todos os campos são obrigatórios.")
                return
            }
            navigate("/")
        } catch (error) {
            switch (error.response.status) {
                case 409:
                    alert("email já cadastrado.")
                    values.email=""
                    values.password=""
                    values.username=""
                    values.pictureUrl=""
                    break;
                case 422:
                    alert("informe todos os dados necessários.")
                    values.email=""
                    values.password=""
                    values.username=""
                    values.pictureUrl=""
                default:
                    alert("Houve um problema no servidor. Tente novamente.")
                    break;
            }
        }
    }

    return(
        <Formik
            initialValues={{email:"", password: "", username: "", pictureUrl: ""}}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email address"),
                password: Yup.string(),
                username: Yup.string(),
                pictureUrl: Yup.string().url("invalid url")
            })}
            onSubmit={submitSignup}
            >
                {
                    formik => (
                        <ContainerForm onSubmit={formik.handleSubmit}>
                            <ContainerInputForm>
                                <Field type="email" placeholder="e-mail" name="email" data-test="email"/>
                                {
                                    formik.touched.email && formik.errors.email ? (
                                        <span>{formik.errors.email}</span>
                                    ) : null
                                }
                            </ContainerInputForm>
                            <ContainerInputForm>
                                <Field type="password" placeholder="password" name="password" data-test="password"/>
                                {
                                    formik.touched.password && formik.errors.password ? (
                                        <span>{formik.errors.password}</span>
                                    ) : null
                                }
                            </ContainerInputForm>
                            <ContainerInputForm>
                                <Field type="text" placeholder="username" name="username" data-test="username"/>
                                {
                                    formik.touched.username && formik.errors.username ? (
                                        <span>{formik.errors.username}</span>
                                    ) : null
                                }
                            </ContainerInputForm>
                            <ContainerInputForm>
                                <Field type="text" placeholder="picture url" name="pictureUrl" data-test="picture-url"/>
                                {
                                    formik.touched.pictureUrl && formik.errors.pictureUrl ? (
                                        <span>{formik.errors.pictureUrl}</span>
                                    ) : null
                                }
                            </ContainerInputForm>

                            {
                                formik.isSubmitting ? <button disabled type="submit" data-test="sign-up-btn">Sign Up</button> : <button type="submit" data-test="sign-up-btn">Sign Up</button>
                            }
                            <Link data-test="login-link" to="/">Switch back to log in</Link>
                        </ContainerForm>
                    )
                }

            </Formik>
    )
}