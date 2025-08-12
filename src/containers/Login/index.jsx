import { Container, Form, LeftContainer, RightContainer, Title, InputContainer, Link } from "./styles"


import { Button } from "../../components/Button"

import Logo from '../../assets/logo.svg'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

import { api } from "../../services/api"

import { toast } from "react-toastify"

import { useNavigate } from "react-router-dom"

import { useUser } from "../../hooks/UserContext"

export function Login() {

    const navigate = useNavigate()

    const { putUserData } = useUser()

    const schema = yup
        .object({
            email: yup.string().email('Digite um e-mail valido').required('O e-mail é obrigatorio'),
            password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
        }).required()


    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {

        const { data: userData } = await toast.promise(api.post('/session', {
            email: data.email,
            password: data.password
        }),
            {
                pending: 'Carregando informações',
                success: {
                    render() {

                        setTimeout(() => {
                            if(userData?.admin){
                                navigate('/admin/pedidos')
                            }
                            else{
                                navigate('/')
                            }
                            
                             
                        }, 2000);
                        return 'Seja bem vindo '

                    }
                },
                error: 'Usuario ou senha incorretos'
            }
        )

        putUserData(userData)

        /* localStorage.setItem('@devburger', token ) */
    }


    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo devburger" />
            </LeftContainer>

            <RightContainer>
                <Title>Ola seja bem vindo ao <span>Dev Burger!</span>

                    <br />
                    Acesse com seu <span> Login e senha.</span></Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label >Email</label>
                        <input type="email"  {...register('email')} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer >
                        <label >Senha</label>
                        <input type="password"  {...register('password')} />
                        <p>{
                            errors?.password?.message
                        }</p>
                    </InputContainer>


                    <Button type="submit">Entrar</Button>
                </Form>
                <p>Não possui conta? <Link to='/cadastro'>clique aqui</Link></p>
            </RightContainer>
        </Container>
    )
}