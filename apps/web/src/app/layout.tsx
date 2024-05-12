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
				url: `${process.env.NEXT_PUBLIC_STORAGE_ENDPOINTh}/site-banner.png`,
				width: 1578,
				height: 806,
				alt: 'Project Yin',
				type: 'image/png'
			},
			{
				url: `${process.env.NEXT_PUBLIC_STORAGE_ENDPOINTh}/site-banner.png`,
				width: 1578,
				height: 806,
				alt: 'Project Yin',
				type: 'image/png'
			}
		],
		siteName: 'Project Yin'
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
