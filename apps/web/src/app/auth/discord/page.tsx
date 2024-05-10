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
				if (res.data?.data?.token) {
					LocalStorage.set('BACKEND_API_TOKEN', res.data?.data?.token);
					router.push('/dashboard');
				} else {
					console.log('error saving token');
				}
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
