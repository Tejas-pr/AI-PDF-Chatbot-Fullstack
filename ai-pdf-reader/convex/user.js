import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// write mutation
export const createUser = mutation({
  args: {
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // if user ex
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    // if user not ex
    if (user?.length == 0) {
      await ctx.db.insert("users", {
        email: args.email,
        userName: args.userName,
        imageUrl: args.imageUrl,
        upgrade: false,
      });
      return "Inserted New User";
    }
    return "User Already Exists";
  },
});

export const userUpgradePlan = mutation({
  args: {
    useEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.useEmail))
      .collect()
      
      if(result){
        await ctx.db.patch(result[0]._id, { upgrade: true });
        return "Plan upgraded successfully";
      }
      return "User not found";
  },
});

export const GetUserInfo = query({
  args: {
    useEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if(!args?.useEmail){
      return ;
    }
    const result = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args?.useEmail))
      .collect();
    return result;
  },
});