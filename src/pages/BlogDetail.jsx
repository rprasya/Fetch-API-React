import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const params = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getFetch = async () => {
      try {
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v3/articles/${params.id}`
        );

        if (!response.ok) {
          return setNotFound(true);
        }

        const request = await response.json();

        setArticle(request);
        setLoading(false);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    getFetch();
  }, [params]);

  if (notFound) {
    return <h1 className="font-bold">Article is Not Found</h1>;
  }

  return (
    <section className="text-center">
      {loading ? (
        <i>Loading Article ...</i>
      ) : (
        <article className="flex flex-col justify-center items-center gap-2">
          <h2>{article.title}</h2>
          <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
          <img src={article.imageUrl} alt={article.title} className="w-[500px]" />
          <p>{article.summary}</p>
          <p>
            Source:{" "}
            <a className="hover:text-blue-800 hover:underline" href={article.url} target="_blank" rel="noreferrer">
              {article.newsSite}
            </a>
          </p>
        </article>
      )}
    </section>
  );
};

export default BlogDetail;
