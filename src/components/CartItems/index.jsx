import { useCart } from '../../hooks/CartContext'
import { formatPrice } from '../../utils/formatPrice'
import { Table } from '../index'
import { ButtonGroup, ProductImage, TotalPrice, TrashImage, CardContainer, CardItem ,Container} from './styles'
import TrashIcon from '../../assets/trash.svg'

export function CartItems() {
    const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } = useCart()

    const isEmpty = !cartProducts?.length

    return (
        <>
            {/* Layout para desktop */}
            <Container >
                <Table.Root>
                    <Table.Header>
                        <Table.Tr>
                            <Table.Th></Table.Th>
                            <Table.Th>Items</Table.Th>
                            <Table.Th>Preço</Table.Th>
                            <Table.Th>Quantidade</Table.Th>
                            <Table.Th>Total</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Header>

                    <Table.Body>
                        {isEmpty ? (
                            <Table.Tr>
                                <Table.Td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                                    <strong>Carrinho vazio</strong>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            cartProducts.map(product => (
                                <Table.Tr key={product.id}>
                                    <Table.Td>
                                        <ProductImage src={product.url} alt="imagem do produto" />
                                    </Table.Td>
                                    <Table.Td>{product.name}</Table.Td>
                                    <Table.Td>{product.currencyValue}</Table.Td>
                                    <Table.Td>
                                        <ButtonGroup>
                                            <button onClick={() => decreaseProduct(product.id)}>-</button>
                                            {product.quantity}
                                            <button onClick={() => increaseProduct(product.id)}>+</button>
                                        </ButtonGroup>
                                    </Table.Td>
                                    <Table.Td>
                                        <TotalPrice>{formatPrice(product.quantity * product.price)}</TotalPrice>
                                    </Table.Td>
                                    <Table.Td>
                                        <TrashImage src={TrashIcon} alt='Lixeira' onClick={() => deleteProduct(product.id)} />
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Body>
                </Table.Root>
            </Container>

            {/* Layout para mobile */}
            <CardContainer className="card-layout">
                {isEmpty ? (
                    <strong style={{ textAlign: 'center', width: '100%' }}>Carrinho vazio</strong>
                ) : (
                    cartProducts.map(product => (
                        <CardItem key={product.id}>
                            <div className="image-name">
                                <ProductImage src={product.url} alt="imagem do produto" />
                                <p>{product.name}</p>
                            </div>

                            <p><strong>Preço:</strong> {product.currencyValue}</p>
                            <p><strong>Quantidade:</strong></p>
                            <ButtonGroup>
                                <button onClick={() => decreaseProduct(product.id)}>-</button>
                                {product.quantity}
                                <button onClick={() => increaseProduct(product.id)}>+</button>
                            </ButtonGroup>
                            <p><strong>Total:</strong> {formatPrice(product.quantity * product.price)}</p>

                            <TrashImage src={TrashIcon} alt='Lixeira' onClick={() => deleteProduct(product.id)} />
                        </CardItem>
                    ))
                )}
            </CardContainer>
        </>
    )
}
