import { Send2, CloseSquare } from "iconsax-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { truncateEthAddress } from "../utils/truncAddress";
import { toast } from "react-toastify";
import { gql, useApolloClient } from "@apollo/client";
import { ContractABI } from "../constant/ContractABI";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
import moment from "moment";
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

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

interface IComment {
  id: number;
  commentId: number;
  relatedPostId: number;
  comment: string;
  commentDate: string;
  commentedUser: string;
}

const FETCH_COMMENTS = gql`
  query comments($orderBy: String!, $orderDirection: String!) {
    comments(orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      commentId
      relatedPostId
      comment
      commentDate
      commentedUser
    }
  }
`;

const mainURL = `https://arweave.net/`;

const PostContainer = ({ toggle, selectedPost }: PostContainerProps) => {
  const [addr, setAddr] = useState<string | null>("");

  const [comments, setComments] = useState<IComment[] | undefined>();

  const [comment, setComment] = useState<string | undefined>("");

  const [loading, setLoading] = useState<boolean>(false);

  const clientApollo = useApolloClient();

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as MetaMaskInpageProvider | any
    );

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      ContractABI,
      signer
    );
    return contract;
  };

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  const handleCommentUpload = async () => {
    if (!selectedPost!.postId) {
      toast.error("This Post Don't Exist");
    } else if (comment === "") {
      toast.error("Please enter comment for post");
    } else {
      try {
        setLoading(true);
        const contract = await getContract();
        const uploadDate = String(new Date());
        console.log(selectedPost!.postId, comment, uploadDate);
        await contract.uploadComment(selectedPost!.postId, comment, uploadDate);

        setLoading(false);

        setComment("");

        toast.success(`Commented on ${selectedPost!.user} user post`);
      } catch (error) {
        console.log(error);
        toast.error(`Something went wrong!`);
      }
    }
  };

  const getComments = useCallback(async () => {
    clientApollo
      .query({
        query: FETCH_COMMENTS,
        variables: {
          orderBy: "commentDate",
          orderDirection: "desc",
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clientApollo]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className="w-full h-full  backdrop-blur-lg bg-black/50 flex items-center justify-center font-body ">
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

      <section className="grid grid-cols-2 md:grid-cols-1 max-w-full mx-auto w-full my-0 sm:grid-cols-1  gap-2  p-6 md:overflow-scroll">
        <div className="w-full h-full">
          <h4>{truncateEthAddress(selectedPost!.user)}</h4>
          <img
            src={mainURL + selectedPost!.postImage}
            alt={selectedPost!.tags}
          />
          <p>{selectedPost!.caption}</p>
        </div>

        <div className="w-full h-full">
          <h2>Comments</h2>

          {(comments?.length as number) ? (
            <div className="bg-black/50 p-5 h-[80%] md:h-[50%] sm:h-[40%] overflow-scroll rounded-md">
              {comments?.map((comment) => (
                <div key={comment.commentId} >
                  {comment.relatedPostId === selectedPost!.postId ? (
                    <div>
                      <h4 className="text-[#1E50FF]">
                        {truncateEthAddress(comment.commentedUser)}
                      </h4>
                      <h2>{comment.comment}</h2>
                      <p className="text-white/60">
                        {moment(comment.commentDate).fromNow()}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <h2>No Comments</h2>
          )}

          <div className="flex items-center justify-between">
            <input
              className="w-[90%] px-5 py-3 sm:w-[85%] rounded-xl placeholder:text-slate-400 bg-[#272D37]/60  outline-none placeholder:font-body tx font-body border-solid border-2 border-sky-700"
              placeholder="Type Here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="flex items-center justify-center bg-[#1E50FF] rounded-lg px-2 py-1 cursor-pointer transition duration-250 ease-in-out hover:scale-115 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
              onClick={handleCommentUpload}
            >
              <Send2 size="32" color="#d9e3f0" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostContainer;
