import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  console.log("pdfUrl : ----------", pdfUrl);
  //load the pdf
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  //extract the text
  let pdfTextContent = "";
  docs.forEach(doc => {
    pdfTextContent = pdfTextContent + doc.pageContent + " ";
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
  return NextResponse.json({ result: splitterList });
}
