import {Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {ThemeProvider, CssBaseline, Box} from '@mui/material';

import Login from './pages/Login';
import Register from './pages/Register';
import AvatarPage from './pages/AvatarPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import {ColorModeContext, useMode} from './theme';

function App() {
	const user = useSelector(state => state.user.currentUser);

	const [theme, colorMode] = useMode();

	return (
		// Our created context with the mode, and both memoized functions.
		<ColorModeContext.Provider value={colorMode}>
			{/* MUI's context for its theme */}
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box>
					<Routes>
						<Route
							path='/login'
							element={
								user ? (
									user.avatar ? (
										<Navigate to='/' />
									) : (
										<Navigate to='/avatar' />
									)
								) : (
									<Login />
								) // Uses two ternarys to depending on if a user is logged in, and if the user has chosen an avatar.
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
						<Route path='/' element={<Navbar />}>
							<Route
								index
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
						</Route>
					</Routes>
				</Box>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
