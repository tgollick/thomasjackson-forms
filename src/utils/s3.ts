import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function generateUploadURL(key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    // Optionally, add ContentType restrictions or metadata here
  });
  // The URL expires in 5 minutes (300 seconds)
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  return uploadUrl;
}

export async function generateDownloadURL(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  // The URL expires in 5 minutes (300 seconds)
  const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  return downloadUrl;
}
