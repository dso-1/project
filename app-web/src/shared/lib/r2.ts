import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'go-reserve';

function getR2Client() {
	if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
		throw new Error('R2 credentials not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in .env');
	}

	return new S3Client({
		region: 'auto',
		endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: R2_ACCESS_KEY_ID,
			secretAccessKey: R2_SECRET_ACCESS_KEY,
		},
	});
}

export async function uploadToR2(
	fileBuffer: Buffer,
	fileName: string,
	contentType: string,
): Promise<string> {
	const client = getR2Client();
	const key = `rooms/${Date.now()}-${fileName}`;

	await client.send(
		new PutObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: key,
			Body: fileBuffer,
			ContentType: contentType,
		}),
	);

	// Return the public URL using S3_API from .env
	const publicUrl = process.env.S3_API;
	return `${publicUrl}/${key}`;
}

export async function deleteFromR2(imageUrl: string): Promise<void> {
	const client = getR2Client();
	const publicUrl = process.env.S3_API;

	if (!publicUrl || !imageUrl.startsWith(publicUrl)) {
		return;
	}

	const key = imageUrl.replace(`${publicUrl}/`, '');

	await client.send(
		new DeleteObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: key,
		}),
	);
}
