import { WebBundlr } from "@bundlr-network/client";
import BigNumber from "bignumber.js";
import { providers, utils } from "ethers";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const BundlrContext = createContext({
  initialiseBundlr: async () => {},
  fundWallet: (_: number) => {},
  balance: "",
  uploadFile: async (_file: any) => {},
  bundlrInstance: null,
});

const BundlrContextProvider = ({ children }: any): JSX.Element => {
  const [bundlrInstance, setBundlrInstance] = useState<WebBundlr>();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    if (bundlrInstance) {
      fetchBalance();
    }
  }, [bundlrInstance]);

  const initialiseBundlr = async () => {
   const provider = new providers.Web3Provider(window.ethereum as any);
    await provider._ready();
    const bundlr = new WebBundlr(
      "https://devnet.bundlr.network",
      "matic",
      provider,
      {
        providerUrl: process.env.NEXT_PUBLIC_RPC_URL,
      }
    );
    await bundlr.ready();
    setBundlrInstance(bundlr);
  };

  async function fundWallet(amount: number) {
    console.log(amount);
    try {
      if (bundlrInstance) {
        console.log(bundlrInstance);
        if (!amount) return;
        const amountParsed = parseInput(amount);
        console.log(amountParsed);
        if (amountParsed) {
          toast.info("Adding funds please wait", { progress: 1 });
          console.log("Adding...");
          let response = await bundlrInstance.fund(amountParsed);
          console.log("Wallet funded: ", response);
          toast.success("Funds added", { progress: 1 });
        }
        fetchBalance();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    }
  }

  function parseInput(input: number) {
    const conv = new BigNumber(input).multipliedBy(
      bundlrInstance!.currencyConfig.base[1]
    );
    if (conv.isLessThan(1)) {
      console.log("error: value too small");
      toast.error("Error: value too small");
      return;
    } else {
      return conv;
    }
  }

  async function fetchBalance() {
    if (bundlrInstance) {
      const bal = await bundlrInstance.getLoadedBalance();
      console.log("bal: ", utils.formatEther(bal.toString()));
      setBalance(utils.formatEther(bal.toString()));
    }
  }

  async function uploadFile(file: any) {
    try {
      console.log(file);
      let tx = await bundlrInstance!.uploader.upload(file, [
        {
          name: "Content-Type",
          value:
            "image/png" ||
            "image/jpeg" ||
            "image/jpg" ||
            "image/gif" ||
            "image/tiff",
        },
      ]);
      return tx;
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <BundlrContext.Provider
      value={{
        initialiseBundlr,
        fundWallet,
        balance,
        uploadFile,
        bundlrInstance,
      }}
    >
      {children}
    </BundlrContext.Provider>
  );
};

export default BundlrContextProvider;

export const useBundler = () => {
  return useContext(BundlrContext);
};
