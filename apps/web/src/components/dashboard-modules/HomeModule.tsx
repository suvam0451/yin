import React, {useEffect, useState} from 'react';
import {
	Box,
	Text
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {configLazy} from '../../services/config.service';
import {formatDistanceStrict} from 'date-fns';
import {useSearchParams} from 'next/navigation';
import {AiOutlineOpenAI} from 'react-icons/ai';

import Image from 'next/image';
import UserProfileIcon from '../gallery/UserProfileIcon';
import BackendService from '../../services/backend.service';

type ImageGalleryRenderImageProps = {
	url: string
}

const QUERY_KEY = 'recent/image-prompts';

function ImageGalleryRenderImage({url}: ImageGalleryRenderImageProps) {
	const [ImageUrl, setImageUrl] = useState('');
	useEffect(() => {
		const config = configLazy();
		const ex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg/;
		const baseUrl = config.yin.storageUrl;
		if (ex.test(url)) {
			setImageUrl(`${baseUrl}/${url}`);
		} else {
			setImageUrl(url);
		}
	}, []);

	return <Box><img src={ImageUrl} alt={'missing image'} width={196}
									 height={196} /></Box>;
}

function HomeModule() {
	const searchParams = useSearchParams();

	async function api() {
		return BackendService.get(QUERY_KEY);
	}

	const [Data, setData] = useState([]);

	// Queries
	const query = useQuery({
		queryKey: [QUERY_KEY],
		queryFn: api
	});

	useEffect(() => {
		// console.log(query.data)
		if (query.data?.data?.data.length > 0) {
			const data = query.data?.data?.data.sort((a: any, b: any) =>
				(new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime());

			setData(data);
		}
	}, [query.data]);

	if (searchParams.get('module') !== null) return <Box></Box>;

	return <Box bgColor={'#222'} my={8} py={4} px={8}>
		<Text pl={4} className={'darkmode_text_normal'} fontWeight={700}
					fontSize={'xl'}>Generated Recently:</Text>
		<Box display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'}>
			{Data?.map((o: any, i: number) => <Box key={i} bgColor={'#333'} p={2}
																						 m={4}
																						 display={'flex'}
																						 flexDirection={'column'}
																						 borderRadius={'0.5rem'}>
				<Box flexGrow={1} display={'flex'} alignItems={'center'}
						 flexDirection={'column'}>
					{o.imageGeneratePrompt?.results.length > 0
						&& <ImageGalleryRenderImage
							url={o.imageGeneratePrompt?.results[0].mediaAsset.relativeUrl} />}
					{o.imageGeneratePrompt.prompt && <Box mt={4}>
						<Text color={'#ffffff87'}>{o.imageGeneratePrompt.prompt}</Text>
					</Box>}
				</Box>
				<Box mt={4} style={{display: 'flex', alignItems: 'center'}}>
					<Box>
						{o.imageGeneratePrompt.prodiaSetting && <Image
							src={'/assets/logos/ProdiaLogo.webp'}
							alt={'prodia logo'}
							width={48} height={48} style={{opacity: 0.6}} />}
						{o.imageGeneratePrompt.openaiSetting &&
							<AiOutlineOpenAI size={32} color={'#fff'} opacity={0.6} />}
					</Box>
					<Box style={{flex: 1, flexGrow: 1, textAlign: 'center'}}>
						{o.imageGeneratePrompt?.openaiSetting?.model &&
							<Text color={'#fff'}
										opacity={0.6}>{o.imageGeneratePrompt.openaiSetting.model}</Text>}
						{o.imageGeneratePrompt?.prodiaSetting?.model &&
							<Text color={'#fff'}
										opacity={0.6}>{o.imageGeneratePrompt.prodiaSetting.model}</Text>}
						<Text fontSize={'sm'} color={'#fff'} opacity={0.3}>
							{formatDistanceStrict(
								o.createdAt,
								new Date(),
								{addSuffix: false})
							}</Text>
					</Box>
					<Box>
						<UserProfileIcon user={o.user} createdAt={o.createdAt} />
					</Box>
				</Box>
			</Box>)}
		</Box>
	</Box>;
}

export default HomeModule;