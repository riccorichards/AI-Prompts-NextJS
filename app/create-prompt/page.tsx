"use client";

import Form from "@/components/Form";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ExtendedSession } from "../api/auth/[...nextauth]/route";

export interface PostType {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const router = useRouter();
  const session = useSession().data as ExtendedSession;
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>({ prompt: "", tag: "" });

  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newPrompt = {
      userId: session?.user?.id,
      prompt: post.prompt,
      tag: post.tag,
    };

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify(newPrompt),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
