import axios from "axios";
import { createContext } from "react";
import { BaseUrl } from "../utils/BaseUrl.js";
import { toast } from 'react-toastify';
import { useState } from "react";



export let CartContext = createContext()

export default function CartContextProvider({ children }) {


    const [cartData, setCartData] = useState(null)
    const [cartProduct, setCartProduct] = useState(null)
    const [cartItems, setCartItems] = useState(0)
    const [wishListProduct, setWishListProduct] = useState(null)
    const [wishListNumber, setWishListNumber] = useState(0)
    const [cartId, setCartId] = useState(null)



    const notify = (msg, type) => {
        toast[type](msg)
    };

    function getWishListItems() {
        axios.get(`${BaseUrl}/wishlist`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then((data) => {
            setWishListProduct(data.data.data)
    
            setWishListNumber(data.data.count)

        }).catch((err) => {
            notify("error!", 'error')
            console.log(err);
        })
    }
    function addToWishList(id) {
        axios.post(`${BaseUrl}/wishlist`, {
            'productId': id
        }, {
            headers: { 'token': localStorage.getItem('token') }
        }).then((data) => {
            notify(data.data.message, "success")

        }).catch((err) => {
            notify(err.response.data.message, "error")

        })
    }
    function deleteFromWishList(id) {
        axios.delete(`${BaseUrl}/wishlist/${id}`, {
            headers: { "token": localStorage.getItem("token") }
        }).then((data) => {
            notify(data.data.message, "success")

            getWishListItems()



        }).catch((err) => {

            getWishListItems()

        })
    }




    function deleteCart() {
        axios.delete(`${BaseUrl}/cart`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then((data) => {
            console.log(data.data);
        }).catch((err) => {
        })
    }

    function getCartItems() {
        axios.get(`${BaseUrl}/cart`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then((data) => {
            setCartData(data.data)
            setCartProduct(data.data.data.products)
            setCartItems(data.data.numOfCartItems)
            setCartId(data.data.data._id);
            localStorage.setItem("cartId", data.data.data._id)


        }).catch((err) => {
            notify(err.response.data, 'error')

        })
    }

    function addToCart(id) {

        axios.post(`${BaseUrl}/cart`, {
            "productId": id
        }, {
            headers: { "token": localStorage.getItem("token") }
        }).then((data) => {
            notify(data.data.message, "success")
            setCartItems(data.data.numOfCartItems)

            getCartItems()

        }).catch((err) => {
            notify(err.response.data.message, "error")
        })
    }

    function deleteFromCart(id) {
        axios.delete(`${BaseUrl}/cart/${id}`, {
            headers: { "token": localStorage.getItem("token") }
        }).then((data) => {
            notify("Removed From Cart Successfully", "success")
            setCartItems(data.data.numOfCartItems)
            getCartItems()


        }).catch((err) => {

            notify(err.response.data.message, "error")


        })
    }

    return <CartContext.Provider value={{ addToCart, getCartItems, cartData, setCartData, cartProduct, deleteFromCart, cartItems, addToWishList, getWishListItems, wishListProduct, deleteFromWishList, cartId, setCartItems, deleteCart,wishListNumber }}>
        {children}
    </CartContext.Provider>
}