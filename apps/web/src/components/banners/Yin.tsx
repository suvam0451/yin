import {Box, Text} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import Image from 'next/image';
import CommonBanner from './Common';
import {FaDiscord, FaChevronDown} from 'react-icons/fa';
import {MutableRefObject} from 'react';

type YinBannerProps = {
	featuresSectionRef: MutableRefObject<HTMLDivElement | undefined>
}

function YinBanner(props: YinBannerProps) {
	function navigateToFeaturesSection() {
		props.featuresSectionRef.current?.scrollIntoView();
	}

	return <div style={{
		display: 'flex', flexDirection: 'column', alignItems: 'center',
		minHeight: '100%'
	}}>
		<div style={{
			display: 'flex',
			flex: 1,
			flexGrow: 1,
			flexDirection: 'column',
			alignItems: 'center'
		}}>
			<div
				style={{
					lineHeight: 0,		/* remove line-height */
					display: 'inline-block',	/* circle wraps image */
					margin: '5px',
					border: '4px solid #ad88c687',
					borderRadius: '50%',	/* relative value */
					/*box-shadow: 0px 0px 5px rgba(0,0,0,0.4);*/
					transition: 'linear 0.25s',
					height: '128px',
					width: '128px',
					color: 'transparent',
					marginTop: '4rem'
				}}>
				<Image style={{
					borderRadius: '50%'
				}} src={`/assets/avatars/yin.jpg`} alt={'yin pfp'} width="128"
							 height="128" />
			</div>

			<Box textAlign={'center'} mt={4} mb={4}>
				<Text className={'darkmode_text_highlight'} fontSize={'xl'}
							fontWeight={700} opacity={0.75}>Hey, my name
					is</Text>
				<Text fontSize={'6xl'} fontWeight={700}
							color={'#6A4987'}
							className={'darkmode_text_highlight'}
							mt={0}
							lineHeight={1.25}
				>YIN</Text>
			</Box>

			<Text fontSize={'3xl'} fontWeight={700}
						className={'darkmode_text_highlight'}
						textAlign={'center'}
						style={{
							maxWidth: '28rem'
						}}
			>
				Discord Chatbot and Prompt Assistant</Text>
			<Text className={'darkmode_text_normal'}
						textAlign={'center'} style={{
				maxWidth: '28rem'

			}} my={8} fontSize={'1.25rem'}>
				Create and interact with multiple chatbot{' '}
				<Text display={'inline'} className={'darkmode_text_normal'}
							textDecorationLine={'underline'}
							textDecorationColor={'#7F5AD5'}
							textDecorationStyle={'dashed'}
							textUnderlineOffset={'6px'}
				>personas</Text>{' '}
				<p style={{
					color: '#ad88c6',
					display: 'inline',
					opacity: 0.5
				}}>&#9670;</p>
				{' '}Generate AI images using Dall-E and OpenAI{' '}
				<p style={{
					color: '#ad88c6',
					display: 'inline',
					opacity: 0.5
				}}>&#9670;</p>
				{' '}Customise your assistant with unique personality.
			</Text>
			<Box style={{display: 'flex'}}>
				<Button colorScheme={'purple'}><FaDiscord color={'white'} opacity={0.6}

				/>
					<a
						href={'https://discord.com/oauth2/authorize?client_id=1236723979532636301'}>
						<Text ml={'4px'} color={'white'} opacity={0.6}>ADD TO DISCORD</Text>
					</a>
				</Button>
				<Button colorScheme={'purple'} variant={'outline'} fontWeight={800}
								ml={'0.5rem'}>SEE FEATURES</Button>
			</Box>
		</div>
		<div style={{marginBottom: '2rem'}}>
			<FaChevronDown color={'#7F5AD5'}
										 style={{marginTop: '2rem'}}
										 opacity={0.75} size={64}
										 onClick={navigateToFeaturesSection}
			/>
		</div>
	</div>;
}

export default YinBanner;