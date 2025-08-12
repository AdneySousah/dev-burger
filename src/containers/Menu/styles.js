import styled from "styled-components";
import BannerMenu from '../../assets/bannerMenu.svg'
import background from '../../assets/background.svg'


export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f0f0f0;
    background: linear-gradient(rgba(255,255,255,0.5)),rgba(255,255,255,0.5) url('${background}');
`


export const Banner = styled.div`
    background: url('${BannerMenu}') no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    height: 400px;
    background-color: #1f1f1f;
    background-size: cover;
    width: 100%;
    position: relative;
    
   h1{
    font-family: 'Road Rage', sans-serif;
    font-size: 80px;
    line-height: 65px;
    color: #fff;
    position: absolute;
    right: 20%;
    top:5%;
    text-align: center;
   }
   span{
    display: block;
    color: #fff;
    font-size: 20px;
    text-align: center;
    
   }
`


export const CategoriesMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;

   @media (max-width: 758px){
    padding: 20px;
    overflow: auto;
    overflow-clip-margin: 1px; 
 
   }
`

export const CategoryButton = styled.button`
    text-decoration: none;
    background: none;
    color: ${(props) => props.$isActiveCategory ? '#9758a6' : '#6a6a6bff'};
    font-weight: 500;
    font-size: 24px;
    padding-bottom: 5px;
    line-height: 20px;
    border: none;
    border-bottom: ${(props) => props.$isActiveCategory && '3px solid #9758a6'} ;
`

export const ProductsContaianer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 60px;
    padding: 60px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto;

       @media (max-width: 758px){
            
 
   }

`