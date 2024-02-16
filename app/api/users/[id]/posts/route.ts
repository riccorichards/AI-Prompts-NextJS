import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id })
      .populate("creator")
      .lean();

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
