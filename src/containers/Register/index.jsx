import { Container, Form, LeftContainer, RightContainer, Title, InputContainer, Link } from "./styles"
import { Button } from "../../components/Button"


import Logo from '../../assets/logo.svg'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

import { api } from "../../services/api"

import { toast } from "react-toastify"

import { useNavigate } from "react-router-dom"



export function Register() {

    const navigate = useNavigate()
    const schema = yup
        .object({
            name: yup.string().required('O nome é obrigatorio'),
            email: yup.string().email('Digite um e-mail valido').required('O e-mail é obrigatorio'),
            phone: yup.string().required("Digite um telefone de contato"),
            password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
            confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirme sua senha')


        }).required()


    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {

        try {
            const { status } = await toast.promise(api.post('/users', {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            }, {
                validateStatus: () => true
            }), {
                pending: 'Criando conta',
                success: {
                    render() {

                        setTimeout(() => {
                            navigate('/login')

                        }, 2000);
                        return 'Cadastro realizado com sucesso'

                    }
                },
                error: 'Usuario ou senha incorretos'
            }
            )


            if (status == 200 || status == 201) {
                return
            }
            else if (status === 409) {
                toast.error('Email já cadastrado! faça o login para continuar')
            }
            else {
                throw new Error()
            }

        }
        catch (err) {
            toast.error("Falha no sistema")

            console.log(err)

        }

    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo devburger" />
            </LeftContainer>

            <RightContainer>
                <Title>Criar conta</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label >Nome</label>
                        <input type="text"  {...register('name')} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label >Email</label>
                        <input type="email"  {...register('email')} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>


                    <InputContainer>
                        <label >Telefone de contato</label>
                        <input type="phone"  {...register('phone')} />
                        <p>{errors?.phone?.message}</p>
                    </InputContainer>

                    <InputContainer >
                        <label >Senha</label>
                        <input type="password"  {...register('password')} />
                        <p>{
                            errors?.password?.message
                        }</p>
                    </InputContainer>

                    <InputContainer>
                        <label >Confirmar Senha</label>
                        <input type="password"  {...register('confirmPassword')} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>


                    <Button type="submit">Criar conta</Button>
                </Form>
                <p>Já possui conta? <Link to='/login'>clique aqui</Link></p>
            </RightContainer>
        </Container>
    )
}