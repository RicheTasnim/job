import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth";

const Addjob = () => {

  const navigate = useNavigate();
  const {user} = useAuth();

  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const { min, max, currency, ...newJob } = initialData;
    newJob.salaryRange = { min, max, currency };
    newJob.requirements = newJob.requirements.split("\n");
    newJob.responsibilities = newJob.responsibilities.split("\n");
    console.log(newJob);

    fetch("http://localhost:5000/jobs/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job added!!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/mypostedjobs');
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl">Post a new job</h2>
      <form onSubmit={handleAddJob} className="card-body">
        <label className="label">Job title</label>
        <input
          name="title"
          type="text"
          className="input"
          placeholder="job title"
          required
        />

        <label className="label">Company Name</label>
        <input
          name="company"
          type="text"
          className="input"
          placeholder="Company Name"
          required
        />

        <label className="label">Job Location</label>
        <input
          name="location"
          type="text"
          className="input"
          placeholder="Location"
          required
        />

        <label className="label">Job Field</label>
        <select
          defaultValue="Pick a font"
          className="select select-ghost"
          required
        >
          <option disabled={true}>Select</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Intern</option>
        </select>

        <label className="label">Job Category</label>
        <select
          defaultValue="Pick a font"
          className="select select-ghost"
          required
        >
          <option disabled={true}>Select</option>
          <option>Engineering</option>
          <option>Marketing</option>
          <option>Finance</option>
        </select>

        <label className="label">Salary Range</label>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
          <div className="gap-1">
            <input
              name="min"
              type="text"
              className="input"
              placeholder="Min"
              required
            />
          </div>

          <div>
            <input
              name="max"
              type="text"
              className="input"
              placeholder="Max"
              required
            />
          </div>

          <div>
            <label className="label">Currency</label>
            <select
              name="currency"
              defaultValue="Pick a font"
              className="select select-ghost"
              required
            >
              <option>BDT</option>
              <option>INR</option>
              <option>USD</option>
            </select>
          </div>
        </div>

        <label className="label">Job Description</label>
        <textarea
          className="textarea"
          placeholder="Job Decription"
          name="description"
          required
        ></textarea>

        <label className="label">Job Requirements</label>
        <textarea
          className="textarea"
          placeholder="Job Requirements"
          name="requirements"
          required
        ></textarea>

        <label className="label">Job responsibilities</label>
        <textarea
          className="textarea"
          placeholder="Job responsibilities"
          name="responsibilities"
          required
        ></textarea>

        <label className="label">HR Name</label>
        <input
          name="hr_name"
          type="text"
          className="input"
          placeholder="HR Name"
          required
        />

        <label className="label">HR Email</label>
        <input
          name="hr_email"
          type="email"
          className="input"
          placeholder="HR Email"
          defaultValue={user?.email}
          required
        />

        <label className="label">Deadline</label>
        <input
          name="applicationDeadline"
          type="date"
          className="input"
          placeholder="Deadline"
          required
        />

        <label className="label">Company Logo</label>
        <input
          name="company_logo"
          type="url"
          className="input"
          placeholder="Company Logo"
          required
        />

        <button className="btn btn-neutral mt-4">Post Job</button>
      </form>
    </div>
  );
};

export default Addjob;
