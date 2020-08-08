import React, { useState } from 'react';
import "./jobcard.css";
import JoblyApi from './HelperApi';
import companyLogo from './img/company-rectangle.png';
import Button from 'react-bootstrap/Button';
// import { Link } from "react-router-dom";

//jobCard: Child component to JobList - renders job info
function JobCard({ jobId, title, salary, equity, company, username, jobList }) {
  const [Applied, setApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  //TODO: apply to job via backend server, unapply from job. write these in ROUTES, pass down

  async function applyForJob() {
    let data = {
      state: "Applied",
      username
    }
    try {
      let response = await JoblyApi.applyForJob(jobId, data);
      console.log("this is response from applying for a job", response);
      setApplied(true);
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setIsLoading(false);
    }

  }

  function handleApply(evt) {
    evt.preventDefault();
    setIsLoading(true);
    applyForJob();
  }

  let jobIdArray = jobList.map(j => j.id);

  //add to check if you already applied to this job prior by looking at currentUser jobs (pass thru props)
  let applyButtonConditional = (jobIdArray.includes(jobId) || Applied === true) ?
    <Button variant="success" className="">Applied</Button> :
    <Button variant="dark" onClick={handleApply}>Apply Now</Button>



  return (
    <div className="job-card">
      <div >
        <img className="company-logo" src={companyLogo} alt="placeholder logo" />
      </div>

      <div className="px-3">
        <h5 className="text-left nav-font">{title}</h5>
        <p>
          {company}
        </p>
      </div>

      <div className=" px-3 text-left">
        <p className="card-font">
          <b>Salary: </b>{salary}<br/>
          <b>Equity: </b>{equity}
        </p>
      </div>

      <div className="m-auto">
        {applyButtonConditional}
      </div>


    </div>
  );


}

export default JobCard