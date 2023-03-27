import { Formik, Field } from "formik"
import * as Yup from "yup"
import { signIn } from "../../services/apiAuth"
import { Link, useNavigate } from "react-router-dom"
import { ContainerForm, ContainerInputForm } from "../../styles/FormStyle"

export default function FormLogin() {
    const navigate = useNavigate()

    async function submitLogin(values) {
        try {
            if (values.email && values.password) {
                const result = await signIn({ email: values.email, password: values.password })
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("avatar", result.data.avatar)
                localStorage.setItem("userid", result.data.userId)
            } else {
                alert("preencha todos os campos obrigatórios")
                return
            }

            navigate("/timeline")
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    alert("email ou senha incorretos.");
                    break;
                case 404:
                    alert("usuário não encontrado.")
                    break;
                case 422:
                    alert("Informe todos os campos.")
                    break;
                default:
                    break;
            }
        }
    }
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email address"),
                password: Yup.string()
            })}
            onSubmit={submitLogin}
        >
            {
                formik => (
                    <ContainerForm onSubmit={formik.handleSubmit}>
                        <ContainerInputForm>
                            <Field type="text" placeholder="e-mail" name="email" data-test="email" />
                            {
                                formik.touched.email && formik.errors.email ? (
                                    <span>{formik.errors.email}</span>
                                ) : null
                            }
                        </ContainerInputForm>
                        <ContainerInputForm>
                            <Field type="password" placeholder="password" name="password" data-test="password" />
                            {
                                formik.touched.password && formik.errors.password ? (
                                    <span>{formik.errors.password}</span>
                                ) : null
                            }
                        </ContainerInputForm>
                        {formik.isSubmitting ? <button disabled type="submit" data-test="login-btn">Log In</button> : <button type="submit" data-test="login-btn">Log In</button>}
                        <Link data-test="sign-up-link" to="/sign-up">First time? Create an account!</Link>
                    </ContainerForm>
                )
            }
        </Formik>
    )
}