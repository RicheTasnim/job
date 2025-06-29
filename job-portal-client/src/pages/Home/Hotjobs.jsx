import React, { useEffect, useState } from "react";
import HotjobCard from "./HotjobCard";

const Hotjobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <HotjobCard key={job._id} job={job}></HotjobCard>
        ))}
      </div>
    </div>
  );
};

export default Hotjobs;
