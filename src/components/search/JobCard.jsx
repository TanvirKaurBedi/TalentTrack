import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import "./style.css";
import { useEffect, useState } from "react";
import {
  CardActions,
  CardContent,
  Chip,
  Typography,
  Button,
} from "@mui/material";

const JobCard = () => {
  const [jobListing, setJobListing] = useState([]);
  const [page, setPage] = useState(0);

  // Infine Scrolling
  async function handleInfiniteScroll() {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    getListOfJobs();
  }, [page]);
  function getListOfJobs() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset:page,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        setJobListing((prevData)=>[...prevData,...result.jdList]);
      })
      .catch((error) => console.error(error));
  }
  return (
    <>
      <div className=" job_card_wrapper">
        {jobListing.map((job, index) => (
          <div className="job_card_div" key={index}>
            <Card className="job_card" elevation={3} sx={{ maxWidth: 405 }}>
              <Chip label="Posted 10 days ago" variant="outlined" />
              <CardHeader
                avatar={<Avatar src={job.logoUrl} />}
                title={job.companyName}
                subheader={job.jobRole}
              ></CardHeader>
              <CardContent>
                <Typography>
                  Estimated Salary : {job.minJdSalary} to {job.maxJdSalary}{" "}
                  {job.salaryCurrencyCode}
                </Typography>
                <Typography>About Company:</Typography>
                <Typography>About us</Typography>
                <Typography>{job.jobDetailsFromCompany}</Typography>
                <Typography>Minimum Experience</Typography>
                <Typography>{job.minExp ? `${job.minExp}` : '-'}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained">Easy Apply</Button>
                <Button variant="contained">Unlock refferal asks</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};
export default JobCard;
