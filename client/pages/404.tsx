import { ArrowCircleLeft } from "iconsax-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Error = () => {
  const router = useRouter();
  return (
    <div className="font-body relative overflow-hidden">
      <Head>
        <title>Error 404 || Decentragram</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full -z-10"></div>

      <div className="w-[705px] h-[405px] absolute right-[-353px] bottom-[-198px] bg-blue-800/50 blur-[150px] rounded-full -z-10"></div>

      <section className="h-screen flex items-center justify-center flex-col gap-5  motion">
        <h1 className="text-8xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 ">
          404
        </h1>
        <p className="text-xl font-semibold text-white/70">
          The Page You&apos;re Looking For Is not Exist or Removed From The
          Site.
        </p>
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-3 text-lg px-[25px] py-[15px] bg-[#1E50FF] outline-none border-none  rounded-3xl font-body cursor-pointer transition duration-250 ease hover:scale-115 hover:shadow-sky-900 hover:-translate-y-2 my-[15px] w-fit"
        >
          {" "}
          <ArrowCircleLeft size="32" color="#d9e3f0" /> Go Back
        </button>
      </section>
    </div>
  );
};

export default Error;