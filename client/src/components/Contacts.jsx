import {useTheme, Box} from '@mui/material';

import {tokens} from '../theme';

function Contacts() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box
			sx={{
				flex: 1,
				borderRight:
					theme.palette.mode === 'dark'
						? `1px solid ${colors.secondary[100]}`
						: `1px solid ${colors.primary[100]}`
			}}
		>
			Contacts
		</Box>
	);
}

export default Contacts;
