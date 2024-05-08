import axios from "axios";
import {configLazy} from "./config";

class BackendService {
  async post(route: string, body: any) {
    const config = configLazy()
    const baseUrl = config.vercel.backendUrl
    return await axios.post(`${baseUrl}/${route}`, body)
  }
}

export default BackendService;