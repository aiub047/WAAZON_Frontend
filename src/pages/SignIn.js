import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import "./SignIn.css"
import apiService from '../services/apiService';

export const SignIn = (props) => {
    const dispatch = useDispatch();
    const formData = useRef();

    const loginHandler = (event) => {
        event.preventDefault();
        const form = formData.current
        const user = {username: form['username'].value, password: form['password'].value};

        apiService.post('auth/login', user, {successMessage: false})
            .then(response => {
                dispatch({type: 'loginSuccess', payload: response});
                if (response.userDetails.roles === "BUYER")
                    props.history.push("/shop");
                else
                    props.history.push("/products");

            })
            .catch(err => console.log(err.message));
    }

    return (
        <form className="form-signIn" ref={formData} onSubmit={loginHandler}>
            <h4 className="h4 mb-3 font-weight-normal">Sign-in</h4>
            <label htmlFor="txtUserName" className="sr-only">Username</label>
            <input type="text" id="txtUserName" style={{margin: '0 0 5px 0'}} className="form-control"
                   placeholder="Username" name="username" autoFocus required/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password"
                   required/>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
}