import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x._id === existItem._id ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x._id !== action.payload),
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [],
            };
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                paymentMethod: action.payload,
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const initialState = {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
    };

    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    const addToCart = (product, qty) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, qty },
        });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const saveShippingAddress = (data) => {
        dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: data });
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    };

    const savePaymentMethod = (data) => {
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: data });
    };

    return (
        <CartContext.Provider
            value={{
                cartItems: state.cartItems,
                shippingAddress: state.shippingAddress,
                paymentMethod: state.paymentMethod,
                addToCart,
                removeFromCart,
                clearCart,
                saveShippingAddress,
                savePaymentMethod,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
