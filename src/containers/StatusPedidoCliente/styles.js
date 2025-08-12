import styled from "styled-components";




export const Container = styled.div`

    display: flex;
    justify-content: center;

`

export const Title = styled.h2`
    text-align: center;

`


export const ContainerStatus = styled.div`

    display: flex;
    flex-direction: column;
    border: 1px solid #000;
    border-radius: 5px;
    box-shadow: 0 0 10px #000;
    margin: 20px;
    padding: 20px;
    background-color: ${(props) => props.$isFinaly ? '#333':'#eee' };

    span{
        margin-top: 20px;
        text-align: end;
        margin-right: 20px;
        font-weight: 600;
    }

div{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}


`

export const ContainerInfoDados = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
`

export const InfoPedidos = styled.p`
margin: 10px 20px;

`
 

export const InfoPedidosImage = styled.img`
height: 60px;


`

