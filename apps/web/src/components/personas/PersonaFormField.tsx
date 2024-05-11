import {Box} from '@mantine/core';
import styled from 'styled-components';
import React from 'react';

type PersonaFormFieldType = {
	TitleComponent: React.ReactNode,
	BodyComponent: React.ReactNode
}

function PersonaFormField({
	TitleComponent,
	BodyComponent
}: PersonaFormFieldType) {
	return <PersonaEditorFormItemContainer>
		<PersonaEditorFormFieldBox>
			{TitleComponent}
		</PersonaEditorFormFieldBox>
		<PersonaEditorFormValueBox>
			{BodyComponent}
		</PersonaEditorFormValueBox>
	</PersonaEditorFormItemContainer>;
}

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

export default PersonaFormField;