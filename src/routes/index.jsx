

import { Route, Routes } from "react-router-dom";


import { Cart, HomePage, MenuPage, Register, Login, CompletePayment, Checkout, Orders, NovoProduto, EditProducts, Products, EstoqueProduct, StatusPedido } from "../containers";
import { UserLayout } from "../layouts/UserLayout";
import { AdminLayout } from "../layouts/AdminLayout";



export function RouterApp() {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/cardapio" element={<MenuPage />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/complete" element={<CompletePayment />} />
                <Route path="/status" element={<StatusPedido />} />


            </Route>


            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin/pedidos" element={<Orders />} />
                <Route path="/admin/novo-produto" element={<NovoProduto />} />
                <Route path="/admin/editar-produto" element={<EditProducts />} />
                <Route path="/admin/produtos" element={<Products />} />
                <Route path="/admin/estoque" element={<EstoqueProduct />} />
            </Route>


            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />

        </Routes>
    )
}