"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/jobs";

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const url = category ? `${API_URL}?category=${category}` : API_URL;
      const res = await fetch(url);
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
  }, [category]);

  return (
    <div className="container">
      <img
        src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000"
        alt="Tradesperson"
        className="hero-image"
      />

      <div className="header">
        <h1 className="title">Service Requests</h1>
        <Link href="/new" className="btn btn-primary">
          Post a Job
        </Link>
      </div>

      <div className="filter-section">
        <label>Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "auto" }}
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
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card">
                  <div className="badge badge-open" style={{ float: "right" }}>
                    {job.status}
                  </div>
                  <h2 className="card-title">{job.title}</h2>
                  <p className="card-meta">
                    {job.category} • {job.location}
                  </p>
                  <p style={{ color: "#475569", fontSize: "0.9rem" }}>
                    {job.description.substring(0, 100)}...
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No job requests found.</p>
          )}
        </div>
      )}
    </div>
  );
}
