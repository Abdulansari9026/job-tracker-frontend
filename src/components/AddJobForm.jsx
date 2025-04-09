import React, { useState } from 'react';

const AddJobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    link: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    onJobAdded(data);
    setFormData({ company: '', role: '', status: 'Applied', appliedDate: '', link: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input type="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange} required />
      <input name="link" placeholder="Application Link" value={formData.link} onChange={handleChange} required />
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJobForm;
