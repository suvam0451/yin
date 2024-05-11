import {Avatar, Box} from '@mantine/core';
import {useYinAuthContext} from '../../state/authContext';
import {useEffect, useState} from 'react';
import DiscordService from '../../../services/discord.service';
import Image from 'next/image';
import {FaBell, FaDiscord} from 'react-icons/fa';
import {Popover, Text, Button} from '@mantine/core';
import styles from './ProfileItem.module.css';

function ProfileItem() {
	const auth = useYinAuthContext();
	const [ProfilePic, setProfilePic] = useState('');

	useEffect(() => {
		if (auth.me?.discord?.avatar) {
			const link = DiscordService.getAvatarUrl(auth.me?.discord.id, auth?.me?.discord?.avatar);
			setProfilePic(link);
		}
	}, [auth.me]);

	if (!auth.token || auth.token === '') return <Box>
		<Box pr={'0.5rem'} style={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		}}>
			<FaBell color={'#ffffff60'} size={16}
							style={{marginRight: '12px', marginLeft: '4px'}} />
			<Popover width={120} position="bottom-end" shadow="md" offset={8}>
				<Popover.Target>
					<Avatar classNames={
						{
							placeholder: styles.avatar
						}
					}
									size={'md'} color={'purple'} alt="it's me">Y</Avatar>
				</Popover.Target>
				<Popover.Dropdown>
					<Box style={{display: 'flex', flexDirection: 'row'}}>
						<Text style={{marginTop: '0.25rem', marginBottom: '0.25rem'}}
									size="md"
									c={'#fff'} opacity={0.6}>
							<FaDiscord
								color={'white'} opacity={0.87}
								style={{marginRight: '0.5rem', display: 'inline'}} />
							Log In</Text>
					</Box>

				</Popover.Dropdown>
			</Popover>
		</Box>
	</Box>;
	return <Box>
		<Popover width={100} position="bottom-end" shadow="md" offset={8}>
			<Popover.Target>
				<Box pr={'0.5rem'} style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center'
				}}>
					<FaBell color={'#ffffff60'} size={16}
									style={{marginRight: '12px', marginLeft: '4px'}} />
					<Avatar size={'md'} color={'purple'} src={ProfilePic} alt="it's me" />
				</Box>
			</Popover.Target>
			<Popover.Dropdown>
				<Text style={{marginTop: '0.25rem', marginBottom: '0.25rem'}} size="md"
							c={'#fff'} opacity={0.6}>Settings</Text>
				<Text style={{marginTop: '0.25rem', marginBottom: '0.25rem'}} size="md"
							c={'red'} opacity={0.87}
							onClick={auth.logout}
				>Logout</Text>
			</Popover.Dropdown>
		</Popover>
	</Box>;
}

export default ProfileItem;