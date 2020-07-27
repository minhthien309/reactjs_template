import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { connect } from 'react-redux';

import Layout from './Components/Layout';
import Login from './Components/Login';

import {
	Route,
	Redirect,
	BrowserRouter as Router,
	Switch
} from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_APP_URL;
axios.defaults.crossDomain = true;

axios.interceptors.request.use((request) => {
	return request;
}, (error) => {
	console.log(error);
	return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
	// Edit response config
	// eslint-disable-next-line
	if(response.data.status_code == "-1" || response.data.status_code == "-2" || response.data.status_code == "-3"){
		axios.defaults.headers.common['Authorization'] = '';	
	}
	return response;
}, (error) => {
	console.log(error);
	return Promise.reject(error);
});

function PrivateRoute ({ children, ...rest }){
	return (
		<Route
			{...rest}
				render={({ location }) =>
				localStorage.getItem("token") ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

class App extends Component {
	constructor(props){
		super(props);
	
		this.state ={
		  	isLogin: false
		};
	}

	render(){
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<PrivateRoute path="/operating">
							<Layout/>
						</PrivateRoute>
						<Route exact path="/">
							<Redirect exact from="/" to="operating" />
						</Route>
						<Route path="*">
							<Redirect from="/" to="operating" />
						</Route>
					</Switch>          
				</Router>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		user: state.user
	}
}

let AppScreen = connect(mapStateToProps)(App);
export default AppScreen;
