import {Select, Box, Text, Input, Tooltip, Divider} from '@mantine/core';
import {usePersonaFormContext} from '../../state/personaFormContext';
import {useYinAuthContext} from '../../state/authContext';
import BackendService from '../../services/backend.service';
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


export const OpenaiChatbotPersona = z.object({
	uuid: z.string(),
	name: z.string(),
	notes: z.string(),
	instructions: z.array(z.object({
		uuid: z.string(),
		text: z.string()
	}))
});

export const OpenaiChatbotPersonaBackendType = z.object({
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

function PersonaEdit() {
	const personaFormContext = usePersonaFormContext();
	const auth = useYinAuthContext();
	const [Data, setData]
		= useState<z.infer<typeof OpenaiChatbotPersona>[]>([]);
	const [searchValue, setSearchValue]
		= useState<string | null>(null);


	async function api() {
		if (!auth.token) return [];
		return BackendService.getAuthenticated<z.infer<
			typeof OpenaiChatbotPersonaBackendType>>(
			auth.token,
			`user/openai-persona`);
	}

	function personaSelected(e: any) {
		const match = Data.find((o) => o.uuid === e);
		if (!match) return;

		personaFormContext.updateUuid(match.uuid);
		personaFormContext.updateName(match.name);
		personaFormContext.updateDescription(match.notes);
		personaFormContext.updateInstructions(
			match.instructions.map((o) => o.text));
	}

	// Queries
	const {status, data, refetch} = useQuery({
		queryKey: ['user/openai-persona'],
		queryFn: api,
		enabled: auth.token !== null && auth.token !== ''
	});

	useEffect(() => {
		// @ts-ignore
		if (data?.data?.data!) {
			// @ts-ignore
			setData(data?.data?.data?.map((o) => o.openaiChatbotPersona));
		}
	}, [status, data]);

	useEffect(() => {
		if (!searchValue) return;
		personaFormContext.updateUuid(searchValue);
	}, [searchValue]);

	/**
	 * Submit changes and refetch the persona list on success
	 * */
	function onUpdateClick() {
		const uuid = personaFormContext.uuid;
		const name = personaFormContext.name;
		const desc = personaFormContext.description;
		if (!auth.token ||
			!uuid ||
			!name || name === '' || !desc || desc === '') return;

		BackendService.patchAuthenticated(auth.token, '/user/openai-persona', {
			uuid,
			name: name,
			notes: desc,
			instructions: personaFormContext.instructions
		}).then((res) => {
			console.log('update successful', res);
			refetch().then((res) => {
				console.log('refetch successful', res);
			});
		});
	}


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
						allowDeselect={false}
						placeholder="Select"
						data={Data.map((o) =>
							({value: o.uuid, label: o.name}))}
						style={{maxWidth: '16rem'}}
						onChange={(_value, option) => {
							setSearchValue(_value);
							personaSelected(_value);
						}}

						value={searchValue}
					/>
					<IoMdRefresh
						size={32} color={'#fff'} opacity={0.6}
						style={{marginLeft: '0.5rem'}}
						onClick={(e) => {
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
				BodyComponent={<Input
					placeholder="Name your chatbot persona."
					w={'100%'}
					onChange={(e) => {
						personaFormContext.updateName(e.target.value);
					}} value={personaFormContext.name} />}
			/>

			<PersonaFormField TitleComponent={<>
				<Text c={'#fff'} opacity={0.6}>Description</Text>
				<FaRegQuestionCircle color={'#fff'} opacity={0.6}
														 style={{marginLeft: '0.25rem'}} />
			</>} BodyComponent={<Input
				placeholder='Add a description. (e.g. - "Upbeat Personality. Positive Attitude")'
				w={'100%'} onChange={(e) => {
				personaFormContext.updateDescription(e.target.value);
			}} value={personaFormContext.description} />} />

			<PersonaFormField TitleComponent={<>
				<Text c={'#fff'} opacity={0.6}>Instructions</Text>
				<FaRegQuestionCircle color={'#fff'} opacity={0.6}
														 style={{marginLeft: '0.25rem'}} />
			</>} BodyComponent={<>
				<Text c={'#fff'} opacity={0.6} mr={'0.5rem'} style={{
					userSelect: 'none'
				}}>Click to Add</Text>
				<FaPlusCircle color={'purple'} size={24}
											onClick={personaFormContext.addInstruction} />
			</>} />

			{personaFormContext.instructions.map((o, i) =>
				<InstructionItem
					itemIndex={i}
					key={i}
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
				style={{wordBreak: 'break-word'}}
				c={'white'} opacity={0.6}
				fw={400}>{personaFormContext.promptPreview}</Text>} />

			<PersonaEditorFormItemContainer>
				<Box
					style={{
						minWidth: '10rem'
					}}
				/>
				<Box display={'flex'} style={{flexDirection: 'row'}}>
					<Button
						colorScheme={'purple'}
						color={'#ffffff87'}
						onClick={onUpdateClick}
					>Update</Button>
					<Button
						colorScheme={'purple'}
						variant={'outline'}
						ml={'0.5rem'} size={'md'}
						onClick={() => {
							personaFormContext.onFormReset();
						}}
					>Revert Changes</Button>
				</Box>
			</PersonaEditorFormItemContainer>
		</PersonaEditorFormContainer>
		<PersonaPreview />
	</Box>;
}

export default PersonaEdit;