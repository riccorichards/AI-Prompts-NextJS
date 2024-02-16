import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (request: Request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    const response = new Response(JSON.stringify(newPrompt), { status: 201 });

    return response;
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
