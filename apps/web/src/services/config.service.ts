export function configLazy() {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || '';
	const storageUrl = process.env.NEXT_PUBLIC_STORAGE_ENDPOINT || '';
	return {
		yin: {
			backendUrl,
			storageUrl
		}
	};
}