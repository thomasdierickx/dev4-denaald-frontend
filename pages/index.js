import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ data }) {
  return (
    <Layout>
      <p>{process.env.NEXT_PUBLIC_DEMO}</p>
      <div className={styles.grid}>
        {data.map((article) => (
          <a key={article.id} href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/?id=${article.id}`} className={styles.card}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </a>
        ))}
      </div>
    </Layout>
  );
}
export const getStaticProps = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`);
  const data = await resp.json();

  return {
    props: {
      data,
    },
  };
};
