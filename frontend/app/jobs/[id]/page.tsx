"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function JobDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/jobs/" + id;

  const fetchJob = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Job not found");
      const data = await res.json();
      setJob(data);
    } catch (error) {
      console.error("Error:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchJob();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const deleteJob = async () => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    try {
      const res = await fetch(API_URL, { method: "DELETE" });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (loading) return <div className="container"><p>Loading job details...</p></div>;
  if (!job) return null;

  const categoryImages: any = {
    Plumbing: "https://images.unsplash.com/photo-1585704032915-c3400ca1f965?auto=format&fit=crop&q=80&w=1000",
    Electrical: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1000",
    Painting: "https://images.unsplash.com/photo-1589939705384-5185138a04b9?auto=format&fit=crop&q=80&w=1000",
    Joinery: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000"
  };

  return (
    <div className="container" style={{ maxWidth: '700px' }}>
      <img 
        src={categoryImages[job.category] || categoryImages.Plumbing} 
        alt={job.category} 
        className="hero-image"
      />

      <div className="header">
        <h1 className="title">{job.title}</h1>
        <Link href="/" className="btn btn-outline">Back</Link>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <p className="card-meta" style={{ marginBottom: '0.5rem' }}>Category: <strong>{job.category}</strong></p>
            <p className="card-meta">Location: <strong>{job.location}</strong></p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Status:</label>
            <select 
              value={job.status} 
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updating}
              className={`badge badge-${job.status.toLowerCase().replace(' ', '-')}`}
              style={{ width: 'auto', padding: '0.4rem' }}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Description</h3>
          <p style={{ color: '#475569', whiteSpace: 'pre-wrap' }}>{job.description}</p>
        </div>

        <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Contact Information</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}><strong>Name:</strong> {job.contactName || "Not provided"}</p>
          <p style={{ fontSize: '0.9rem' }}><strong>Email:</strong> {job.contactEmail}</p>
        </div>

        <button onClick={deleteJob} className="btn btn-danger" style={{ width: '100%' }}>
          Delete Request
        </button>
      </div>
    </div>
  );
}
