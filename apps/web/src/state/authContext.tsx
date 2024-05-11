import React, {createContext, useContext, useEffect} from 'react';
import LocalStorageService from '../../services/local-storage';
import BackendService from '../../services/backend';
import {z} from 'zod';


export const DiscordMeDTO = z.object({
	data: z.object({
		'uuid': z.string(),
		'username': z.string(),
		'active': z.boolean(),
		discordUsers: z.array(z.object({
			id: z.string(),
			username: z.string(),
			avatar: z.string(),
			userId: z.string()
		}))
	})
});

export const AppMeDTO = z.object({
	'uuid': z.string(),
	'username': z.string(),
	'active': z.boolean(),
	discord: z.object({
		id: z.string(),
		username: z.string(),
		avatar: z.string(),
		userId: z.string()
	})
});
export type AppMeDTOType = z.infer<typeof AppMeDTO>

type YinAuthContextType = {
	token: string | null
	me: AppMeDTOType | null
	setToken: (token: string) => void
	setMe: (me: any) => void
	logout: () => void
}


const defaultYinAuth = {
	token: null,
	me: null,
	setToken: () => {
	},
	setMe: () => {
	},
	logout: () => {
	}
};

const YinAuthContext = createContext<YinAuthContextType>(defaultYinAuth);

export function useYinAuthContext() {
	return useContext(YinAuthContext);
}

export default function WithYinAuthContext({children}: any) {
	const [Token, setToken] = React.useState('');
	const [Me, setMe] = React.useState<AppMeDTOType | null>(null);

	useEffect(() => {
		const token = LocalStorageService.get('BACKEND_API_TOKEN');
		if (token && token !== '') {
			setToken(token);
			BackendService.getAuthenticated<z.infer<typeof DiscordMeDTO>>
			(token, 'user/me').then((res) => {
				const data = res.data?.data;
				setMe({
					uuid: data.uuid,
					username: data.username,
					active: data.active,
					discord: data.discordUsers[0]
				});
			});
			console.log('auth successful');
		}
	}, []);

	function setMeFunction(me: any) {
		setMe(me);
	}

	function setTokenFunction(token: string) {
		setToken(token);
	}

	function logout() {
		LocalStorageService.remove('BACKEND_API_TOKEN');
		setToken('');
		setMe(null);
	}

	return (
		<YinAuthContext.Provider value={{
			token: Token,
			me: Me,
			setMe: setMeFunction,
			setToken: setTokenFunction,
			logout
		}}>
			{children}
		</YinAuthContext.Provider>
	);
}