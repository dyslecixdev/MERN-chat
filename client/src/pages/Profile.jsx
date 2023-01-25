import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
	useTheme,
	Box,
	TextField,
	Button,
	Paper,
	ButtonGroup,
	Avatar,
	Typography,
	Modal
} from '@mui/material';

import axios from 'axios';

import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure
} from '../redux/userRedux';

import {tokens} from '../theme';

import Loader from '../assets/loader.gif';

function Profile() {
	const user = useSelector(state => state.user.currentUser);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [editMode, setEditMode] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [avatar, setAvatar] = useState('');
	const [avatars, setAvatars] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const {isFetching} = useSelector(state => state.user);

	// Fetches four random avatars from the Multiavatar API.
	useEffect(() => {
		setLoading(true);
		const avatarArr = [];
		for (let i = 0; i < 4; i++) {
			const avatarImg = `https://api.multiavatar.com/${Math.round(
				Math.random() * 1000000000
			)}.svg?apikey=${process.env.REACT_APP_MULTIAVATAR_KEY}`;
			avatarArr.push(avatarImg);
		}
		setAvatars(avatarArr);
		setTimeout(() => {
			setLoading(false);
		}, '1100');
	}, [reload]);

	// Updates a user.
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(updateUserStart());
		try {
			const res = await axios.put(
				`https://mern-chat-backend-xm9q.onrender.com/users/${user.id}`,
				{username, email, password, confirmPassword, avatar},
				{
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				}
			);
			dispatch(updateUserSuccess(res.data));
			handleReset();
		} catch (err) {
			setErrorMessage(err.response.data);
			dispatch(updateUserFailure());
		}
	};

	// Deletes a user.
	const handleDelete = async e => {
		e.preventDefault();
		dispatch(deleteUserStart());
		try {
			await axios.delete(`https://mern-chat-backend-xm9q.onrender.com/users/${user.id}`, {
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			});
			dispatch(deleteUserSuccess());
			// navigate not needed here because App.js will navigate to the login page using protected routing.
		} catch (err) {
			setErrorMessage(err.response.data);
			dispatch(deleteUserFailure());
		}
	};

	// Resets the form when Cancel is clicked.
	const handleReset = () => {
		setEditMode(false);
		setUsername(user.username);
		setEmail(user.email);
		setPassword('');
		setConfirmPassword('');
		setAvatar('');
	};

	return (
		<Box
			sx={{
				width: '100vw',
				minHeight: '90vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '2rem 0'
			}}
		>
			{editMode ? (
				// Form to edit the user's information.
				<Paper
					elevation={3}
					component='form'
					onSubmit={handleSubmit}
					sx={{
						width: {
							xs: '100%',
							sm: '90%',
							md: '75%',
							lg: '50%',
							xl: '40%'
						},
						padding: '1rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
						gap: '2rem',
						background:
							theme.palette.mode === 'dark'
								? colors.primary[700]
								: colors.secondary[300]
					}}
				>
					{errorMessage && (
						<Typography color='error' sx={{textAlign: 'center'}}>
							{errorMessage}
						</Typography>
					)}
					<TextField
						label='Username'
						type='text'
						required
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<TextField
						label='Email'
						type='email'
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						label='Password'
						type='password'
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<TextField
						label='Confirm Password'
						type='password'
						required
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						{avatars.map((newAvatar, idx) =>
							loading ? (
								// Loading icons.
								<Avatar
									key={idx}
									alt='Avatar Image'
									src={Loader}
									sx={{
										width: {xs: 60, sm: 100},
										height: {xs: 60, sm: 100}
									}}
								/>
							) : (
								// Multiavatar images.
								<Avatar
									key={idx}
									alt='Avatar Image'
									src={newAvatar}
									onClick={() => setAvatar(newAvatar)}
									sx={{
										width: {xs: 60, sm: 100},
										height: {xs: 60, sm: 100},
										border:
											newAvatar === avatar &&
											`3px dashed ${colors.greenAccent[400]}`,
										cursor: 'pointer',
										'&:hover': {
											transform: 'scale(1.1)'
										}
									}}
								/>
							)
						)}
					</Box>
					<ButtonGroup
						variant='contained'
						disableElevation
						sx={{
							width: {
								xs: '100%',
								md: '80%'
							},
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<Button
							type='button'
							color='warning'
							onClick={() => setReload(!reload)}
							disabled={isFetching}
						>
							New Avatars
						</Button>
						<Button
							type='button'
							color='info'
							onClick={handleReset}
							disabled={isFetching}
						>
							Cancel
						</Button>
						<Button type='submit' color='success' disabled={isFetching}>
							Update
						</Button>
						<Button
							type='button'
							color='error'
							onClick={() => setOpenModal(true)}
							disabled={isFetching}
						>
							Delete
						</Button>
					</ButtonGroup>

					{/* Modal pop-up to confirm if the user wants to delete their account */}
					<Modal open={openModal} onClose={() => setOpenModal(false)}>
						<Box
							sx={{
								width: {
									xs: '100%',
									sm: '75%',
									md: '50%',
									lg: '35%',
									xl: '25%'
								},
								height: '20vh',
								padding: '1rem',
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								background:
									theme.palette.mode === 'dark'
										? colors.primary[600]
										: colors.secondary[400],
								border: '2px solid #000'
							}}
						>
							<Typography variant='h5' component='h2'>
								Are you sure you want to delete your profile?
							</Typography>
							<ButtonGroup
								variant='contained'
								disableElevation
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<Button
									type='button'
									color='error'
									onClick={handleDelete}
									disabled={isFetching}
								>
									Yes, I am sure
								</Button>
								<Button
									type='button'
									color='info'
									onClick={() => setOpenModal(false)}
									disabled={isFetching}
								>
									No, I need to think
								</Button>
							</ButtonGroup>
						</Box>
					</Modal>
				</Paper>
			) : (
				// The user's information.
				<Paper
					sx={{
						width: '400px',
						padding: '1rem',
						display: 'flex',
						flexDirection: 'column',
						gap: '2rem',
						background:
							theme.palette.mode === 'dark'
								? colors.primary[700]
								: colors.secondary[300]
					}}
				>
					<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
						<Avatar
							alt={user.username}
							src={user.avatar}
							sx={{width: 100, height: 100}}
							color='inherit'
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-evenly'
							}}
						>
							<Typography variant='h4'>Username: {user.username}</Typography>
							<Typography variant='h4'>Email: {user.email}</Typography>
						</Box>
					</Box>
					<Button
						color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
						onClick={() => setEditMode(true)}
					>
						Change Your Information
					</Button>
				</Paper>
			)}
		</Box>
	);
}

export default Profile;
