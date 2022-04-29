import {createStore} from "redux";
import axios from 'axios';
import Cookies from 'js-cookie';

const initState = {
    shoppingCart: [],
    personalInfo: {},
    paymentInfo: {},
    isAuthenticated: Cookies.get('token') != null,
    userDetails: JSON.parse(localStorage.getItem('user')),
    alerts: [],
    alertId: 0
};

axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + (Cookies.get('token') || '')
};

const reducer = (state = initState, action) => {

    if (action.type === 'showAlert')
        return {...state, alerts: [...state.alerts, {...action.payload, id: state.alertId}], alertId: state.alertId + 1}


    if (action.type === 'closeAlert')
        return {...state, alerts: state.alerts.filter(a => a.id !== action.payload)}


    if (action.type === 'addProduct') {
        const found = state.shoppingCart.find(c => c.product.id === action.cartItem.product.id);
        console.log(state.shoppingCart);
        if (found) {
            found.quantity += action.cartItem.quantity;
            return {
                ...state,
                shoppingCart: [...state.shoppingCart]
            };
        } else {
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, {...action.cartItem, quantity: +action.cartItem.quantity}]
            };
        }
    }


    if (action.type === 'removeProduct') {
        return {
            ...state,
            shoppingCart: state.shoppingCart.filter(cartItem => cartItem.product.id !== action.cartItem.product.id)
        };
    }

    if (action.type === 'savePaymentInfo') {
        return {
            ...state,
            paymentInfo: action.paymentInfo
        };
    }

    if (action.type === 'resetShoppingCart') {
        return {
            ...state,
            shoppingCart: []
        };
    }

    if (action.type === 'savePersonalInfo') {
        return {
            ...state,
            personalInfo: action.personalInfo
        };
    }

    if (action.type === 'reduceQuantity') {
        const found = state.shoppingCart.find(c => c.product.id === action.cartItem.product.id);
        if (found) {
            found.quantity -= action.cartItem.quantity;
            if (found.quantity > 0) {
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart]
                };
            }

        }

        return {
            ...state,
            shoppingCart: state.shoppingCart.filter(cartItem => cartItem.product.id !== action.cartItem.product.id)
        };
    }

    if (action.type === 'loginSuccess') {
        Cookies.set('token', action.payload.jwt);

        axios.defaults.headers.common = {
            'Authorization': 'Bearer ' + action.payload.jwt
        };

        localStorage.setItem('user', JSON.stringify(action.payload.userDetails));
        return {...state, isAuthenticated: true, userDetails: action.payload.userDetails};
    }

    if (action.type === 'logout') {
        Cookies.remove('token');
        axios.defaults.headers.common = {
            'Authorization': ''
        };
        localStorage.removeItem('user');
        return {...state, isAuthenticated: false, userDetails: null}
    }


    return state;
}

const store = createStore(reducer);

export default store;