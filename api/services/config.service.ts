/**
 * Loan config on demand
 */
export function configLazy() {
	const openaiApiKey = process.env.OPENAI_API_KEY || '';
	const vercelBackendUrl = process.env.VERCEL_API_ENDPOINT || '';
	const jwtSecret = process.env.JWT_SECRET || '';
	const defaultContext = process.env.DEFAULT_OPENAI_CONTEXT || '';
	const prodiaApiKey = process.env.PRODIA_API_KEY || '';
	const storageBucketName = process.env.AWS_STORAGE_BUCKET_NAME || '';

	return {
		openai: {
			apiKey: openaiApiKey,
			defaultContext
		},
		vercel: {
			backendUrl: vercelBackendUrl
		},
		app: {
			jwtSecret
		},
		prodia: {
			apiKey: prodiaApiKey
		},
		aws: {
			storageBucketName
		}
	};
}