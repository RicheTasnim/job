import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotjobCard = ({ job }) => {
  const {
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
    _id,
  } = job;
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="flex gap-2 m-2">
        <figure>
          <img className="w-14" src={company_logo} alt="Shoes" />
        </figure>
        <div>
          <h4 className="text-2xl">{company}</h4>
          <p className="flex gap-1 items-center">
            <FaMapMarkerAlt />
            {location}
          </p>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{description}</p>
        <div className="flex gap-2 flex-wrap">
          {requirements.map((skill) => (
            <p
              skill={skill}
              className="border rounded-md text-center px-2 hover:text-blue-600 hover:bg-gray-300"
            >
              {skill}
            </p>
          ))}
        </div>
        <div className="card-actions justify-end items-center">
            <p>Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currancy} </p>
          <Link to={`/jobs/${_id}`}>
          <button className="btn btn-primary">Apply</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotjobCard;
