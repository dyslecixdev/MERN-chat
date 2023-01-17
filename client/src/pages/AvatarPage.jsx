import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {Container, Box, Avatar, Typography, Button, Modal, ButtonGroup} from '@mui/material';
import {Cached} from '@mui/icons-material';

import axios from 'axios';

import {updateUserStart, updateUserSuccess, updateUserFailure} from '../redux/userRedux';

function AvatarPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector(state => state.user.currentUser);
	const {isFetching} = useSelector(state => state.user);

	const [avatar, setAvatar] = useState('');
	const [avatars, setAvatars] = useState([]);
	const [reload, setReload] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	// Fetches four random avatars from the Multiavatar API.
	useEffect(() => {
		const avatarArr = [];
		for (let i = 0; i < 4; i++) {
			const avatarImg = `https://api.multiavatar.com/${Math.round(
				Math.random() * 1000000000
			)}.svg?apikey=${process.env.REACT_APP_MULTIAVATAR_KEY}`;
			avatarArr.push(avatarImg);
		}
		setAvatars(avatarArr);
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
				`http://localhost:5000/users/${user.id}`,
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
		<Container
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				alignItems: 'center'
			}}
		>
			<Typography variant='h4' sx={{textAlign: 'center'}}>
				Please choose an avatar
			</Typography>
			<Box
				sx={{
					width: {xs: '100%', sm: '75%', md: '55%'},
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				{avatars.map((avatar, idx) => (
					<Avatar
						key={idx}
						alt='Avatar Image'
						src={avatar}
						onClick={() => handleClick(avatar)}
						sx={{
							width: {xs: 60, sm: 100},
							height: {xs: 60, sm: 100},
							cursor: 'pointer'
						}}
					/>
				))}
			</Box>
			<Button variant='contained' onClick={() => setReload(!reload)} endIcon={<Cached />}>
				New Avatars
			</Button>

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
						justifyContent: 'space-between',
						background: 'white',
						border: '2px solid #000'
					}}
				>
					<Typography variant='h6' component='h2'>
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
							color='error'
							onClick={updateUserAvatar}
							disabled={isFetching}
						>
							Yes, I am sure
						</Button>
						<Button
							type='button'
							onClick={() => setOpenModal(false)}
							disabled={isFetching}
						>
							No, I want to choose again
						</Button>
					</ButtonGroup>
				</Box>
			</Modal>
		</Container>
	);
}

export default AvatarPage;
