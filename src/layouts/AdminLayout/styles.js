import styled from "styled-components";



export const Container = styled.div`
  height: 100vh; 


  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
  }

  section {
    margin: 0 auto;
    padding: 40px 20px;
    max-width: 1200px;
    width: 100%;
  }

  @media (max-width: 768px){

  }


`;


export const ContainerAdmin = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 280px) 1fr;

  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    height: 50px;
  }
`