import styled from "styled-components";


export const Container = styled.div`
       @media (max-width: 768px) {
       display: none;
    }

`
// Imagem do produto
export const ProductImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 16px;
`

// Botões de + e -
export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
        color: #fff;
        border-radius: 4px;
        background-color: #9758a6;
        border: none;
        transition: 0.3s;

        &:hover {
            background-color: #6f357c;
        }
    }

    @media (max-width: 768px) {
        gap: 8px;
        button {
            height: 26px;
            width: 26px;
            font-size: 14px;
        }
    }
`

// Total formatado
export const TotalPrice = styled.p`
    font-weight: bold;
`

// Ícone da lixeira
export const TrashImage = styled.img`
    height: 20px;
    width: 20px;
    cursor: pointer;
    margin-top: 8px;
`

// Layout de cards (mobile)
export const CardContainer = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 20px;
    }
`

export const CardItem = styled.div`
    background-color: #fff;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 0 4px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;

    .image-name {
        display: flex;
        align-items: center;
        gap: 12px;
        p {
            font-weight: bold;
        }
    }
`
