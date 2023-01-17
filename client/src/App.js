import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Login from './pages/Login';
import Register from './pages/Register';
import AvatarPage from './pages/AvatarPage';
import Home from './pages/Home';

function App() {
	const user = useSelector(state => state.user.currentUser);

	return (
		<Routes>
			<Route
				path='/login'
				element={
					user ? user.avatar ? <Navigate to='/' /> : <Navigate to='/avatar' /> : <Login />
				}
			/>
			<Route
				path='/register'
				element={
					user ? (
						user.avatar ? (
							<Navigate to='/' />
						) : (
							<Navigate to='/avatar' />
						)
					) : (
						<Register />
					)
				}
			/>
			<Route
				path='/avatar'
				element={
					user ? (
						user.avatar ? (
							<Navigate to='/' />
						) : (
							<AvatarPage />
						)
					) : (
						<Navigate to='/login' />
					)
				}
			/>
			<Route
				path='/'
				element={
					user ? (
						user.avatar ? (
							<Home />
						) : (
							<Navigate to='/avatar' />
						)
					) : (
						<Navigate to='/login' />
					)
				}
			/>
		</Routes>
	);
}

export default App;
