import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// logic to store file
export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storage: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createBy: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("pdfFile", {
      fileId: args.fileId,
      storage: args.storage,
      fileName: args.fileName,
      fileUrl: args.fileUrl,
      createBy: args.createBy,
    });
    return "Inserted New File";
  },
});

// this will give image url
export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFile")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
      console.log(result);
      return result[0];
  },
});
