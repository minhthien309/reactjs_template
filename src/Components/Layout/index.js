import React from 'react';
import { Layout, Menu } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	DesktopOutlined
} from '@ant-design/icons';

import {
	Route,
	BrowserRouter as Router,
	withRouter,
	Link,
	Redirect,
	Switch
} from "react-router-dom";
import Login from '../Login';

const { Header, Sider, Content } = Layout;

import PrivateRoute from './Components/PrivateRoute';

class LayoutComponent extends React.Component {
	state = {
		collapsed: false,
		isLogin: false
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render(){
		let lastUrl = "";
		if(this.props.location){
			lastUrl = this.props.location.pathname + this.props.location.search;
		}
		return (
			<Router>
				<Switch>
					<Route path="/login"><Login/></Route>
					<Layout>
						<Sider 
							trigger={null} 
							collapsible 
							collapsed={this.state.collapsed}
							breakpoint="lg"
							onBreakpoint={(bp) => {
								if(bp){
									this.setState({
										collapsed: true
									})
								}              
							}}
						>
							<div className="logo" />
							<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
								<Menu.Item key="1" icon={<UserOutlined />}>									
									<Link to="/operating">
										nav 1
									</Link>
								</Menu.Item>
								<Menu.Item key="2" icon={<VideoCameraOutlined />}>									
									<Link to="/operating1">
										nav 2
									</Link>
								</Menu.Item>
								<Menu.Item key="3" icon={<DesktopOutlined />}>									
									<Link to="/operating2">
										nav 3
									</Link>
								</Menu.Item>
							</Menu>
						</Sider>
						<Layout className="site-layout">
							<Header className="site-layout-background" style={{ padding: 0 }}>
								{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
									className: 'trigger',
									onClick: this.toggle,
								})}
							</Header>
							<Content
								className="site-layout-background"
								style={{
									margin: '24px 16px',
									padding: 24,
									minHeight: 280,
								}}
							>
								<PrivateRoute path="/operating"  component={Operating}/>
								<PrivateRoute path="/operating1" roles={['user']} component={Operating1}/>
								<PrivateRoute path="/operating2" roles={['admin']} component={Operating2}/>
								<Route path="*">
									<Redirect from='/' to={lastUrl}/>
								</Route>
							</Content>
						</Layout>
					</Layout>
				</Switch>
			</Router>
		);
	}
}

export default withRouter(LayoutComponent);
