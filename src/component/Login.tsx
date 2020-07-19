import React from 'react';
import '../App.css';
import 'popper.js'
import 'jquery'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from "react-router-dom";
import {Card} from "./Bootstrap";
import LoginClient from "../client/LoginClient";
import {USER_LOGIN_ACTION} from "../redux/actions";
import {connect} from "react-redux";

interface LoginStateInterface {
    username: string,
    password: string,
    authenticated: boolean,
    authenticationError: boolean
}

class Login extends React.Component<any, LoginStateInterface> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: "",
            authenticated: false,
            authenticationError: false
        }
    }

    handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({username: e.target.value})
    }

    handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({password: e.target.value})
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        LoginClient.login(JSON.stringify(this.state)).then(isAuthenticated => {
            if (isAuthenticated) {
                this.setState({
                    authenticated: true
                })

                this.props.onLogin();
            } else {
                sessionStorage.clear();
                this.setState({
                    authenticationError: true
                })
            }
        });
    }

    render() {
        const {username, password, authenticated, authenticationError} = this.state

        return (
            <div className="App">
                <Card title="Login">
                    {authenticationError ? <div className="alert alert-dark" role="alert">
                        Invalid username or password
                    </div> : ''}
                    <div className="container">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" value={username} className="form-control"
                                       id="username" placeholder="Enter email"
                                       onChange={(e) => this.handleChangeUsername(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" value={password} className="form-control"
                                       id="password" placeholder="Password"
                                       onChange={(e) => this.handleChangePassword(e)}/>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    {authenticated ? <Redirect to='/'/> : ''}
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isUserAuthenticated: state.isUserAuthenticated
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogin: () => dispatch(USER_LOGIN_ACTION),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
