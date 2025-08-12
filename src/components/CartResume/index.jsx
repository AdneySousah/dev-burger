import { Container } from "./styles";
import { Button } from '../Button'

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCart } from '../../hooks/CartContext'
import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'

import { useNavigate } from "react-router-dom";

export function CartResume() {

    const navigate = useNavigate()

    const [finalPrice, setFinalPrice] = useState(0)
    const [deliverTax] = useState(500)


    const { cartProducts } = useCart()

    useEffect(() => {

        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc
        }, 0);
        setFinalPrice(sumAllItems)
    }, [cartProducts])

    const submitOrder = async () => {
        const products = cartProducts.map((product) => {
            return { id: product.id, quantity: product.quantity, price: product.price }
        });



            try{
                const {data} = await api.post('/create-payment-intent',{
                    products
                })
                
                navigate('/checkout',{
                    state:data
                })    
            }   

            catch(err){
                console.log('erro',err)
            }
    
        }

    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do pedido</h2>
                    <p className="items">Items</p>
                    <p className="items-price">{formatPrice(finalPrice)}</p>
                    <p className="delivery-tax">Taxa de entrega</p>
                    <p className="delivery-tax-price">{formatPrice(deliverTax)}</p>
                </div>

                <div className="container-bottom">
                    <p>Total</p>
                    <p>R$ {formatPrice(finalPrice + deliverTax)}</p>
                </div>

            </Container>

            {
                finalPrice <= 0 ? <Button onClick={submitOrder} disabled={true} >Carrinho vazio</Button>:
                 <Button onClick={submitOrder} >Ir para pagamento</Button>
            }
           
        </div>
    )
}