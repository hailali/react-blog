import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./Home";
import UserList from "./UserList";
import PostList from "./PostList";
import Login from "./Login";
import TagList from "./TagList";
import UserAdd from "./UserAdd";
import NavBar from "./Bootstrap";
import {PostAdd} from "./PostAdd";
import {isUserAuthenticated} from "./UserUtils";
import {PostView} from "./front/PostView";

function PrivateRoute({children, exact, path}: {children: any, exact?: any, path: any}) {
    return (
        <Route
            exact={exact} path={path}
            render={({location}) =>
                isUserAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}


export function AppRouter() {
    return (
        <Router>
            <div>
                <NavBar/>
                <hr/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/users/add">
                        <UserAdd/>
                    </Route>
                    <PrivateRoute exact path="/posts/add">
                        <PostAdd/>
                    </PrivateRoute>
                    <Route exact path="/posts/:postId" component={PostView}/>
                    <PrivateRoute path="/users">
                        <UserList/>
                    </PrivateRoute>
                    <PrivateRoute path="/posts">
                        <PostList/>
                    </PrivateRoute>
                    <PrivateRoute path="/tags">
                        <TagList/>
                    </PrivateRoute>
                    <Route path="/login">
                        <Login/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}