import Head from "next/head";

const Meta = ({ description, title }: MetaProps) => {
  return (
    <Head>
      <meta name="description" content={description} />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
