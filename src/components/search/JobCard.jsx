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
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";

const yrExperience = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const employee_count = [
  "1-10",
  "11-20",
  "21-50",
  "51-100",
  "101-200",
  "201-500",
  "500+",
];
const job_type = ["Backend", "Frontend", "Fullstack","IOS","Flutter","Android","Dev-Ops","Nlp","Deep-Learning","Sre","Web3","Hr","Hardware","Mechanical","Systems","Finance"];

const JobCard = () => {
  const [jobListing, setJobListing] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedNumEmployees, setSelectedNumEmployees] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [comName, setComName] = useState("");
  const [filteredJobListing, setFilteredJobListing] = useState([]);

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

  useEffect(() => {
    filterJobs();
  }, [selectedExperience, selectedNumEmployees, selectedJobType, comName]);

  function getListOfJobs() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: page,
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
        setJobListing((prevData) => [...prevData, ...result.jdList]);
      })
      .catch((error) => console.error(error));
  }
  function handleExperienceChange(event) {
    setSelectedExperience(event.target.value);
  }
  function handleEmployeeNumChange(event) {
    setSelectedNumEmployees(event.target.value);
  }
  function handleJobType(event) {
    setSelectedJobType(event.target.value);
  }
  function handleNameChange(event) {
    setComName(event.target.value);
  }
  function filterJobs() {
    let filteredJobs = jobListing.filter((job) => {
      console.log("job",job.minExp)
      if (selectedExperience && job.minExp > selectedExperience) {
        return false;
      }
      if (
        selectedNumEmployees &&
        !selectedNumEmployees.includes(job.numEmployees)
      ) {
        return false;
      }
      if (selectedJobType && job.jobRole.toLowerCase() !== selectedJobType.toLowerCase()) {
        return false;
      }
      if (comName && job.companyName.toLowerCase()!== (comName.toLowerCase())) {
        return false;
      }
      return true;
    });
    setFilteredJobListing(filteredJobs);
    console.log("filteredJobs",filteredJobs)
  }
  return (
    <>
      {/* Filter Section */}

      {/* Name Filter */}
      <FormControl className="filter">
        <TextField
          id="job_name"
          label="Name"
          variant="outlined"
          value={comName}
          onChange={handleNameChange}
        />
      </FormControl>
      {/* Experience Filter */}
      <FormControl className="filter">
        <InputLabel id="experience_id">Experience</InputLabel>
        <Select
          labelId="experience_id"
          label="Experience"
          value={selectedExperience}
          onChange={handleExperienceChange}
        >
          {yrExperience.map((yr) => (
            <MenuItem key={yr} value={yr}>
              {yr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Number Of Employees Filter */}
      <FormControl className="filter">
        <InputLabel id="num_employees_id">Num Of Emloyees</InputLabel>
        <Select
          labelId="num_employees_id"
          label="Employees Number"
          value={selectedNumEmployees}
          onChange={handleEmployeeNumChange}
        >
          {employee_count.map((count) => (
            <MenuItem key={count} value={count}>
              {count}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Job Type Filter */}
      <FormControl className="filter">
        <InputLabel id="job_type_id">Job Type</InputLabel>
        <Select
          labelId="job_type_id"
          label="Job Type"
          value={selectedJobType}
          onChange={handleJobType}
        >
          {job_type.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Card Section */}
      <div className=" job_card_wrapper">
        {filteredJobListing.map((job, index) => (
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
                <Typography>{job.minExp ? `${job.minExp}` : "-"}</Typography>
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
