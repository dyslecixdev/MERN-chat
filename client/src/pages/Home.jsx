import {useDispatch} from 'react-redux';

import {Box, Button} from '@mui/material';

import {logoutStart, logoutSuccess, logoutFailure} from '../redux/userRedux';

function Home() {
	const dispatch = useDispatch();

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
		<Box>
			Home
			<Button onClick={handleLogout}>Logout</Button>
		</Box>
	);
}

export default Home;
