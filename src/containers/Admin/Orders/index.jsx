import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Row } from './row'
import { useEffect, useState } from 'react';

import { api } from '../../../services/api'


import { Filter, FilterOption, Container, ContainerResponsivo, ContainerInformacoes, TextPedidos, ContainerDados, SelectStatus } from './styles';
import { orderStatusOptions } from './orderStatus';
import { formatDate } from '../../../utils/formatDate';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: '80vh',
};


export function Orders() {
    const [orders, setOrders] = useState([])
    const [rows, setRows] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [activeStatus, setActiveStatus] = useState(0)


    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loadingStatusChange, setLoadingStatusChange] = useState(false);

    useEffect(() => {

        async function loadOrders() {
            const { data } = await api.get('/orders');
            setOrders(data)
            setFilteredOrders(data)

        }
        loadOrders()
    }, [])



    useEffect(() => {
        const newRows = filteredOrders.map((order) => createData(order))
        setRows(newRows)
       

    }, [filteredOrders])



    function handleOpenModal(order) {
        setSelectedOrder(order);
        setModalOpen(true);
    }

    function handleCloseModal() {
        setModalOpen(false);
        setSelectedOrder(null);
    }

    async function handleUpdateStatus(id, status, name, phone) {
        setLoadingStatusChange(true);
        try {
            await api.put(`/orders/${id}`, { status });

            const updatedOrders = orders.map(order =>
                order._id === id ? { ...order, status } : order
            );

            setOrders(updatedOrders);
            setFilteredOrders(updatedOrders);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingStatusChange(false);
            handleCloseModal()
            EnviteWhatsApp(name,phone)
        }
    }


    /* trocar função */
    async function EnviteWhatsApp(name, phone){
        const message = `Olá, ${name} status do seu pedido ${selectedOrder.orderId} está ${selectedOrder.status}.`;
        const url = `https://api.whatsapp.com/send?phone=55${phone}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function createData(order) {
        return {
            name: order.user.name,
            orderId: order._id,
            date: order.createdAt,
            status: order.status,
            products: order.products,
             phone: order.user.phone

        };
    }


    async function handleStatus(status) {
        if (status.id === 0) {
            setFilteredOrders(orders)
        }
        else {
            const newOrders = orders.filter(order => order.status === status.value)

            setFilteredOrders(newOrders)
        }
        setActiveStatus(status.id)
    }

    useEffect(() => {
        if (activeStatus === 0) {
            setFilteredOrders(orders)
        }
        else {
            const statusIndex = orderStatusOptions.findIndex(
                item => item.id === activeStatus
            );

            const newFilteredOrders = orders.filter(order => order.status === orderStatusOptions[statusIndex].value)

            setFilteredOrders(newFilteredOrders)
        }
    }, [orders])

    return (
        <>

            <Filter>
                {orderStatusOptions.map(status => (

                    <FilterOption key={status.id}
                        onClick={() => handleStatus(status)}
                        $isActiveStatus={activeStatus === status.id}
                    >
                        {status.label}
                        {status.length}
                    </FilterOption>
                ))}

            </Filter>

            <Container>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />

                                <TableCell>Pedido</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Data do pedido</TableCell>
                                <TableCell>Status</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.orderId} row={row} orders={orders} setOrders={setOrders} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <ContainerResponsivo>
                {rows.map((row) => (
                    <ContainerInformacoes key={row.orderId}>
                        <ContainerDados>
                            <TextPedidos>Cliente: {row.name}</TextPedidos>
                            <TextPedidos>Status: {row.status}</TextPedidos>
                            
                            
                        </ContainerDados>
                        <div>
                            <button onClick={() => handleOpenModal(row)}>Detalhes</button>
                        </div>
                    </ContainerInformacoes>
                ))}

                {selectedOrder && (
                    <Modal
                        open={modalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                                Detalhes do Pedido - {selectedOrder.orderId}
                            </Typography>
                            <Typography>Cliente: {selectedOrder.name}</Typography>
                            <Typography>Cliente: {selectedOrder.phone}</Typography>
                            <Typography>Data: {formatDate(selectedOrder.date)}</Typography>

                            <Typography sx={{ mt: 2 }}>Status:</Typography>
                            <SelectStatus
                                placeholder="Status"
                                options={orderStatusOptions.filter(status => status.id !== 0)}
                                defaultValue={orderStatusOptions.find(status => status.value === selectedOrder.status)}
                                onChange={status => handleUpdateStatus(selectedOrder.orderId, status.value, selectedOrder.name, selectedOrder.phone)}
                                isLoading={loadingStatusChange}
                                menuPortalTarget={document.body}
                                styles={{
                                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                                }}
                            />

                            <Typography sx={{ mt: 3, fontWeight: 'bold' }}>Produtos:</Typography>
                            {selectedOrder.products.map((product) => (
                                <Box key={product.id} sx={{ my: 1, borderBottom: '1px solid #ccc', pb: 1 }}>
                                    <Typography>Nome: {product.name}</Typography>
                                    <Typography>Categoria: {product.category}</Typography>
                                    <img src={product.url} alt={product.name} width={80} style={{ borderRadius: 8, marginTop: 5 }} />
                                </Box>
                            ))}

                            <Box mt={3} display="flex" justifyContent="flex-end">
                                <button
                                    onClick={handleCloseModal}
                                    style={{
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        backgroundColor: '#9758a6',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Fechar
                                </button>
                            </Box>
                        </Box>
                    </Modal>
                )}
            </ContainerResponsivo>
        </>
    );
}
