import axios from 'axios';
import {configLazy} from './config';

class BackendService {
	static async post(route: string, body: any) {
		const config = configLazy();
		const baseUrl = config.vercel.backendUrl;
		return await axios.post(`${baseUrl}/${route}`, body);
	}

	static async postAuthenticated(token: string, route: string, body: any) {
		const config = configLazy();
		const baseUrl = config.vercel.backendUrl;
		return await axios.post(`${baseUrl}/${route}`, body, {
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	}

	static async get(route: string) {
		const config = configLazy();
		const baseUrl = config.vercel.backendUrl;
		return await axios.get(`${baseUrl}/${route}`);
	}

	static async getAuthenticated<T>(token: string, route: string) {
		const config = configLazy();
		const baseUrl = config.vercel.backendUrl;
		return await axios.get<T>(`${baseUrl}/${route}`, {
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	}
}

export default BackendService;