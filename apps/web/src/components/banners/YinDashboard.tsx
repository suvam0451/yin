import {Box, Button, Text} from '@chakra-ui/react';
import Image from 'next/image';
import {FaDiscord} from 'react-icons/fa';
import {useYinAuthContext} from '../../state/authContext';
import {useSearchParams} from 'next/navigation';

function YinDashboard() {
	const auth = useYinAuthContext();
	const searchParams = useSearchParams();

	if (searchParams.get('module') !== null) return <Box></Box>;

	return <Box mt={8} px={6} display={'flex'}>
		<Box pr={4}>
			<Text color={'#fff'} fontWeight={700} fontSize={'5xl'} opacity={0.87}>
				Manage your account
			</Text>
			<Text color={'#fff'} fontWeight={700} fontSize={'5xl'} opacity={0.87}>
				with Yin&apos;s Dashboard
			</Text>
			<Text color={'#fff'} fontWeight={700} opacity={0.6} fontSize={'2xl'}
						my={4}>
				The All-In-One Configurator for Yin.
			</Text>
			<Text color={'#fff'} opacity={0.6}>
				Here, you can view and manage images generated by you and other discord
				users.
				You can set the default visibility of your profile and prompts.
				You can add and edit chatbot personas for Yin.
			</Text>
			{(auth.token === null || auth.token === '') && <a
				href={'https://discord.com/oauth2/authorize?client_id=1236723979532636301&response_type=code&redirect_uri=https%3A%2F%2Fyin.suvam.io%2Fauth%2Fdiscord&scope=identify'}>
				<Button my={8} size={'lg'} colorScheme={'purple'}
								onClick={() => {
								}}><FaDiscord
					color={'white'} opacity={0.6}
					style={{marginRight: '0.5rem'}} />
					Login with Discord</Button>
			</a>}
		</Box>
		<Box minWidth={'300'} display={'flex'} flexDirection={'column'}
				 alignItems={'flex-end'}
		>
			<Image style={{
				borderRadius: '0.5rem'
			}} objectFit={'cover'} src={`/assets/sections/yin.jpg`} alt={'yin pfp'}
						 width="280" height="256" />
		</Box>
	</Box>;
}

export default YinDashboard;