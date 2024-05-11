'use client';

import {Inter} from 'next/font/google';
import {ChakraProvider} from '@chakra-ui/react';
import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query';
import {createTheme, MantineProvider} from '@mantine/core';

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
