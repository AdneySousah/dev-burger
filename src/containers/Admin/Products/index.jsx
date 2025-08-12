import { useEffect, useState } from "react"
import { api } from '../../../services/api'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, EditButton, ProductImage } from "./styles";
import { CheckCircle, CheckCircleIcon, Pencil, XCircle } from "@phosphor-icons/react";
import { formatPrice } from "../../../utils/formatPrice";

import { useNavigate } from "react-router-dom";



export function Products() {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function loadCategories() {

            const { data } = await api.get('/products')


            setProducts(data)
          

        }

        loadCategories()
    }, [])


    function isOffer(offer) {
        if (offer) {
            return <CheckCircle color="#61a120" size={25}/>
        }
        else {
            return <XCircle color="#ff3205" size={25} />
        }
    }

    function editProduct(product){
        navigate('/admin/editar-produto', {state:{product}})

    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Produto em oferta</TableCell>
                            <TableCell align="center">Imagem</TableCell>
                            <TableCell align="center">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{formatPrice(row.price)}</TableCell>
                                <TableCell align="center">{isOffer(row.offer)}</TableCell>

                                <TableCell align="center">
                                    <ProductImage src={row.url} />
                                </TableCell>

                                <TableCell align="center">
                                    <EditButton onClick={()=>editProduct(row)}>
                                        <Pencil />
                                    </EditButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}