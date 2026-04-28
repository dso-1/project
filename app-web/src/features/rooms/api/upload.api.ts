import { createServerFn } from '@tanstack/react-start';
import { uploadToR2, deleteFromR2 } from '@/shared/lib/r2';

export const uploadRoomImageFn = createServerFn({ method: 'POST' })
	.inputValidator(
		(data: { base64: string; fileName: string; contentType: string }) => data,
	)
	.handler(async ({ data }) => {
		const buffer = Buffer.from(data.base64, 'base64');
		const url = await uploadToR2(buffer, data.fileName, data.contentType);
		return { url };
	});

export const deleteRoomImageFn = createServerFn({ method: 'POST' })
	.inputValidator((data: { imageUrl: string }) => data)
	.handler(async ({ data }) => {
		await deleteFromR2(data.imageUrl);
		return { success: true };
	});
