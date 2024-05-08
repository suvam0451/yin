import {z} from "zod";
import AwsService from "./aws.service";
import {successWithData} from "../routes/_utils";

export const TestImageUploadDTO = z.object({
  remoteUrl: z.string(),
});

class TestService {
  static async uploadImage(body: z.infer<typeof TestImageUploadDTO>) {
    await AwsService.uploadFileFromUrl(body.remoteUrl, "sample.jpg")
    return successWithData({})
  }
}

export default TestService