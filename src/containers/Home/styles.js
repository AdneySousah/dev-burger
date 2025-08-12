import styled from "styled-components";
import bannerHome from '../../assets/banner-home.svg'
import background from '../../assets/background.svg'



export const Banner = styled.div `
    background: url('${bannerHome}');
    background-size: cover;
    background-position: center;
    height: 400px;
  

    h1{
        font-family: 'Road Rage', sans-serif;
        font-size: 80px;
        color: #f4f4f4;
        position: absolute;
        right: 20%;
        top: 10%;
          margin-left: 20px;

    }

`

export const Container = styled.section `
    background: linear-gradient(rgba(255,255,255,0.5)),rgba(255,255,255,0.5) url('${background}');
    height: 100%;
    
`

export const Content = styled.div `
    padding-bottom: 20px;
`