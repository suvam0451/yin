const slashCommands = [
	{
		name: 'image',
		description: 'Generate an image (Simple Settings).',
		options: [
			{
				name: 'prompt',
				description: 'prompt to use for image generation.',
				type: 3,
				required: true
			},
			{
				name: 'model',
				description: 'model to use',
				type: 3,
				choices: [
					{
						name: 'Stable Diffusion XL (👌)',
						value: 'sdxl'
					},
					{
						name: 'Stable Diffusion 1.5 (👌)',
						value: 'sd-1.5'
					},
					{
						name: 'dall-e-3 (💸🥹)',
						value: 'dall-e-3'
					},
					{
						name: 'dall-e-2 (💸🤔)',
						value: 'dall-e-2'
					}
				]
			},
			{
				name: 'size',
				description: 'size of image to generate',
				type: 3,
				choices: [
					{
						name: '256x256',
						value: '256x256'
					},
					{
						name:
							'512x512', value: '512x512'
					},
					{
						name: '1024x1024 (can\'t use with dall-e-2)', value: '1024x1024'
					}
				]
			}]
	},
	{
		name: 'help',
		description: 'About me and usage instructions.'
	}
];

export default slashCommands;