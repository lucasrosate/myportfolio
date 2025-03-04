import Image from "next/image";
import SidebarTop from "@/app/components/SidebarTop";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

type Response = {
  name?: string;
  name_eng?: string;
  subtopic?: {
    subject?: string;
    htmlContent?: string;
    subject_en_us?: string;
    htmlContent_en?: string;
    imageURLs?: {
      link?: string;
      description?: string;
      type?: string;
    }[];
    languages?: string[];
    frameworks?: string[];
    githubLink?: string;
  };
};

export const fetchS3Data = async (): Promise<{data: Response | null, error: string | null}> => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  const secretKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!bucketName) throw new Error("Bucket name is missing");
  if (!region) throw new Error("AWS Region is missing");
  if (!secretKeyId) throw new Error("Access Key ID is missing");
  if (!secretAccessKey) throw new Error("Secret Access Key is missing");

  const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId: secretKeyId!,
      secretAccessKey: secretAccessKey!
    }
  });

  try {
    const cmd = new GetObjectCommand({
      Bucket: bucketName,
      Key: "MyInfos.json"
    });
    
    const res = await s3.send(cmd);
    
    const jsonString = await res.Body?.transformToString() || "{}";
    
    const jsonData = JSON.parse(jsonString) as Response;

    return {
      data: jsonData,
      error: null
    };

  } catch(err) {
    console.error("Error retrieving the S3 JSON file:", err);

    return {
      data: null,
      error: err instanceof Error ? err.message : "Error when trying to retrieve the JSON file."
    };
  }
};


export const dynamic = 'force-static';
export const revalidate = 3600;


export default async function Page() {
  const { data, error } = await fetchS3Data();

  return (
    <div className="block">
      <SidebarTop />
      
      <div className="grid w-full h-[92vh] grid-cols-8">
        <div className="w-full h-full bg-green-500 grid-col-start-1 col-end-2">
          <div>Left Bar</div>
        </div>
        
        <div className="w-full h-full bg-purple-500 col-span-7">
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
}