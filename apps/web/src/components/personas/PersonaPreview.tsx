import {Box, Text} from '@mantine/core';
import {FaCamera} from 'react-icons/fa';
import styled from 'styled-components';

function PersonaPreview() {
	return <Box style={{
		maxWidth: '24rem',
		width: '100%',
		minHeight: '24rem',
		paddingTop: '1rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}}>
		<Box style={{
			border: '2px solid purple',
			borderRadius: '0.5rem',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100%',
			padding: '1rem'
		}}>
			<FaCamera color={'#ffffff60'} size={64} />
			<Text c={'#fff'} opacity={0.6} ta={'center'}>In a future update, you can
				test your
				persona from
				here.</Text>
		</Box>
	</Box>;
}


export default PersonaPreview;