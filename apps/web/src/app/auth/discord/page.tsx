'use client';

import {useSearchParams} from 'next/navigation';
import {Box} from '@chakra-ui/react';
import {useEffect} from 'react';
import {Suspense} from 'react';
import axios from 'axios';
import {configLazy} from '../../../../services/config';
import LocalStorage from '../../../../services/local-storage';
import {useRouter} from 'next/navigation';

function DiscordAuthPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	useEffect(() => {
		const code = searchParams.get('code');
		if (code && code !== '') {
			const config = configLazy();

			axios.post(`${config.vercel.backendUrl}/user/discord-oauth`, {
				code
			}).then((res) => {
				LocalStorage.set('BACKEND_API_TOKEN', res.data?.token);
				router.push('/dashboard');
			}).catch((e) => {
				console.log('error using token', e);
			});
		}
	}, []);

	return <Box>Redirecting you back...</Box>;
}

function DiscordAuthPageSuspenseWrapped() {
	return (
		<Suspense fallback={<Box>Loading...</Box>}>
			<DiscordAuthPage />
		</Suspense>
	);
}

export default DiscordAuthPageSuspenseWrapped;
