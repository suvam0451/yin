import {Box, Button, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {FaLock} from 'react-icons/fa';
import {useYinAuthContext} from '../../state/authContext';
import {Tabs} from '@mantine/core';
import ProfileItem from './ProfileItem';
import {useRouter} from 'next/navigation';


function DashboardHeaderBar() {
	const [SelectedTab, setSelectedTab] = useState(0);
	const auth = useYinAuthContext();
	const hasNoToken = auth.token == null || auth.token == '';
	const router = useRouter();

	const tabs = [
		{
			label: auth.token == null ? 'Login' : 'Home',
			visible: auth.token != null,
			locked: false,
			redirectUri: '/dashboard'
		},
		{
			label: 'Gallery',
			visible: true,
			locked: hasNoToken,
			redirectUri: '/dashboard?module=gallery'
		},
		{
			label: 'Personas',
			visible: true,
			locked: hasNoToken,
			redirectUri: '/dashboard?module=persona'
		},
		{
			label: 'Settings',
			visible: true,
			locked: hasNoToken,
			redirectUri: '/dashboard?module=settings'
		}
	];

	return <Box display={'flex'} flexDirection={'row'} mt={8} bgColor={'#232323'}>
		<Box display={'flex'} flexDirection={'row'} flexGrow={1}>
			{tabs.map((o, i) => <Box key={i}
															 position={'relative'}
															 px={2}
															 dropShadow={'10px white'}
															 onClick={() => {
																 if (auth.token === null || auth.token === '') return;
																 setSelectedTab(i);
																 router.push(o.redirectUri);
															 }}>
				{SelectedTab === i &&
					<Box
						position={'absolute'}
						style={{height: '2px', width: '100%'}}

						backgroundColor={'purple'}>
					</Box>}
				<Box p={2} display={'flex'} alignItems={'center'}>
					<Text style={{
						color: SelectedTab === i ? '#fff' : '#ffffff60'
					}}>{o.label}

					</Text>
					{o.locked &&
						<FaLock style={{marginLeft: '4px'}} display={'inline'} size={16}
										color={'#ffffff60'} />}
				</Box>
			</Box>)}
		</Box>

		<ProfileItem />
	</Box>;
}

export default DashboardHeaderBar;