import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = "AIzaSyCiaa5W0328n9DecOiAnf_QgLDGeMpWQYU";
    await ConvexVectorStore.fromTexts(
      args.splitText, // array
      args.fileId, // string
      new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // convert the input text and need to match with db vector to get the answer
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const resultOne = (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter((q) => q.metadata.fileId == args.fileId);
    return JSON.stringify(resultOne);
  },
});
