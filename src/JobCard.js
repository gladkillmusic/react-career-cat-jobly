import React, { useState, useEffect } from 'react';
import "./jobcard.css";
import JoblyApi from './HelperApi';
import companyLogo from './img/company-rectangle.png';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from './LoadingSpinner';

//jobCard: Child component to JobList - renders job info
function JobCard({ jobId, title, salary, equity, company, username, isApplied }) {
  const [Applied, setApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);


  useEffect(function apply(){

    async function applyForJob() {
      let data = {
        state: "Applied",
        username
      }
      setIsLoading(true);
  
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
  
    if(isApplying){
      applyForJob();
      setIsApplying(false);
    }

  
  },[isApplying, jobId, username])


  function handleApply(evt) {
    evt.preventDefault();
    setIsApplying(true);
  }


  

  //add to check if you already applied to this job prior by looking at currentUser jobs (pass thru props)
  let applyButtonConditional = (isApplied || Applied === true) ?
    <Button size="sm" variant="success">Applied</Button> :
    <Button size="sm" variant="dark" onClick={handleApply}>Apply Now</Button>

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="job-card">
      <div >
        <img className="company-logo" src={companyLogo} alt="placeholder logo" />
      </div>

      <div className="px-3">
        <h5 className="text-left nav-font">{title}</h5>
        <p className="text-left nav-font">
          {company}
        </p>
      </div>

      <div className=" px-3 text-left">
        <p className="card-font">
          <b>Salary: </b>{salary}<br />
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