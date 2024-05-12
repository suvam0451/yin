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
				Spice up your Discord
			</Text>
			<Text color={'#fff'} fontWeight={700} fontSize={'5xl'} opacity={0.87}>
				Experience with Yin
			</Text>
			<Text color={'#fff'} fontWeight={700} opacity={0.6} fontSize={'2xl'}
						my={4}>
				The All-In-One Configurator for Yin.
			</Text>
			<Text color={'#fff'} opacity={0.6}>
				Create and interact with multiple chatbot personas ◆ Generate AI images using Dall-E and OpenAI ◆ Customise your assistant with unique personality.
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