// src/components/Dashboard.js
import React from "react";
import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Sidebar from "../Sidebar";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MonthMap } from "../../utils/MonthMap";

const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState("lg");
  const [page, setPage] = useState(10);
  const navigate = useNavigate();
  const { open } = props;
  console.log(props);

  const columns = [
    {
      name: "applicationNumber",
      label: "Application Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "firstName",
      label: "First/Given Names",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "DOB",
      label: "Date of Birth",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "country",
      label: "Country (Nationality)",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "PaymentStatus",
      label: "Payment Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "appStatus",
      label: "Application Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "visaService",
      label: "Visa Service",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "IPaddress",
      label: "IP Address",
      options: {
        filter: true,
        sort: false,
        width: "50px",
      },
    },
    {
      name: "Date/Time",
      label: "Date/Time",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "declaration",
      label: "Declaration",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const handleLinkClick = (event, id, downloadButton) => {
    // Prevent the default navigation behavior
    event.preventDefault();

    // Open a new tab
    const newTab = window.open(event.target.href, "_blank");

    // Post the data to the new tab\
    newTab.localStorage.setItem("id", id);
    newTab.localStorage.setItem("downloadButton", downloadButton);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/getLeads"
      );
      console.log(response);
      if (response.data.Status === "Success") {
        setData(response.data.result);
      }
    };
    fetch();
  }, []);

  const options = {
    filter: false,
    search: true,
    tableBodyHeight: "470px",
    customSearch: (searchQuery, rowData, columnMeta) => {
      console.log(searchQuery, rowData, columnMeta.columnIndex);
      const columnData = rowData[columnMeta.columnIndex];
      return (
        rowData[0].props.children.includes(searchQuery) ||
        rowData[1].props.children.includes(searchQuery) ||
        rowData[2].props.children.includes(searchQuery)
      );
    },

    // Fixed select column (if you have one)
    selectableRows: "none", // 'none' or 'single' or 'multiple'
    pagination: true,
    rowsPerPage: page,
    rowsPerPageOptions: [10, 25, 50, 100],
    onChangeRowsPerPage: (page) => {
      setPage(page);
    },
    resizableColumns: false,
    overflow: true,
    showResponsive: true,
  };
  return (
    <Container
      style={{
        padding: 0,
        margin: 0,
        marginLeft: open ? "5%" : "",
        maxWidth: open ? "90%" : "100%",
      }}
      maxWidth={false}
    >
      <MUIDataTable
        title={"Leads"}
        data={data
          .sort((a, b) => {
            const dateA = new Date(a.CREATION_TIME);
            const dateB = new Date(b.CREATION_TIME);
            return dateB - dateA;
          })
          .map((val) => {
            return [
              <Link
                to="/application-form/customerDetail"
                onClick={(e) => handleLinkClick(e, val.TempId, false)}
              >
                {val.TempId}
              </Link>,
              <Link
                to="/application-form/customerDetail"
                onClick={(e) => handleLinkClick(e, val.TempId, false)}
              >
                {val.email}
              </Link>,
              <Link
                to="/application-form/customerDetail"
                onClick={(e) => handleLinkClick(e, val.TempId, false)}
              >
                {val.firstName}
              </Link>,
              new Date(val.dob).getDate() +
                "-" +
                MonthMap[new Date(val.dob).getMonth()] +
                "-" +
                new Date(val.dob).getFullYear(),
              val.nationality,
              val.paymentStatus ? (
                <Button variant="contained" size="small" color="success">
                  Payment done
                </Button>
              ) : (
                <Button variant="contained" size="small" color="error">
                  Payment pending
                </Button>
              ),
              val.applicantFile ? "Done" : "Pending",
              val.visaService,
              val.ip
                .split(":")
                .map((val) => val)
                .join(":\r\n"),
              new Date(val.CREATION_TIME).getDate() +
                "-" +
                parseInt(new Date(val.CREATION_TIME).getMonth() + 1)  +
                "-" +
                new Date(val.CREATION_TIME).getFullYear() +
                " " +
                new Date(val?.CREATION_TIME).getHours() +
                ":" +
                new Date(val?.CREATION_TIME).getMinutes() +
                ":" +
                new Date(val?.CREATION_TIME).getSeconds(),
              <Link
                to="/application-form/customerDetail"
                onClick={(e) => handleLinkClick(e, val.TempId, false)}
              >
                Form link
              </Link>,
              <Link
                to="/application-form/customerDetail"
                onClick={(e) => handleLinkClick(e, val.TempId, true)}
              >
                Download
              </Link>,
            ];
          })}
        columns={columns}
        options={options}
      />
    </Container>
  );
};

export default Dashboard;
