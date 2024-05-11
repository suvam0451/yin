import {Box, Input, Text, Tooltip} from '@mantine/core';
import {FaPlusCircle, FaRegQuestionCircle} from 'react-icons/fa';
import {Button} from '@chakra-ui/react';
import {usePersonaFormContext} from '../../state/personaFormContext';
import BackendService from '../../../services/backend';
import {useYinAuthContext} from '../../state/authContext';
import PersonaPreview from './PersonaPreview';
import InstructionItem from './InstructionItem';

function PersonaCreate() {
	const personaFomContext = usePersonaFormContext();
	const auth = useYinAuthContext();

	function onCreateClick() {
		const name = personaFomContext.name;
		const desc = personaFomContext.description;
		if (!auth.token || !name || name === '' || !desc || desc === '') return;
		BackendService.postAuthenticated(auth.token, '/user/openai-persona', {
			name: name,
			notes: desc,
			instructions: personaFomContext.instructions
		}).then((res) => {
			personaFomContext.onFormReset();
		});
	}

	return <Box
		display={'flex'}
		style={{flexDirection: 'row'}}
	>
		<Box display={'flex'}
				 style={{
					 flexDirection: 'column',
					 paddingLeft: '1rem',
					 paddingRight: '1rem'
				 }} my={'1rem'}>
			<Box
				display={'flex'}
				my={'0.5rem'}
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<Box flex={1} display={'flex'}
						 style={{
							 flexDirection: 'row',
							 alignItems: 'center',
							 minWidth: '10rem'
						 }}>
					<Text c={'#fff'} opacity={0.6}>Name</Text>
					<FaRegQuestionCircle color={'#fff'} opacity={0.6}
															 style={{marginLeft: '0.25rem'}} />
				</Box>
				<Box flex={5} display={'flex'} style={{alignItems: 'center'}}>
					<Input placeholder="Name your chatbot persona." w={'100%'}
								 onChange={(e) => {
									 personaFomContext.updateName(e.target.value);
								 }} value={personaFomContext.name} />;
				</Box>
			</Box>

			<Box
				display={'flex'}
				my={'0.5rem'}
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<Box flex={1} display={'flex'}
						 style={{
							 flexDirection: 'row',
							 alignItems: 'center',
							 minWidth: '10rem'
						 }}>
					<Text c={'#fff'} opacity={0.6}>Description</Text>
					<FaRegQuestionCircle color={'#fff'} opacity={0.6}
															 style={{marginLeft: '0.25rem'}} />
				</Box>
				<Box flex={5} display={'flex'} style={{alignItems: 'center'}}>
					<Input
						placeholder='Add a description. (e.g. - "Upbeat Personality. Positive Attitude")'
						w={'100%'} onChange={(e) => {
						personaFomContext.updateDescription(e.target.value);
					}} value={personaFomContext.description} />;
				</Box>
			</Box>

			<Box
				display={'flex'}
				my={'0.5rem'}
				style={{
					flexDirection: 'row',
					alignItems: 'start'
				}}
			>
				<Box flex={1} display={'flex'}
						 style={{
							 flexDirection: 'row',
							 alignItems: 'center',
							 minWidth: '10rem'
						 }}
				>
					<Text c={'#fff'} opacity={0.6}>Instructions</Text>
					<FaRegQuestionCircle color={'#fff'} opacity={0.6}
															 style={{marginLeft: '0.25rem'}} />
				</Box>
				<Box flex={5} display={'flex'}
						 style={{alignItems: 'start', flexDirection: 'row'}}>
					<Text c={'#fff'} opacity={0.6} mr={'0.5rem'}>Click to Add</Text>
					<FaPlusCircle color={'purple'} size={24}
												onClick={personaFomContext.addInstruction} />
				</Box>
			</Box>
			{personaFomContext.instructions.map((o, i) =>
				<InstructionItem
					itemIndex={i}
					key={i}
				/>)}

			<Box
				display={'flex'}
				my={'0.5rem'}
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<Box display={'flex'}
						 style={{
							 flexDirection: 'row',
							 alignItems: 'center',
							 minWidth: '10rem'
						 }}
				>
					<Text c={'#fff'} opacity={0.3}>System Context</Text>
					<Tooltip label="Cannot be edited in current version of software.">
						<FaRegQuestionCircle color={'#fff'} opacity={0.3}
																 style={{marginLeft: '0.25rem'}} />
					</Tooltip>

				</Box>
				<Box display={'flex'} style={{alignItems: 'center', flexGrow: 1}}>
					<Input disabled={true}
								 placeholder="You will be asked something by the user, and your task is answer them."
								 w={'100%'} />;
				</Box>
			</Box>

			<Box
				display={'flex'}
				my={'0.5rem'}
				style={{
					flexDirection: 'row',
					alignItems: 'start'
				}}
			>
				<Box display={'flex'}
						 style={{
							 flexDirection: 'row',
							 alignItems: 'center',
							 minWidth: '10rem'
						 }}
				>
					<Text c={'#fff'} opacity={0.6} fw={500}>Prompt Preview</Text>
				</Box>
				<Box display={'flex'} style={{alignItems: 'center', flexGrow: 1}}>
					<Text c={'white'} opacity={0.6}
								style={{wordBreak: 'break-word'}}
								fw={400}>{personaFomContext.promptPreview}
					</Text>
				</Box>
			</Box>

			<Box
				display={'flex'}
				my={'0.5rem'}
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<Box
					style={{
						minWidth: '10rem'
					}}
				/>
				<Box display={'flex'} style={{flexDirection: 'row'}}>
					<Button
						colorScheme={'purple'}
						color={'#ffffff87'} onClick={onCreateClick}>Create</Button>
					<Button
						colorScheme={'purple'}
						variant={'outline'}
						ml={'0.5rem'} size={'md'}
						onClick={() => {
							personaFomContext.onFormReset();
						}}
					>Reset</Button>
				</Box>
			</Box>
		</Box>
		<PersonaPreview />
	</Box>;
}

export default PersonaCreate;