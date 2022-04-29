import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Authentication
const initialAuthState = {isAuthenticated: false};

const authSlice = createSlice(
    {
        name: 'authentication',
        initialState: initialAuthState,
        reducers: {
            login(state, action) {
                const userCred = action.payload;
                axios.post('http://localhost:8089/authenticate', userCred)
                    .then(response => {
                        Cookies.set('token', response.data.jwt)

                        axios.defaults.headers.common = {
                            'Authorization': 'Bearer ' + response.data.jwt
                        };
                    })
                    .catch(err => console.log(err.message))

                if (Cookies.get('token') != null) {
                    state.isAuthenticated = true
                }


            },
            logout(state) {
                Cookies.remove('token')
                axios.defaults.headers.common = {
                    'Authorization': ''
                };
                state.isAuthenticated = false;
            },

        }

    }
);

export {authSlice};