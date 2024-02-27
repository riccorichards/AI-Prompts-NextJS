"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import { PropsDataType } from "@/components/Feed";
import { ExtendedSession } from "../api/auth/[...nextauth]/route";

const MyProfile = () => {
  const router = useRouter();
  const session = useSession().data as ExtendedSession;

  const [myPosts, setMyPosts] = useState<PropsDataType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const response = await fetch(`/api/prompt`);
      const data = await response.json();
      console.log({ data });
      setMyPosts(data);
    };

    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id]);

  const handleEdit = (post: PropsDataType) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PropsDataType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
