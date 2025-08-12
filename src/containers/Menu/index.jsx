import { useEffect, useState } from "react";
import { Banner, CategoriesMenu, CategoryButton, Container, ProductsContaianer } from "./styles";
import { api } from "../../services/api";

import { formatPrice } from '../../utils/formatPrice';
import { CardProduct } from "../../components/CardProduct";

import { useNavigate, useLocation } from "react-router-dom";

export function MenuPage() {

    const navigate = useNavigate();
    const {search} = useLocation()

    const queryParams = new URLSearchParams(search);

    
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(()=>{
        const categoryId = +queryParams.get('categoria')

        if ( categoryId){
            return categoryId
        }
        return 0
    })


    
    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');
            const newCategories = [{ id: 0, name: 'Todas' }, ...data];
            setCategories(newCategories);
        }

        async function loadProducts() {
            const { data } = await api.get('/products');
            const newProducts = data.map(product => ({
                currencyValue: formatPrice(product.price), ...product,
            }));
            setProducts(newProducts);
        }

        loadCategories();
        loadProducts();
    }, []);

    
    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredProducts(products);
        } else {
            const newFilteredProducts = products.filter(product => product.category_id === activeCategory);
            setFilteredProducts(newFilteredProducts);
        }
    }, [products, activeCategory]);



    return (
        <Container>
            <Banner>
                <h1>O MELHOR <br /> HAMBURGER <br /> ESTÁ AQUI <span>Este cardápio está irresistivel!</span> </h1>
            </Banner>

            <CategoriesMenu>

                <CategoryButton onClick={()=>{
                    navigate('/')
                }}>voltar</CategoryButton>
                {
                    categories.map((category) => (
                        <CategoryButton
                        
                            $isActiveCategory={category.id === activeCategory}

                            key={category.id}
                            onClick={() => {
                                setActiveCategory(category.id); 
                                navigate({
                                    pathname: '/cardapio',
                                    search: `?categoria=${category.id}`
                                }, {
                                    replace: true
                                });
                            }}
                        >
                            {category.name}
                        </CategoryButton>
                    ))
                }
            </CategoriesMenu>

            <ProductsContaianer>
                {
                    filteredProducts.map(product => ( // Renderiza produtos filtrados
                        <CardProduct product={product} key={product.id} />
                    ))
                }
            </ProductsContaianer>
        </Container>
    );
}