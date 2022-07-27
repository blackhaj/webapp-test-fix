import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '~/components/';

const Books: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>Books go here</Layout>
    </div>
  );
};

export default Books;
