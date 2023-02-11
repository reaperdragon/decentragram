import { gql, useApolloClient } from "@apollo/client";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../components";

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
      date
      user
    }
  }
`;

interface IPost {
  id:number;
  postId:number;
  postImage:string;
  caption:string;
  date:string;
  user:string;
}

const Dashboard = () => {

  const [page, setPage] = useState<number>(0);

  const [posts, setPosts] = useState<IPost[]| undefined>();

   const clientApollo = useApolloClient();

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
        setPosts(data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clientApollo, page]);

  useEffect(() => {
    getPosts();
  }, [getPosts, page]);

  console.log(posts)

  return (
    <div className="font-body relative">
      <Head>
        <title>Decentragram</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header />

      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>
    </div>
  );
}

export default Dashboard