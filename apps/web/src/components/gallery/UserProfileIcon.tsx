import {Avatar, Box} from '@mantine/core';
import {formatDistance} from 'date-fns';
import {Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import DiscordService from '../../services/discord.service';

type UserProfileIconProps = {
	user: any,
	createdAt: any
}

function UserProfileIcon({user, createdAt}: UserProfileIconProps) {
	const [ProfilePic, setProfilePic] = useState('');

	useEffect(() => {
		console.log(user);
		if (user.discordUsers.length > 0) {
			const discordUser = user.discordUsers[0];
			const link = DiscordService.getAvatarUrl(discordUser.id, discordUser.avatar);
			setProfilePic(link);
		}
	}, [user]);

	if (user.discordUsers.length > 0) {
		return <Box>
			<Avatar size={'md'} color={'purple'} src={ProfilePic}
							alt="it's me" /></Box>;
	}


	return <Box>
		<Text
			color={'#ffffff60'}
			fontSize={'sm'}>@{user.username} • {formatDistance(
			user.createdAt,
			new Date(),
			{addSuffix: true})
		}</Text></Box>;
}

export default UserProfileIcon;