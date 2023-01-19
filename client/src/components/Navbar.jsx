import {useContext, useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {useTheme, Box, IconButton, Badge, Menu, MenuItem} from '@mui/material';
import {
	LightModeOutlined,
	DarkModeOutlined,
	ChatBubbleOutlineOutlined,
	SettingsOutlined
} from '@mui/icons-material';

import {logoutStart, logoutSuccess, logoutFailure} from '../redux/userRedux';

import {ColorModeContext} from '../theme';

function Navbar() {
	const dispatch = useDispatch();

	const theme = useTheme();
	const colorMode = useContext(ColorModeContext); // colorMode is an object holding memoized functions.

	const [anchorEl, setAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);

	// Opens the profile menu
	const handleProfileMenuOpen = e => {
		setAnchorEl(e.currentTarget);
	};

	// Closes the profile menu
	const handleProfileMenuClose = () => {
		setAnchorEl(null);
	};

	// Logs the user out of the app.
	const handleLogout = async () => {
		dispatch(logoutStart());
		try {
			dispatch(logoutSuccess());
		} catch (err) {
			console.log(err);
			dispatch(logoutFailure());
		}
	};

	return (
		<div>
			<Box
				sx={{
					p: 2,
					display: 'flex',
					justifyContent: 'flex-end',
					gap: '5px'
				}}
			>
				{/* Icons */}
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
				</IconButton>
				<IconButton component={Link} to='/' sx={{mr: '10px'}}>
					<Badge badgeContent={1} color='info'>
						<ChatBubbleOutlineOutlined />
					</Badge>
				</IconButton>
				<IconButton onClick={handleProfileMenuOpen}>
					<Badge>
						<SettingsOutlined />
					</Badge>
				</IconButton>

				{/* Profile Menu */}
				<Menu
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={isMenuOpen}
					onClose={handleProfileMenuClose}
					sx={{zIndex: 100}}
				>
					<MenuItem onClick={handleProfileMenuClose} component={Link} to='/profile'>
						Profile
					</MenuItem>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</Box>
			<Outlet />
		</div>
	);
}

export default Navbar;
