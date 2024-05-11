import React, {useEffect, useState} from 'react';
import {
	Box,
	Text
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {configLazy} from '../../services/config';
import axios from 'axios';
import {formatDistance} from 'date-fns';
import {useSearchParams} from 'next/navigation';

type ImageGalleryRenderImageProps = {
	url: string
}

function ImageGalleryRenderImage({url}: ImageGalleryRenderImageProps) {
	const [ImageUrl, setImageUrl] = useState('');
	useEffect(() => {
		const ex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg/;
		const baseUrl = 'https://yin-storage-dev.s3.eu-central-1.amazonaws.com';
		if (ex.test(url)) {
			setImageUrl(`${baseUrl}/${url}`);
		} else {
			setImageUrl(url);
		}
	}, []);

	return <Box><img src={ImageUrl} alt={'missing image'} width={196}
									 height={196} /></Box>;
}

function ImageGallery() {
	const searchParams = useSearchParams();

	async function api() {
		const config = configLazy();
		return axios.get(`${config.vercel.backendUrl}/recent/image-prompts`);
	}

	const [Data, setData] = useState([]);

	// Queries
	const query = useQuery({
		queryKey: ['recent/image-prompts'],
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
				<Box mt={4}>
					{o.user.username && <Text color={'#ffffff60'}
																		fontSize={'sm'}>@{o.user.username} • {formatDistance(
						o.createdAt,
						new Date(),
						{addSuffix: true})
					}</Text>}</Box>

			</Box>)}
		</Box>
	</Box>;
}

export default ImageGallery;