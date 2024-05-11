import {createContext, useContext, useEffect, useState} from 'react';

type PersonaFormContextType = {
	uuid?: string | null
	name: string
	description: string
	promptPreview: string
	instructions: string[]
	originalCopy?: {
		name: string
		description: string
		instructions: string[]
	}
	addInstruction: () => void
	removeInstruction: (index: number) => void

	updateUuid: (input: string) => void
	updateName: (input: string) => void,
	updateDescription: (input: string) => void,
	onUpdateInstructions: () => void,


	updateInstructions: (items: string[]) => void
	onFormReset: () => void

}

const defaultPersonaFormContext = {
	uuid: undefined,
	name: '',
	description: '',
	promptPreview: 'You will be asked something by the user, and your task is answer them.',
	instructions: [],
	originalCopy: {
		instructions: [],
		name: '',
		description: ''
	},
	removeInstruction: (index: number) => {
	},
	updateName: (input: string) => {
	},
	updateDescription: (input: string) => {
	},
	onUpdateInstructions: () => {
	},
	addInstruction: () => {
	},
	updateInstructions: () => {
	},
	onFormReset: () => {
	},
	updateUuid: () => {
	}
};


const PersonaFormContext
	= createContext<PersonaFormContextType>(defaultPersonaFormContext);

export function usePersonaFormContext() {
	return useContext(PersonaFormContext);
}


function WithPersonaFormContext({children}: any) {
	const [Uuid, setUuid] = useState<string | null>(null);
	const [Name, setName] = useState('');
	const [Description, setDescription] = useState('');
	const [Instructions, SetInstructions] = useState<string[]>([]);
	const [PromptText, setPromptText] = useState(
		'You will be asked something' +
		' by the user, and your task is answer them.');

	function removeInstruction(index: number) {
		SetInstructions((current: string[]) =>
			current.filter((o, i) => i !== index));
	}

	function onUpdateName(input: string) {
		setName(input);
	}

	function onUpdateDescription(input: string) {
		setDescription(input);
	}

	function onUpdateInstructions() {
		const validInstructions = Instructions.filter((o) => o !== '')
			.map((o) => {
				o = o.trim();
				o.replace(/.+$/, '');
				return o;
			});

		if (validInstructions.length === 0) {
			setPromptText(' You will be asked something' +
				' by the user, and your task is answer them.');
		} else {
			const txt = validInstructions.join('. ') + '. You will be asked' +
				' something' +
				' by the user, and your task is answer them.';
			setPromptText(txt);
		}
	}

	useEffect(() => {
		onUpdateInstructions();
	}, [Instructions.length]);

	function updateInstructions(items: string[]) {
		SetInstructions(items);
	}

	function addInstruction() {
		if (Instructions.length === 5) return;
		SetInstructions(Instructions.concat(''));
	}

	function updateUuid(input: string) {
		setUuid(input);
	}

	function onFormReset() {
		setUuid(null);
		SetInstructions([]);
		setName('');
		setDescription('');
		onUpdateInstructions();
	}

	return <PersonaFormContext.Provider value={{
		uuid: Uuid,
		name: Name,
		description: Description,
		instructions: Instructions,
		promptPreview: PromptText,
		removeInstruction,
		onUpdateInstructions,
		addInstruction,
		updateInstructions,
		onFormReset,
		updateName: onUpdateName,
		updateDescription: onUpdateDescription,
		updateUuid
	}}>
		{children}
	</PersonaFormContext.Provider>;
}

export default WithPersonaFormContext;