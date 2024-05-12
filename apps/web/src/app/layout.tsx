'use client';

import {Inter} from 'next/font/google';
import {ChakraProvider} from '@chakra-ui/react';
import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import {createTheme, MantineProvider} from '@mantine/core';
import {Helmet} from 'react-helmet';
import { NextSeo } from 'next-seo';


import './globals.css';
import StyledComponentsRegistry from '../lib/registry';

const inter = Inter({subsets: ['latin']});
const queryClient = new QueryClient();

// Create a client
import '@mantine/core/styles.css';
import React from 'react';

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<NextSeo
			title="Yin | Chatbot and Prompt Assistant"
			description="Create and interact with multiple chatbot personas ◆ Generate AI images using Dall-E and Stable Diffusion ◆ Customise your assistant with unique personality."
			openGraph={{
				url: 'https://avatars.githubusercontent.com/u/44526763?v=4',
				title: 'Yin | Chatbot and Prompt Assistant',
				description: 'Create and interact with multiple chatbot personas ◆ Generate AI images using Dall-E and Stable Diffusion ◆ Customise your assistant with unique personality.',
				images: [
					{
						url: 'https://avatars.githubusercontent.com/u/44526763?v=4',
						width: 800,
						height: 600,
						alt: 'Og Image Alt',
						type: 'image/jpeg',
					},
					{
						url: 'https://avatars.githubusercontent.com/u/44526763?v=4',
						width: 900,
						height: 800,
						alt: 'Og Image Alt Second',
						type: 'image/jpeg',
					},
				],
				siteName: 'SiteName',
			}}
		/>
		<Helmet>
			<title>Yin | Chatbot and Prompt Assistant</title>
			<meta property="og:title" content="Yin | Chatbot and Prompt Assistant"
						key="title" />
			<meta name="description"
						content="Create and interact with multiple chatbot personas ◆ Generate AI images using Dall-E and Stable Diffusion ◆ Customise your assistant with unique personality." />
			<meta property="og:description"
						content="Create and interact with multiple chatbot personas ◆ Generate AI images using Dall-E and OpenAI ◆ Customise your assistant with unique personality." />
			<meta property="og:image:url" content="https://avatars.githubusercontent.com/u/44526763?v=4" />
			<meta property="og:image:width" content="800" />
			<meta property="og:image:height" content="600" />
			<meta property="og:type" content="website" />
		</Helmet>
		<body className={inter.className}>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<MantineProvider theme={theme} defaultColorScheme={'dark'}>
					<StyledComponentsRegistry>
						{children}
					</StyledComponentsRegistry>
				</MantineProvider>
			</ChakraProvider>
		</QueryClientProvider>
		</body>
		</html>
	);
}
