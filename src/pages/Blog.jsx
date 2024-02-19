import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFetch = async () => {
      try {
        const response = await fetch(
          "https://api.spaceflightnewsapi.net/v3/articles"
        );
        const request = await response.json();

        setArticles(request);
        setLoading(false);
        console.log(request);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    getFetch();
  }, []);

  return (
    <section className="text-center">
      <h1 className="font-bold text-2xl my-3">Blog</h1>
      <p className="mb-3">Berikut ini adalah tulisan-tulisanku :</p>
      {loading ? (
        <i>Loading Articles ...</i>
      ) : (
        <div>
          {articles.map((article) => {
            return (
              <section key={article.id} className="mb-3">
                <h2 className="text-black hover:underline">
                  <Link to={`/blog/${article.id}`}>{article.title}</Link>
                </h2>
                <time>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </time>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Blog;
