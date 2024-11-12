import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
// const pdfUrl =
//   "https://keen-parakeet-4.convex.cloud/api/storage/4d60d82a-7863-4c8d-ac25-3d2d20bd9652";
// const pdfUrl11 ="https://keen-parakeet-4.convex.cloud/api/storage/1eeed6f2-86eb-4b09-8cfc-84ee80045c26"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  //load the pdf
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  //extract the text
  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });
  // splite the text into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContent]);

  // store the chunks in list
  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });
  console.log(splitterList);
  return NextResponse.json({ result: splitterList });
}
