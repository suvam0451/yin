import {Select, Box, Text, Input, Tooltip, Divider} from '@mantine/core';
import {usePersonaFormContext} from '../../state/personaFormContext';
import {useYinAuthContext} from '../../state/authContext';
import BackendService from '../../../services/backend';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {IoMdRefresh} from 'react-icons/io';
import {z} from 'zod';
import React from 'react';

import styles from './PersonaEdit.module.css';
import styled from 'styled-components';
import {FaPlusCircle, FaRegQuestionCircle} from 'react-icons/fa';
import PersonaPreview from './PersonaPreview';
import PersonaFormField from './PersonaFormField';
import {Button} from '@chakra-ui/react';
import InstructionItem from './InstructionItem';


const OpenaiChatbotPersona = z.object({
	uuid: z.string(),
	name: z.string(),
	notes: z.string(),
	instructions: z.array(z.object({
		uuid: z.string(),
		text: z.string()
	}))
});

const OpenaiChatbotPersonaBackendType = z.object({
	data: z.array(z.object({
		openaiChatbotPersona: OpenaiChatbotPersona
	}))
});


const PersonaEditorFormContainer = styled(Box)`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const PersonaEditorFormItemContainer = styled(Box)`
    display: flex;

    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    flex-direction: row;
    align-items: center;
`;

const PersonaEditorFormFieldBox = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 10rem;
`;

const PersonaEditorFormValueBox = styled(Box)`
    flex: 5;
    display: flex;
    align-items: center;
`;

function PersonaEdit() {
	const personaFomContext = usePersonaFormContext();
	const auth = useYinAuthContext();
	const [Data, setData]
		= useState<z.infer<typeof OpenaiChatbotPersona>[]>([]);

	async function api() {
		if (!auth.token) return {data: []};

		return BackendService.getAuthenticated<z.infer<typeof OpenaiChatbotPersonaBackendType>>(
			auth.token,
			`user/openai-persona`);
	}

	function personaSelected(e: any) {
		console.log(e);
	}


	// Queries
	const {status, data, refetch} = useQuery({
		queryKey: ['user/openai-persona'],
		queryFn: api
	});

	useEffect(() => {

		// @ts-ignore
		if (data?.data?.data!) {
			// @ts-ignore
			setData(data?.data?.data?.map((o) => o.openaiChatbotPersona));
		}
	}, [status, data]);

	return <Box
		display={'flex'}
		style={{
			minWidth: '100%'
		}}
	>
		<PersonaEditorFormContainer>
			<PersonaFormField
				TitleComponent={
					<Text c={'#fff'} opacity={0.6}>Select Persona</Text>
				}
				BodyComponent={<React.Fragment>
					<Select
						classNames={{
							option: styles.option
						}}
						placeholder="Select"
						data={Data.map((o) =>
							({value: o.uuid, label: o.name}))}
						style={{maxWidth: '16rem'}}
						onSelect={personaSelected}
					/>
					<IoMdRefresh size={32} color={'#fff'} opacity={0.6} onClick={(e) => {
						refetch().then((res) => {
							console.log(res);
						});
					}} />
				</React.Fragment>}
			/>

			<Divider color={'#ffffff30'} mt={'1rem'} mb={'1rem'} />

			<PersonaFormField
				TitleComponent={<React.Fragment>
					<Text c={'#fff'} opacity={0.6}>Name</Text>
					<FaRegQuestionCircle color={'#fff'} opacity={0.6}
															 style={{marginLeft: '0.25rem'}} />
				</React.Fragment>}
				BodyComponent={<Input placeholder="Name your chatbot persona."
															w={'100%'}
															onChange={(e) => {
																personaFomContext.updateName(e.target.value);
															}} value={personaFomContext.name} />}
			/>

			<PersonaFormField TitleComponent={<>
				<Text c={'#fff'} opacity={0.6}>Description</Text>
				<FaRegQuestionCircle color={'#fff'} opacity={0.6}
														 style={{marginLeft: '0.25rem'}} />
			</>} BodyComponent={<Input
				placeholder='Add a description. (e.g. - "Upbeat Personality. Positive Attitude")'
				w={'100%'} onChange={(e) => {
				personaFomContext.updateDescription(e.target.value);
			}} value={personaFomContext.description} />} />

			<PersonaFormField TitleComponent={<>
				<Text c={'#fff'} opacity={0.6}>Instructions</Text>
				<FaRegQuestionCircle color={'#fff'} opacity={0.6}
														 style={{marginLeft: '0.25rem'}} />
			</>} BodyComponent={<>
				<Text c={'#fff'} opacity={0.6} mr={'0.5rem'} style={{
					userSelect: 'none'
				}}>Click to Add</Text>
				<FaPlusCircle color={'purple'} size={24}
											onClick={personaFomContext.addInstruction} />
			</>} />

			{personaFomContext.instructions.map((o, i) =>
				<InstructionItem
					index={i}
				/>)}

			<PersonaFormField TitleComponent={<>
				<Text c={'#fff'} opacity={0.3}>System Context</Text>
				<Tooltip label="Cannot be edited in current version of software.">
					<FaRegQuestionCircle color={'#fff'} opacity={0.3}
															 style={{marginLeft: '0.25rem'}} />
				</Tooltip>
			</>} BodyComponent={<Input disabled={true}
																 placeholder="You will be asked something by the user, and your task is answer them."
																 w={'100%'} />} />

			<PersonaFormField TitleComponent={
				<Text c={'#fff'} opacity={0.6} fw={500}>Prompt
					Preview</Text>
			} BodyComponent={<Text
				c={'white'} opacity={0.6}
				fw={400}>{personaFomContext.promptPreview}</Text>} />

			<PersonaEditorFormItemContainer>
				<Box
					style={{
						minWidth: '10rem'
					}}
				/>
				<Box display={'flex'} style={{flexDirection: 'row'}}>
					<Button
						colorScheme={'purple'}
						color={'#ffffff87'}>Update</Button>
					<Button
						colorScheme={'purple'}
						variant={'outline'}
						ml={'0.5rem'} size={'md'}
						onClick={() => {
							personaFomContext.onFormReset();
						}}
					>Revert Changes</Button>
				</Box>
			</PersonaEditorFormItemContainer>
		</PersonaEditorFormContainer>
		<PersonaPreview />
	</Box>;
}

export default PersonaEdit;