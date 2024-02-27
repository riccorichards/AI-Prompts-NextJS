import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    console.log({ prompts, note: "Server" });

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
