import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ViewAllJobApplication = () => {
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [applications, setApplications] = useState([
    {
      id: 1,
      applicationId: "",
      job: {
        id: 1,
        employer: {
          id: 4,
          firstName: "",
          lastName: "",
          emailId: "",
          phoneNo: "",
        },
        title: "",
        description: "",
        category: {
          id: 1,
          name: "",
          description: "",
          status: "",
        },
        address: {
          id: "",
          street: "",
          city: "",
          pincode: "",
          state: "",
          country: "",
        },
        companyName: "",
        companyLogo: "",
        jobType: "",
        salaryRange: "",
        experienceLevel: "",
        requiredSkills: "",
        status: "",
        datePosted: "",
        applicationCount: 0,
      },
      employee: {
        userProfile: {
          id: 1,
          bio: "",
          website: "",
          resume: "",
          linkedlnProfileLink: "",
          githubProfileLink: "",
          skills: [
            {
              id: 7,
              skill: "",
              experience: 0,
              userId: 0,
            },
          ],
          educations: [
            {
              id: 5,
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
              userId: 0,
            },
          ],
          workExperiences: [
            {
              id: 2,
              experience: 0,
              jobPosition: "",
              company: "",
              startDate: "",
              endDate: "",
              userId: 0,
            },
          ],
          profilePic: "",
        },
      },
      dateTime: "",
      status: "",
      jobId: 0,
      employeeId: 0,
    },
  ]);

  let navigate = useNavigate();

  useEffect(() => {
    const getAllJobs = async () => {
      const jobApplicationResponse = await retrieveAllJobApplication();
      if (jobApplicationResponse) {
        setApplications(jobApplicationResponse.applications);
      }
    };

    getAllJobs();
  }, []);

  const retrieveAllJobApplication = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/job/application/fetch/all",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const viewEmployeeProfile = (employee) => {
    navigate("/employee/profile/detail", { state: employee });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>All Job Applications</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Company Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Job</th>
                  <th scope="col">Category</th>
                  <th scope="col">Type</th>
                  <th scope="col">Employee</th>
                  <th scope="col">Location</th>
                  <th scope="col">Application Id</th>
                  <th scope="col">Applied Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => {
                  return (
                    <tr>
                      <td>
                        <b>{application.job.companyName}</b>
                      </td>
                      <td>
                        <img
                          src={
                            "http://localhost:/job/" +
                            application.job.companyLogo
                          }
                          class="img-fluid"
                          alt="company_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/job/${application.job.id}/detail`}
                          style={{ textDecoration: "none" }}
                          className="text-color"
                        >
                          <b>{application.job.title}</b>
                        </Link>
                      </td>

                      <td>
                        <b>{application.job.category.name}</b>
                      </td>
                      <td>
                        <b>{application.job.jobType}</b>
                      </td>

                      <td>
                        <b
                          className="text-color"
                          onClick={() =>
                            viewEmployeeProfile(application.employee)
                          }
                        >
                          {application.employee.firstName +
                            " " +
                            application.employee.lastName}
                        </b>
                      </td>

                      <td>
                        <b>{application.job.address.city}</b>
                      </td>
                      <td>
                        <b>{application.applicationId}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(application.dateTime)}</b>
                      </td>
                      <td>
                        <b>{application.status}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllJobApplication;
