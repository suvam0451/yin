import {Box, Text} from '@mantine/core';
import {useState} from 'react';

import PersonaEdit from './personas/PersonaEdit';
import PersonaCreate from './personas/PersonaCreate';
import WithPersonaFormContext from '../state/personaFormContext';
import {useSearchParams} from 'next/navigation';
import styled from 'styled-components';

function PersonaEditor() {
	const searchParams = useSearchParams();

	const [IsFirstTabOpen, setIsFirstTabOpen] = useState(true);
	const [IsSecondTabOpen, setIsSecondTabOpen] = useState(false);

	function toggleFirstTabExpanded() {
		if (IsFirstTabOpen) return;

		setIsFirstTabOpen(true);
		setIsSecondTabOpen(false);
	}


	const PersonaEditorTabOneContainer = styled.div`
      font-size: 1.25rem;
      color: #ffffff87;
      flex-grow: 1;
      text-align: center;
      background-color: ${IsFirstTabOpen ? '#ffffff30' : '#ffffff16'};
      border-top-left-radius: 0.5rem;
	`;


	const PersonaEditorTabTwo = styled.div`
      font-size: 1.25rem;
      flex-grow: 1;
      color: #ffffff87;
      text-align: center;
      background-color: ${IsSecondTabOpen ? '#ffffff30' : '#ffffff16'};
      border-top-right-radius: 0.5rem;
	`;


	function togglePersonaCreateExpanded() {
		if (IsSecondTabOpen) return;
		setIsFirstTabOpen(false);
		setIsSecondTabOpen(true);
	}

	if (searchParams.get('module') !== 'persona') return <Box></Box>;

	return <Box mt={'2rem'}>
		<Box display={'flex'} style={{flexDirection: 'row', alignItems: 'center'}}>
			<PersonaEditorTabOneContainer onClick={toggleFirstTabExpanded}>
				<Text size={'xl'}>Edit an Existing Persona</Text>
			</PersonaEditorTabOneContainer>
			<PersonaEditorTabTwo onClick={togglePersonaCreateExpanded}>
				<Text size={'xl'}>Create a New Persona</Text>
			</PersonaEditorTabTwo>
		</Box>

		<Box bg={'#ffffff30'} h={'1px'} style={{marginBottom: '1.5rem'}}></Box>

		{IsFirstTabOpen &&
			<WithPersonaFormContext><PersonaEdit /></WithPersonaFormContext>}

		{IsSecondTabOpen &&
			<WithPersonaFormContext><PersonaCreate /></WithPersonaFormContext>}
	</Box>;
}

export default PersonaEditor;