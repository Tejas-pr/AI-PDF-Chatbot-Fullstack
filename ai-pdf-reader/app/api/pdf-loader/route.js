import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

console.log("above the router")
// const pdfUrl = "https://keen-parakeet-4.convex.cloud/api/storage/6ad766c4-d639-4f7d-8d0d-b23631fa716b"
export async function GET(req) {
  const reqUrl = req.url;
  console.log("in router.js")
  console.log("reqUrl", reqUrl)
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  console.log("the pdf url in route.js", pdfUrl)
  //load the pdf
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();
  // return NextResponse.json({ result: docs });
  //extract the text
  let pdfTextContent = "";
  docs.forEach(doc => {
    pdfTextContent = pdfTextContent + doc.pageContent + " ";
  });
  // splite the text into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const output = await splitter.createDocuments([pdfTextContent]);

  // store the chunks in list
  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });
  return NextResponse.json({ result: splitterList });
}
