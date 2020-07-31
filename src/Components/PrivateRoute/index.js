export default function PrivateRoute ({ component: Component, roles, ...rest }) {
	return (
		<Route
			{...rest}
			render={props => {
				const currentUser = localStorage.getItem("token");
				if (!currentUser) {
					// not logged in so redirect to login page with the return url
					return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				}

				// check if route is restricted by role
				if (roles && roles.indexOf(currentUser.role) === -1) {
					// role not authorised so redirect to home page
					return <Redirect to={{ pathname: '/'}} />
				}

				// authorised so return component
				return <Component {...props} />
		}} 	/>
	);
}