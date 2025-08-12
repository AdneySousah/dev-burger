import { useContext, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext({});



export const CartProvider = ({ children }) => {

    const [cartProducts, setCardProducts] = useState([])
    


    const putProductInCart = (product) => {
        const cartIndex = cartProducts.findIndex((prd) => prd.id == product.id);

        

        let newProductsInCart = []
        if (cartIndex >= 0) {
            newProductsInCart = cartProducts

            newProductsInCart[cartIndex].quantity = newProductsInCart[cartIndex].quantity + 1
            setCardProducts(newProductsInCart)
            toast.success(`Produto inserido no carrinho`)

            console.log(cartProducts)
        }
        else {
            product.quantity = 1
            newProductsInCart = [...cartProducts, product]
            setCardProducts(newProductsInCart)
            toast.success(`Produto inserido no carrinho`)
             
        }

        updateLocalStorage(newProductsInCart)

    }


    const clearCart = () => {

        setCardProducts([])
        updateLocalStorage([])

    }

    const deleteProduct = (productId) => {

        const newCart = cartProducts.filter((prd) => prd.id != productId)

        setCardProducts(newCart)
        updateLocalStorage(newCart)
        toast.success(`Produto removido com sucesso`)

    }

    const increaseProduct = (productId) => {

        const newCart = cartProducts.map(prd => {
            return prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd

        })

        setCardProducts(newCart)
        updateLocalStorage(newCart)
    }



    const decreaseProduct = (productId) => {

        const cartIndex = cartProducts.findIndex((prd) => prd.id == productId);

        if (cartProducts[cartIndex].quantity > 1) {
            

            const newCart = cartProducts.map(prd => {
                return prd.id === productId ? { ...prd, quantity: prd.quantity - 1 } : prd

            })
            setCardProducts(newCart)
            updateLocalStorage(newCart)
        }
        else {
            deleteProduct(productId)
        }
    }


    
    const updateLocalStorage = (products) => {

        localStorage.setItem('devburger:CartInfo', JSON.stringify(products))
    }


    useEffect(()=>{
        const clientCartData = localStorage.getItem('devburger:CartInfo')

        if(clientCartData){
            setCardProducts(JSON.parse(clientCartData))
           
        }
    },[])
    return (

        <CartContext.Provider
            value={{
                cartProducts,
                putProductInCart,
                clearCart,
                deleteProduct,
                increaseProduct,
                decreaseProduct
            }
            }>
            {children}
        </CartContext.Provider>

    )
}


export const useCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used with a context')
    }
    return context
}