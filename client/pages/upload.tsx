import Head from 'next/head';
import React from 'react'
import { Header } from '../components';

const Upload = () => {
  return (
    <div>
      <Head>
        <title>Upload || Decentragram</title>
        <link rel="icon" href="/logo-main.png" />
      </Head>
      <Header />
    </div>
  );
}

export default Upload;