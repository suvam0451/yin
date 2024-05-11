import {
	Box,
	Text,
	Divider
} from '@mantine/core';
import {useState} from 'react';

import PersonaEdit from './personas/PersonaEdit';
import PersonaCreate from './personas/PersonaCreate';
import WithPersonaFormContext from '../state/personaFormContext';
import {useSearchParams} from 'next/navigation';

function PersonaEditor() {
	const searchParams = useSearchParams();

	const [IsFirstTabOpen, setIsFirstTabOpen] = useState(true);
	const [IsSecondTabOpen, setIsSecondTabOpen] = useState(false);

	function toggleFirstTabExpanded() {
		if (IsFirstTabOpen) return;

		setIsFirstTabOpen(true);
		setIsSecondTabOpen(false);
	}

	function togglePersonaCreateExpanded() {
		if (IsSecondTabOpen) return;

		setIsFirstTabOpen(false);
		setIsSecondTabOpen(true);
	}

	if (searchParams.get('module') !== 'persona') return <Box></Box>;

	return <Box mt={'2rem'}>
		<Box display={'flex'} style={{flexDirection: 'row', alignItems: 'center'}}>
			<Text size={'xl'} c={'#ffffff87'} ta={'center'} style={{flexGrow: 1}}
						onClick={toggleFirstTabExpanded}
						bg={IsFirstTabOpen ? '#ffffff30' : 'inherit'}
			>Edit an Existing Persona</Text>
			<Divider orientation={'vertical'} />
			<Text size={'xl'} c={'#ffffff87'} ta={'center'} style={{flexGrow: 1}}
						onClick={togglePersonaCreateExpanded}
						bg={IsSecondTabOpen ? '#ffffff30' : 'inherit'}
			>Create a New Persona</Text>
		</Box>

		<Divider mt={'0.25rem'} color={'#ffffff16'} />

		{IsFirstTabOpen &&
			<WithPersonaFormContext><PersonaEdit /></WithPersonaFormContext>}

		{IsSecondTabOpen &&
			<WithPersonaFormContext><PersonaCreate /></WithPersonaFormContext>}
	</Box>;
}

export default PersonaEditor;