import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createTheme, MantineProvider} from '@mantine/core';
import {ChakraProvider} from '@chakra-ui/react';
import StyledComponentsRegistry from '../lib/registry';

const queryClient = new QueryClient();
const theme = createTheme({
	/** Put your mantine theme override here */
});

function ProviderContainer({children}: any) {
	return <QueryClientProvider client={queryClient}>
		<ChakraProvider>
			<MantineProvider theme={theme} defaultColorScheme={'dark'}>
				<StyledComponentsRegistry>
					{children}
				</StyledComponentsRegistry>
			</MantineProvider>
		</ChakraProvider>
	</QueryClientProvider>;
}

export default ProviderContainer;