import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const submitJobApplication = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;

    const jobApplication = {
      job_id: id,
      applicant_email: user.email,
      linkedIn,
      github,
      resume,
    };

    fetch("https://job-portal-server-teal-seven.vercel.app/job-applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/myApplications')
        }
      });
  };

  return (
    <div className="hero w-full bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h2 className="text-5xl font-bold m-4">Apply now!</h2>
          <form onSubmit={submitJobApplication} className="card-body">
            <label className="label">LinkedIN</label>
            <input
              type="url"
              className="input"
              placeholder="Linkedin URL"
              name="linkedIn"
            />
            <label className="label">Github</label>
            <input
              type="url"
              className="input"
              placeholder="Github URL"
              name="github"
            />
            <label className="label">Resume</label>
            <input
              type="url"
              className="input"
              placeholder="Resume URL"
              name="resume"
            />
            <button className="btn btn-neutral mt-4">Apply</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
