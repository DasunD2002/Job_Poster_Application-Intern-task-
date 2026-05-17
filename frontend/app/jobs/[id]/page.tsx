"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function JobDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/jobs/" + id;

  const fetchJob = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers: any = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(API_URL, { headers });
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
      const token = localStorage.getItem("token");
      const headers: any = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus }),
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
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete this request.");
      router.push("/login");
      return;
    }

    if (!confirm("Are you sure you want to delete this request?")) return;

    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        router.push("/");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (loading)
    return (
      <div className="container">
        <p>Loading job details...</p>
      </div>
    );
  if (!job) return null;

  return (
    <div className={`container ${styles.detailsContainer}`}>
      <div className="header">
        <h1 className="title">{job.title}</h1>
        <Link href="/" className="btn btn-outline">
          Back
        </Link>
      </div>

      <div className="card">
        <div className={styles.metaHeader}>
          <div>
            <p className={`card-meta ${styles.metaCategory}`}>
              Category: <strong>{job.category}</strong>
            </p>
            <p className="card-meta">
              Location: <strong>{job.location}</strong>
            </p>
          </div>
          <div>
            <label className={styles.statusLabel}>Status:</label>
            <select
              value={job.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updating}
              className={`badge badge-${job.status.toLowerCase().replace(" ", "-")} ${styles.statusSelect}`}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Description</h3>
          <p className={styles.descriptionText}>{job.description}</p>
        </div>

        <div className={styles.contactBox}>
          <h3 className={styles.contactTitle}>Contact Information</h3>
          <p className={styles.contactTextSpaced}>
            <strong>Name:</strong> {job.contactName || "Not provided"}
          </p>
          <p className={styles.contactText}>
            <strong>Email:</strong> {job.contactEmail}
          </p>
        </div>

        <button
          onClick={deleteJob}
          className={`btn btn-danger ${styles.deleteBtn}`}
        >
          Delete Request
        </button>
      </div>
    </div>
  );
}
