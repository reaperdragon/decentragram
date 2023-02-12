import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface IPost {
  id: number;
  postId: number;
  postImage: string;
  caption: string;
  date: string;
  tags: string;
  user: string;
}

interface PostContainerProps {
  toggle: any;
  selectedPost: IPost | null | undefined;
}

const mainURL = `https://arweave.net/`;

const PostContainer = ({ toggle, selectedPost }: PostContainerProps) => {
  const [addr, setAddr] = useState<string | null>("");

  console.log(selectedPost);

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  return (
    <div
      className="w-full h-full  backdrop-blur-sm bg-black/50 flex items-center justify-center font-body "
      onClick={toggle}
    >
      <Head>
        <title>{selectedPost!.tags} </title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      PostContainer
    </div>
  );
};

export default PostContainer;
