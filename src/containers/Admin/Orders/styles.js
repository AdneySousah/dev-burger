import styled from "styled-components";
import Select from "react-select";



export const Container = styled.table`
    

@media (max-width:758px){
    display: none;
}
`


export const ProductImage = styled.img`
    height: 80px;
    padding: 12px;
    border-radius: 16px;

`

export const SelectStatus = styled(Select)`
    width: 240px;
`

export const Filter = styled.div`
  display: flex;
  justify-content: flex-start; // Alterado de center para flex-start
  margin: 28px 0;
  gap: 50px;
  overflow-x: auto;
  width: 100%;
  padding: 10px 20px;
  -webkit-overflow-scrolling: touch; // Suave rolagem em dispositivos móveis
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #9758a6;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #7d4690;
  }
`

export const FilterOption = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${(props) => props.$isActiveStatus ? '#9758a6' : '#333'};
  border-bottom: ${(props) => props.$isActiveStatus ? '1px solid #9758a6' : 'none'};
  font-size: 18px;
  line-height: 18px;
  padding-bottom: 5px;
  white-space: nowrap; // Impede que o texto quebre em várias linhas
  flex-shrink: 0; // Impede que os itens encolham
`



export const ContainerResponsivo = styled.div`
display: none;

@media(max-width: 758px) {

    display: flex;
    flex-direction: column;
}
`



export const ContainerInformacoes = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid #000;
padding: 10px;
margin: 5px 10px;
height: 200px;
border-radius: 5px;
box-shadow: 0 0 5px #000;

    div{
        button{
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #9758a6;
        color: #fff;
        font-weight: 600;
        transition: 0.5s ease;
        margin: 20px;
    }
    button:hover{
        transform: scale(1.1);
    }

}


`

export const ContainerDados = styled.div`
display: flex;

padding: 10px;
margin: 10px;
height: 150px;
border-radius: 5px;

`

export const TextPedidos = styled.p`
padding: 10px;
font-size: 15px;

`
