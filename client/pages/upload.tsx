import Head from "next/head";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FundWallet, Header } from "../components";
import { ethers } from "ethers";
import { useBundler } from "../context/bundlrContext";
import { ContractABI } from "../constant/ContractABI";
import { useRouter } from "next/router";
import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface ImageDetail {
  image: any;
  tag: string;
  caption: string;
}

const Upload = () => {
  const [imageDetails, setImageDetails] = useState<ImageDetail>({
    image: "",
    tag: "Quotes",
    caption: "",
  });

  const router = useRouter();

  const { initialiseBundlr, bundlrInstance, balance, uploadFile } =
    useBundler();

  const [file, setFile] = useState<Buffer>();

  const [loading, setLoading] = useState<boolean>(false);

  const dataRef = useRef<any>();

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      ContractABI,
      signer
    );
    return contract;
  };

  function triggerOnChange() {
    dataRef!.current!.click();
  }

  async function handleFileChange(e: any) {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setImageDetails({ ...imageDetails, image: uploadedFile });
    let reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        setFile(Buffer.from(reader.result as any));
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  }

  const handleUpload = async () => {
    const { image, tag, caption } = imageDetails;

    if (!image) {
      toast.error("Please Select an Image for Post");
    } else if (!tag) {
      toast.error("Please Select a Tag for Post");
    } else if (!caption) {
      toast.error("Please Select a Description for Post");
    } else {
      setLoading(true);
      const url = await uploadFile(file);
      upload(url.data.id);
      
    }
  };

  const upload = async (imgURL: string) => {
    try {
      const contract = await getContract();
      
      const uploadDate = String(new Date());
      
      await contract.uploadPost(
        imgURL,
        imageDetails.caption,
        imageDetails.tag,
        uploadDate
      );

      setLoading(false);

      setImageDetails({
        image: "",
        tag: "",
        caption: "",
      });

      setFile(undefined);

      toast.success("Post Uploaded Successfully");

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Not Posted");
    }
  };

  if (!bundlrInstance) {
    return (
      <div className="justify-center items-center h-screen flex font-body flex-col">
        <Head>
          <title>Decentragram || Initialize Bundlr</title>
          <link rel="icon" href="/logo-main.png" />
        </Head>
        <h3 className="text-4xl font-bold sm:text-xl">
          Let&apos;s initialise Bundlr now 💱
        </h3>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-full text-sm px-8 py-5 text-center mr-2 mb-2 transition-all ease-in-out delay-150 duration-150
            hover:translate-y-1 text-1xl hover:shadow-lg hover:shadow-blue-500/80 mt-2 cursor-pointer outline-none border-none"
          onClick={initialiseBundlr}
        >
          Initialise Bundlr 💸
        </button>
      </div>
    );
  }

  if (
    !balance ||
    (Number(balance) <= 0 && !balance) ||
    Number(balance) <= 0.06
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <Head>
          <title>Decentragram || Add Funds</title>
          <link rel="icon" href="/logo-main.png" />
        </Head>
        <h3 className="text-4xl font-body text-center">
          Oops! Before Uploading Post Please Add Some Funds.🪙
        </h3>
        <FundWallet />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Upload || Decentragram</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      <Header />
      <div className="w-[705px] h-[405px] absolute left-[-353px] top-[-198px] bg-blue-800/50 blur-[150px] rounded-full"></div>

      <div>
        <section className="max-w-[1240px] h-screen my-0 mx-auto grid grid-cols-2 items-center justify-center gap-8 md:order-second md:grid-cols-1 p-6 ">
          <div
            className="w-full bg-[#272D37]/60 rounded-3xl sm:h-[350px] h-[589px] border border-solid border-sky-700 cursor-pointer"
            onClick={triggerOnChange}
          >
            <input
              id="selectImage"
              style={{ display: "none" }}
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              onChange={handleFileChange}
              ref={dataRef}
            />
            {imageDetails.image ? (
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={window.URL.createObjectURL(imageDetails.image)}
                  alt="image"
                  ref={imageDetails.image}
                  className="w-full h-full  sm:h-[350px] rounded-3xl p-2"
                />
              </div>
            ) : (
              <div className="h-full  flex justify-center items-center flex-col gap-2">
                <h2 className="text-center font-body">
                  Please Select Image for For Post
                </h2>
                <h4 className="font-body">Max Size 100MB</h4>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col font-body gap-5">
            <div className="flex flex-col">
              <label className="text-2xl my-1 font-semibold">Tag</label>
              <select
                value={imageDetails.tag}
                onChange={(e) =>
                  setImageDetails({ ...imageDetails, tag: e.target.value })
                }
                name="category"
                className="px-5 py-3 rounded-xl
               placeholder:text-slate-400 outline-none border-none  bg-[#272D37]/60 placeholder:font-body font-body"
              >
                <option>Quotes</option>
                <option>Education</option>
                <option>Background</option>
                <option>Athletic</option>
                <option>People</option>
                <option>Street Photography</option>
                <option>Nature</option>
                <option>Food & Drinks</option>
                <option>Architecture & Interior</option>
                <option>Fashion & Beauty</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-2xl my-1 font-semibold">Caption</label>
              <textarea
                placeholder="Caption Here..."
                className="px-5 py-3 rounded-xl placeholder:text-slate-400 bg-[#272D37]/60 border-none outline-none placeholder:font-body tx font-body"
                value={imageDetails.caption}
                onChange={(e) =>
                  setImageDetails({
                    ...imageDetails,
                    caption: e.target.value,
                  })
                }
                rows={14}
              />
            </div>

            <button
              type="button"
              className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out  hover:drop-shadow-xl hover:shadow-sky-600 w-auto focus:scale-90 sm:mb-10 md:mb-10"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Upload"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Upload;
