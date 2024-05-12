import aws from 'aws-sdk';
import axios from 'axios';
import {configLazy} from './config.service';

class AwsService {
	static async uploadContent(content: Buffer, filename: string) {
		const config = configLazy();
		const s3Config = {
			apiVersion: '2006-03-01',
			params: {Bucket: config.aws.storageBucketName}
		};

		// const s3 = (process.env.NODE_ENV == 'development') ? new aws.S3({
		// 	credentials: {
		// 		accessKeyId: process.env.STORAGE_AWS_ACCESS_KEY_ID || '',
		// 		secretAccessKey: process.env.STAORAGE_AWS_SECRET_KEY_SECRET || ''
		// 	},
		// 	...s3Config
		// }) : new aws.S3(s3Config);

		const uploader = new aws.S3.ManagedUpload({
			params: {
				'Bucket': config.aws.storageBucketName,
				'Key': filename,
				'Body': content,
				'ACL': 'public-read',
				ContentEncoding: 'binary',
				ContentType: 'image/jpeg'
			}
		});
		try {
			const promise = await uploader.promise();
			console.log(promise);
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * Downloads a remote file and saves it in s3
	 * @param url
	 * @param filename
	 */
	static async uploadFileFromUrl(url: string, filename: string) {
		const item = await axios.get(url, {responseType: 'arraybuffer'});
		const data = Buffer.from(item.data, 'utf8');
		await AwsService.uploadContent(data, filename);
	}
}

export default AwsService;