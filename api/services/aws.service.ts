import aws from "aws-sdk";
import stream from 'stream'
import axios from 'axios';

class AwsService {
  static async uploadContent(content: Buffer, filename: string) {
    const s3Config = {
      apiVersion: "2006-03-01",
      params: {Bucket: "yin-storage-dev"},
    }

    const s3 = (process.env.NODE_ENV == "development") ?
        new aws.S3({
          credentials: {
            accessKeyId: process.env.STORAGE_AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.STAORAGE_AWS_SECRET_KEY_SECRET || "",
          },
          ...s3Config
        })
        : new aws.S3(s3Config)

    const uploader = new aws.S3.ManagedUpload({
      params: {
        "Bucket": "yin-storage-dev",
        "Key": filename,
        "Body": content,
        "ACL": "public-read",
        ContentEncoding: 'binary',
        ContentType: "image/jpeg"
      }
    })
    const promise = uploader.promise();
    promise.then((data) => {
      console.log("success")
    }).catch((err) => {
      console.log("error")
    });
  }

  static async uploadFileFromUrl(url: string, filename: string) {
    const item = await axios.get(encodeURI(url), {responseType: "arraybuffer"});
    const data = Buffer.from(item.data, 'utf8')
    await AwsService.uploadContent(data, filename);
  }
}

export default AwsService;