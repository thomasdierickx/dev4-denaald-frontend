import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Comments from "../../components/Comments.js";
import AddComment from "../../components/AddComment.js";

const Article = ({ data }) => {
    const [comments, setComments] = useState(data.comments);

    const handleSubmit = async (comment) => {
        comment.article = data.id;
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/comments/`,
            {
                method: "POST",
                body: JSON.stringify(comment),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok){
            const result = await response.json();
            const tmp = [...comments, result];
            setComments(tmp);
        }
    }

    return ( 
        <Layout>
            <>
              <h2>{data.title}</h2>
              <ReactMarkdown source={data.content} escapeHtml={false} />
              <Comments comments={comments} />
              <AddComment onSubmit={handleSubmit} />
            </>
        </Layout>
     );
};

export default Article;

export const getStaticPaths = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`)
    const data = await res.json()
    
    return {
        paths: data.map((article) => ({params: {slug: ''+article.slug}})),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/?slug=${params.slug}`)
    const data = await res.json()
  
    // Pass post data to the page via props
    return { 
        props: { 
            data: data.pop(),
        }, 
        revalidate: 1,
    }
}
