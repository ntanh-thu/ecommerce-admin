import multiparty from "multiparty";
import mime from "mime-types";
import * as Minio from "minio";
import { mongooseConnect } from "../../../lib/mongooes";
import { authOption, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();

  await isAdminRequest(req, res);

  // Destination bucket
  const bucket = "next-ecommerce";

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });

  const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_END_POINT,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const fileName = Date.now() + "." + ext;
    await minioClient
      .fPutObject(
        bucket,
        fileName,
        file.path,
        {
          "Content-Type": mime.lookup(file.path),
        },
        function (err, objInfo) {
          if (err) {
            return console.log(err);
          }
        }
      )
      .then((res) => {
        const link = `${process.env.MINIO_END_POINT}:${process.env.MINIO_PORT}/${bucket}/${fileName}`;
        links.push(link);
      });
  }
  return res.json({ links });
}
export const config = {
  api: { bodyParser: false },
};
