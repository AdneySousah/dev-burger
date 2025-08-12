import { Container, Title, InfoPedidos, InfoPedidosImage, ContainerStatus,ContainerInfoDados } from "./styles";
import { api } from "../../services/api"
import { useEffect, useState } from "react";

import {formatPrice} from '../../utils/formatPrice'
export function StatusPedido() {

    const [orders, setOrders] = useState([])
    useEffect(() => {


        async function getUserStorage() {
            const userStorage = JSON.parse(localStorage.getItem("devburger:UserData"))
            const { data } = await api.get("/orders")



            if (userStorage.id === data[0].user.id) {

                console.log(data[0])
                setOrders(data)


            }
        }

        getUserStorage()

    }, [])

    return (

        <Container>


            {
                orders?.map((order) => (

                    <>
                        <ContainerStatus $isFinaly={order?.status ==="Pedido finalizado"}>
                            <Title>Detalhes do pedido</Title>
                            <div >
                                <InfoPedidos>Cliente: {order?.user?.name} </InfoPedidos>
                                <InfoPedidos>Status: {order?.status} </InfoPedidos>
                            </div>

                            
                                {
                                order?.products.map((product)=>(

                                    <>
                                    <ContainerInfoDados>

                                        <InfoPedidos>Produto: {product.name} </InfoPedidos>
                                        <InfoPedidos>Quantidade: {product.quantity} </InfoPedidos>
                                        <InfoPedidos>Preço: {formatPrice(product.price)} </InfoPedidos>
                                        <InfoPedidosImage src={product.url} />
                                        <InfoPedidos>Subtotal: {formatPrice(product.price * product.quantity)} </InfoPedidos>
                                    </ContainerInfoDados>
                                    <hr />
                                    </>
                                ))
                                }

                                <span>Total do pedido: {formatPrice(order?.products.reduce((acc,product) => acc + (product.price * product.quantity),0))} </span>
                            

                          
                        </ContainerStatus>
                    </>
                ))
            }



        </Container>

    )
}