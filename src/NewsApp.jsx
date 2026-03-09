import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import "./NewsApp.css";

const API_KEY = "2vevzK3toywZ-RfjPw_EAZEsUTlJ5rC4mVB_XY6prlTThity";
const FALLBACK_IMAGE =
  "https://placehold.co/600x400/1e293b/94a3b8?text=No+Image";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SkeletonCard() {
  return (
    <div className="card-body skeleton">
      <div className="skeleton-img" />
      <div className="card-content-wrapper">
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line medium" />
      </div>
    </div>
  );
}

function NewsApp() {
  const [category, setCategory] = useState("home");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const url =
          category === "home"
            ? `https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}`
            : `https://api.currentsapi.services/v1/latest-news?category=${category}&apiKey=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch news.`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [category]);

  const categoryLabel =
    category === "home" ? "Top Stories" : category.charAt(0).toUpperCase() + category.slice(1) + " News";

  return (
    <>
      <Navbar changeCategory={setCategory} activeCategory={category} />

      <header className="hero">
        <div className="hero-inner">
          <span className="hero-badge">⚡ Live Updates</span>
          <h1>
            Your Daily <span className="highlight">News Hub</span>
          </h1>
          <p className="hero-sub">
            Stay informed with breaking news across every category — fast,
            reliable, and always up to date.
          </p>
        </div>
      </header>

      <main className="container">
        <div className="section-header">
          <h2 className="section-title">{categoryLabel}</h2>
          {!loading && !error && data?.news && (
            <span className="article-count">{data.news.length} articles</span>
          )}
        </div>

        {error && (
          <div className="error-state">
            <p>⚠️ {error}</p>
            <button onClick={() => setCategory((c) => c)}>Retry</button>
          </div>
        )}

        <div className="cards-container">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : data?.news?.map((article, index) => (
                <div key={index} className="card-body">
                  <div className="card-img-wrapper">
                    <img
                      src={
                        article.image && article.image !== "None"
                          ? article.image
                          : FALLBACK_IMAGE
                      }
                      alt={article.title}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                    {article.category?.[0] && (
                      <span className="card-category-badge">
                        {article.category[0]}
                      </span>
                    )}
                  </div>

                  <div className="card-content-wrapper">
                    <div className="card-meta">
                      <span className="card-author">
                        {article.author
                          ? article.author.length > 22
                            ? article.author.slice(0, 22) + "…"
                            : article.author
                          : "Unknown"}
                      </span>
                      <span className="card-date">
                        {formatDate(article.published)}
                      </span>
                    </div>

                    <h3 className="card-title">
                      {article.title.length > 90
                        ? article.title.slice(0, 90) + "…"
                        : article.title}
                    </h3>

                    <p className="card-description">
                      {article.description && article.description !== "N/A"
                        ? article.description.slice(0, 140) + "…"
                        : "No description available for this article."}
                    </p>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more"
                    >
                      Read Full Story →
                    </a>
                  </div>
                </div>
              ))}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">⚡ Blitz News</div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Blitz News · Powered by{" "}
            <a
              href="https://currentsapi.services"
              target="_blank"
              rel="noopener noreferrer"
            >
              Currents API
            </a>
          </p>
          <p className="footer-credit">Built with React &amp; Vite</p>
        </div>
      </footer>
    </>
  );
}

export default NewsApp;