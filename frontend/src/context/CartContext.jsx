import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = useState(initialCart);
    
    const getCartCount = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };
    
    const [cartCount, setCartCount] = useState(getCartCount());

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartCount(getCartCount());
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + 1
                };
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item._id === productId);
            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                if (updatedCart[existingProductIndex].quantity > 1) {
                    updatedCart[existingProductIndex] = {
                        ...updatedCart[existingProductIndex],
                        quantity: updatedCart[existingProductIndex].quantity - 1
                    };
                    return updatedCart;
                } else {
                    return prevCart.filter(item => item._id !== productId);
                }
            }
            return prevCart;
        });
    };

    const deleteFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item => 
                item._id === productId ? { ...item, quantity } : item
            );
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart, updateQuantity, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
