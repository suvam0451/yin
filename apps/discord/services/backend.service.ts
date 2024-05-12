import {configLazy} from './config.service';
import axios from 'axios';

class VercelBackend {
	static async get(path: string) {
		const config = configLazy();
		const baseUrl = config.yin.backendUrl;
		try {
			return (await axios.get(`${baseUrl}${path}`)).data;
		} catch (e) {
			// console.log(e);
			return null;
		}
	}

	static async post(path: string, body: any) {
		const config = configLazy();
		const baseUrl = config.yin.backendUrl;
		try {
			return (await axios.post(`${baseUrl}${path}`, body)).data;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default VercelBackend;