"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let baseUrl = process.env.NEXT_PUBLIC_API_URL + "/api/jobs";

      if (token) {
        baseUrl += "/myposts";
      }

      const url = category ? `${baseUrl}?category=${category}` : baseUrl;

      const headers: any = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(url, { headers });
      const data = await res.json();
      setJobs(data.allJobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCategory("");
  };

  return (
    <div className="container">
      <div className="splash">
        <div className="splash-content">
          <h1 className="splash-title">
            Find the Right Professional for Your Job
          </h1>
          <p className="splash-subtitle">
            Connect with trusted tradespeople in your area quickly and easily.
          </p>
          {!isLoggedIn ? (
            <div className={styles.buttonGroup}>
              <Link
                href="/login"
                className={`btn btn-primary ${styles.heroBtn}`}
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className={styles.buttonGroup}>
              <Link
                href="/new"
                className={`btn btn-primary ${styles.heroBtn}`}
              >
                Post a Job
              </Link>
              <button
                onClick={handleLogout}
                className={`btn btn-outline ${styles.logoutBtn}`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="header">
        <h2 className="title">
          {isLoggedIn ? "My Job Posts" : "Recent Service Requests"}
        </h2>
        {isLoggedIn && (
          <Link href="/new" className="btn btn-primary">
            Post a Job
          </Link>
        )}
      </div>

      <div className="filter-section">
        <label>Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Painting">Painting</option>
          <option value="Joinery">Joinery</option>
        </select>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="card-grid">
          {jobs.length > 0 ? (
            jobs.map((job: any) => (
              <Link
                href={`/jobs/${job._id}`}
                key={job._id}
                className={styles.cardLink}
              >
                <div className="card">
                  <div
                    className={`badge badge-${job.status.toLowerCase().replace(" ", "-")} ${styles.badgeFloat}`}
                  >
                    {job.status}
                  </div>
                  <h2 className="card-title">{job.title}</h2>
                  <p className="card-meta">
                    {job.category} • {job.location}
                  </p>
                  <p className={styles.cardDescription}>
                    {job.description.substring(0, 100)}...
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>
              {isLoggedIn
                ? "You haven't posted any jobs yet."
                : "No job requests found."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
