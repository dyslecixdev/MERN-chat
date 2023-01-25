import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {useTheme, Box, Avatar, Typography, Button, Modal, ButtonGroup} from '@mui/material';
import {Cached} from '@mui/icons-material';

import axios from 'axios';

import {updateUserStart, updateUserSuccess, updateUserFailure} from '../redux/userRedux';

import {tokens} from '../theme';

import Loader from '../assets/loader.gif';

function AvatarPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const user = useSelector(state => state.user.currentUser);
	const {isFetching} = useSelector(state => state.user);

	const [avatar, setAvatar] = useState('');
	const [avatars, setAvatars] = useState([]);
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);

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
		// Used setTimeout so the loading gif actually shows.
		setTimeout(() => {
			setLoading(false);
		}, '1100');
	}, [reload]); // This is included so that this useEffect executes every time the reload button is clicked to get new avatars.

	// Sets the chosen avatar and opens the modal.
	const handleClick = avatarImg => {
		setAvatar(avatarImg);
		setOpenModal(true);
	};

	// Updates the user's account with the chosen avatar.
	const updateUserAvatar = async e => {
		e.preventDefault();
		dispatch(updateUserStart());
		try {
			const res = await axios.put(
				`https://mern-chat-backend-xm9q.onrender.com/users/${user.id}`,
				{avatar},
				{
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				}
			);
			dispatch(updateUserSuccess(res.data));
			navigate('/');
		} catch (err) {
			dispatch(updateUserFailure());
		}
	};

	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				alignItems: 'center'
			}}
		>
			<Typography sx={{fontSize: {xs: '1.5rem', md: '2.5rem'}, textAlign: 'center'}}>
				Please choose an avatar
			</Typography>

			{/* Avatar images */}
			<Box
				sx={{
					width: {xs: '100%', sm: '75%', md: '55%'},
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				{avatars.map((avatar, idx) =>
					loading ? (
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
						<Avatar
							key={idx}
							alt='Avatar Image'
							src={avatar}
							onClick={() => handleClick(avatar)}
							sx={{
								width: {xs: 60, sm: 100},
								height: {xs: 60, sm: 100},
								cursor: 'pointer',
								'&:hover': {
									transform: 'scale(1.1)'
								}
							}}
						/>
					)
				)}
			</Box>

			<Button
				variant='contained'
				color='warning'
				onClick={() => setReload(!reload)}
				endIcon={<Cached />}
			>
				<Typography variant='h5'>New Avatars</Typography>
			</Button>

			{/* Modal pop-up to confirm avatar image */}
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
						minHeight: '25%',
						padding: '1rem',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
						background:
							theme.palette.mode === 'dark'
								? colors.primary[500]
								: colors.secondary[300],
						border: '2px solid #000'
					}}
				>
					<Typography variant='h5' component='h2'>
						Are you sure you want this avatar?
					</Typography>
					<ButtonGroup
						variant='contained'
						disableElevation
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'space-between',
							gap: '10px'
						}}
					>
						<Button
							type='button'
							color='success'
							onClick={updateUserAvatar}
							disabled={isFetching}
						>
							Yes, I am sure
						</Button>
						<Button
							type='button'
							color='error'
							onClick={() => setOpenModal(false)}
							disabled={isFetching}
						>
							No, I want to choose again
						</Button>
					</ButtonGroup>
				</Box>
			</Modal>
		</Box>
	);
}

export default AvatarPage;
