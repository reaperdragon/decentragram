import { Send2, CloseSquare } from "iconsax-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { truncateEthAddress } from "../utils/truncAddress";

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
    <div className="w-full h-full  backdrop-blur-sm bg-black/50 flex items-center justify-center font-body ">
      <Head>
        <title>{selectedPost!.tags} </title>
        <link rel="icon" href="/logo-main.png" />
      </Head>

      <div
        className="absolute sm:top-[20px] sm:right-[20px] ssm:top-[20px] right-[20px] top-[20px] z-[999] backdrop-blur-lg bg-white/30 p-3 rounded-lg cursor-pointer "
        onClick={toggle}
      >
        <CloseSquare size="32" color="#d9e3f0" />
      </div>

      <section className="grid grid-cols-2 md:grid-cols-1 max-w-full mx-auto w-full my-0 sm:grid-cols-1  gap-2  p-6">
        <div className="w-full">
          <h4>{truncateEthAddress(selectedPost!.user)}</h4>
          <img
            src={mainURL + selectedPost!.postImage}
            alt={selectedPost!.tags}
          />
          <p>{selectedPost!.caption}</p>
        </div>

        <div className="w-full">
          <h2>Comments</h2>
          {
            // no comments
          }

          <div className="flex items-center justify-between">
            <input
              className="w-[90%] px-5 py-3 sm:w-[85%] rounded-xl placeholder:text-slate-400 bg-[#272D37]/60  outline-none placeholder:font-body tx font-body border-solid border-2 border-sky-700"
              placeholder="Type Here..."
            />

            <button className="flex items-center justify-center bg-[#1E50FF] rounded-lg px-2 py-1 cursor-pointer transition duration-250 ease-in-out hover:scale-115 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit">
              <Send2 size="32" color="#d9e3f0" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostContainer;
