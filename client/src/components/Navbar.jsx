import {useContext, useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {useTheme, Box, IconButton, Badge, Menu, MenuItem} from '@mui/material';
import {
	LightModeOutlined,
	DarkModeOutlined,
	ChatBubbleOutlineOutlined,
	SettingsOutlined
} from '@mui/icons-material';

import {logoutStart, logoutSuccess, logoutFailure} from '../redux/userRedux';
import {leaveRoomStart, leaveRoomSuccess, leaveRoomFailure} from '../redux/chatRedux';

import {ColorModeContext} from '../theme';

function Navbar() {
	const unreadMessages = useSelector(state => state.message.numberOfUnread);

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
		dispatch(leaveRoomStart());
		try {
			dispatch(logoutSuccess());
			dispatch(leaveRoomSuccess());
		} catch (err) {
			console.log(err);
			dispatch(logoutFailure());
			dispatch(leaveRoomFailure());
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
				<IconButton component={Link} to='/'>
					{/* todo Add badge for number of unread messages */}
					{/* <Badge badgeContent={unreadMessages} color='error'> */}
					<ChatBubbleOutlineOutlined />
					{/* </Badge> */}
				</IconButton>
				<IconButton onClick={handleProfileMenuOpen}>
					<SettingsOutlined />
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
