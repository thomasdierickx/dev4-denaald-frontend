import { useState } from 'react';

const Article = ({ data }) => {
    const [comments, setComments] = useState(data.comments);

    // api url nodig
    NEXT_PUBLIC_

    return ( 
        <>
            <article>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
            </article>
        </>
     );
};

export default Article;

export const getStaticPaths = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`)
    const data = await res.json()
    
    return {
        paths: data.map((article) => ({params: {id: ''+article.id}})),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/?slug=${params.id}`)
    const data = await res.json()
  
    // Pass post data to the page via props
    return { props: { data } }
}
