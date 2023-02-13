import { gql, useApolloClient } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { Header, PostContainer } from "../components";
import Head from "next/head";
const mainURL = `https://arweave.net/`;

const FETCH_POSTS = gql`
  query posts(
    $orderBy: String!
    $orderDirection: String!
    $first: Int!
    $skip: Int!
  ) {
    posts(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
    ) {
      id
      postId
      postImage
      caption
      tags
      date
      user
    }
  }
`;

interface IPost {
  id: number;
  postId: number;
  postImage: string;
  caption: string;
  date: string;
  tags: string;
  user: string;
}
const Profile = () => {
  const [page, setPage] = useState<number>(0);

  const [addr, setAddr] = useState<string | null>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  const [posts, setPosts] = useState<IPost[] | null | undefined>();

  const [selectedPost, setSelectedPost] = useState<IPost | null>();

  const clientApollo = useApolloClient();

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  const getPosts = useCallback(async () => {
    clientApollo
      .query({
        query: FETCH_POSTS,
        variables: {
          orderBy: "date",
          orderDirection: "desc",
          first: 20,
          skip: page * 20,
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        const usersPosts = data.posts.filter(
          (p: IPost) => p.user.toLowerCase() === addr!.toLowerCase()
        );

        setPosts(usersPosts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clientApollo, page,addr]);

  useEffect(() => {
    getPosts();
  }, [getPosts, page]);

  return (
    <div className="font-body relative">
      <Head>
        <title>Decentragram</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header />

      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>

      <section className="max-w-[1240px] h-[100px] mx-auto my-0 font-body">
        <h2 className="text-2xl text-center font-bold my-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 ">
          My Profile
        </h2>
      </section>

      <div>
        {posts?.length === 0 && (
          <div className="max-w-[1240px] h-[350px] mx-auto my-0 font-body">
            <h1 className="text-2xl text-center">
              You Don&apos;t Have Any Posts!
            </h1>
          </div>
        )}
      </div>

      <section className="max-w-[1440px] flex flex-col items-center justify-center my-0 mx-auto">
        <div className="gap-3 columns-3 md:columns-2 sm:columns-1 md:p-2 ">
          {posts?.length &&
            posts?.map((data) => (
              <div
                key={data.id}
                className="relative mb-3 "
                onClick={() => {
                  setSelectedPost(data);
                  setIsOpen(!isOpen);
                }}
              >
                <img
                  src={mainURL + data.postImage}
                  alt={data.tags}
                  className="w-full rounded-sm"
                />

                <div className="absolute opacity-0 p-6 backdrop-blur-sm bg-black/50 hover:opacity-100 w-full h-full left-0 bottom-0  cursor-pointer transition duration-350 ease-out hover:ease-in rounded-sm">
                  <h2 className="font-bold text-3xl my-2">View Post</h2>
                </div>
              </div>
            ))}
        </div>

        {(posts?.length as number) < 20 ? (
          <div>
            <h2 className="my-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 font-semibold">
              You&apos;ve reached end of the list{" "}
            </h2>
          </div>
        ) : (
          <div className="flex gap-8">
            <button
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-3xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-115 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
            >
              Prev
            </button>

            <button
              disabled={(posts?.length as number) < 20}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-3xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-115 hover:drop-shadow-xl hover:shadow-sky-600 my-[15px] w-fit"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {isOpen ? (
        <div className="fixed h-full w-full z-[100] top-0 left-0">
          <PostContainer toggle={toggle} selectedPost={selectedPost} />
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
