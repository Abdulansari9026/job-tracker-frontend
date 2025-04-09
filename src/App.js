import React, { useEffect, useState } from 'react';
import AddJobForm from './components/AddJobForm';
import './JobTracker.css';
import { getJobs, addJob, deleteJob, updateJobStatus } from './api';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleJobAdded = async (newJob) => {
    try {
      const res = await addJob(newJob);
      setJobs(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(prev => prev.filter(job => job._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await updateJobStatus(id, newStatus);
      setJobs(prev =>
        prev.map(job => (job._id === id ? res.data : job))
      );
    } catch (err) {
      console.error("Error updating job status:", err);
    }
  };

  return (
    <div className="container">
      <h1>Student Job Tracker</h1>
      <AddJobForm onJobAdded={handleJobAdded} />

      {jobs.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        jobs.map((job) => (
          <div className="job-item" key={job._id}>
            <strong>{job.company}</strong> - {job.role} <br />
            Status:
            <select
              value={job.status}
              onChange={(e) => handleStatusUpdate(job._id, e.target.value)}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <br />
            Date: {job.appliedDate}
            <br />
            <a href={job.link} target="_blank" rel="noreferrer">Link</a>
            <br />
            <button onClick={() => handleDelete(job._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
