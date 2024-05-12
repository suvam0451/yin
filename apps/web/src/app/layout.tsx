import {Inter} from 'next/font/google';
import {
	QueryClient
} from '@tanstack/react-query';
import {createTheme} from '@mantine/core';


import './globals.css';

const inter = Inter({subsets: ['latin']});

// Create a client
import '@mantine/core/styles.css';
import React from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Yin | Chatbot and Prompt Assistant',
	description:
		'Create and interact with multiple chatbot personas ◆ Generate AI images' +
		' using Dall-E and Stable Diffusion ◆ Customise your assistant with unique personality.',
	openGraph: {
		url: 'https://yin.suvam.io',
		title: 'Yin | Chatbot and Prompt Assistant',
		description: 'Create and interact with multiple chatbot personas ◆ Generate AI images using Dall-E and Stable Diffusion ◆ Customise your assistant with unique personality.',
		images: [
			{
				url: 'https://yin-storage-dev.s3.eu-central-1.amazonaws.com/site-banner.png',
				width: 1098,
				height: 1486,
				alt: 'Og Image Alt',
				type: 'image/jpeg'
			},
			{
				url: 'https://yin-storage-dev.s3.eu-central-1.amazonaws.com/site-banner.png',
				width: 1098,
				height: 1486,
				alt: 'Og Image Alt Second',
				type: 'image/jpeg'
			}
		],
		siteName: 'SiteName'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className={inter.className}>
		{children}
		</body>
		</html>
	);
}
