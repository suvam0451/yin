import {usePersonaFormContext} from '../../state/personaFormContext';
import {useEffect, useState} from 'react';
import {Box, Input} from '@mantine/core';
import styled from 'styled-components';
import {FaTrashAlt} from 'react-icons/fa';

type InstructionItemProps = {
	index: number,
}

// Create a Title component that'll render an <h1> tag with some styles
const TrashIcon = styled(FaTrashAlt)`
    font-size: 1.5em;
    text-align: center;
    color: #ffffff60;

    &:hover {
        color: #b582cc; // <Thing> when hovered
    }
`;

function InstructionItem({
	index
}: InstructionItemProps) {
	const personaFomContext = usePersonaFormContext();
	const [Value, setValue] = useState('');

	function onInputChanged(e: any) {
		setValue(e.target.value);
		personaFomContext.instructions[index] = e.target.value;
		personaFomContext.onUpdateInstructions();
	}

	useEffect(() => {
		setValue(personaFomContext.instructions[index]);
	}, [personaFomContext.instructions[index]]);

	function onInstructionRemove(e: any) {
		personaFomContext.removeInstruction(index);
	}

	return <Box
		display={'flex'}
		my={'0.5rem'}
		style={{
			flexDirection: 'row',
			alignItems: 'center'
		}}
		key={index}
	>
		<Box style={{
			flexDirection: 'row',
			alignItems: 'center', minWidth: '10rem'
		}} />
		<Box display={'flex'} style={{alignItems: 'center', flexGrow: 1}}>
			<Input placeholder={`Instruction #${index + 1}`} w={'100%'}
						 onChange={onInputChanged} value={Value} />
			<TrashIcon size={24} style={{marginLeft: '0.5rem'}}
								 onClick={onInstructionRemove} />
		</Box>
	</Box>;
}

export default InstructionItem