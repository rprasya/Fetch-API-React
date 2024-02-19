<!--  MAIN JSX -->
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);



<!-- APP JSX -->
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <>
      <div className="flex flex-col items-center w-full h-screen gap-4">
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;



<!-- BLOG PAGE -->
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(
          "https://api.spaceflightnewsapi.net/v3/articles"
        );
        const getFetch = await response.json();

        setArticles(getFetch);
        setLoading(false);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    getArticles();
  }, []);

  return (
    <section className="text-center">
      <h1>Blog</h1>
      <p>Berikut ini adalah tulisan-tulisanku</p>
      {loading && <i>Loading Articles ...</i>}
      {!loading && (
        <div>
          {articles.map((article) => {
            return (
              <section key={article.id}>
                <h2>
                  <Link to={`/blog/${article.id}`}>{article.title}</Link>
                </h2>
                <p className="font-normal">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Blog;



<!-- BLOG DETAIL -->
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const params = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v3/articles/${params.id}`
        );
        const getFetch = await response.json();

        setArticle(getFetch);
        setLoading(false);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    getArticle();
  }, [params]);

  return (
    <section>
      {loading && <i>Loading Article ...</i>}
      {!loading && (
        
        <h1>{article.title}</h1>
      )}
    </section>
  );
};

export default BlogDetail;
