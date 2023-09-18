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

const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState("lg");
  const navigate = useNavigate();
  const { open } = props;
  console.log(props);

  const columns = [
    {
      name: "firstName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TempId",
      label: "Temporary Id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "citizenship",
      label: "Citizenship",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "portOfArrival",
      label: "Port Of Arrival",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
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
      name: "visaOptions",
      label: "Visa Option",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "passportNumber",
      label: "Passport Number",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "paymentStatus",
      label: "Payment Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "qualification",
      label: "Qualification",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "religion",
      label: "Religion",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(process.env.REACT_APP_BASE_URL+"/getLeads");
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
    tableBodyHeight: "500px",
    onRowClick: (rowData) => {
      navigate("/customerDetail", { state: { tempId: rowData[1] } });
    },
    // Fixed select column (if you have one)
    selectableRows: "none", // 'none' or 'single' or 'multiple'
    pagination: false,
    resizableColumns: false,
    overflow: true,
    showResponsive: true,
  };
  return (
    <Container style={{ padding: 0, margin: 0 }} maxWidth={open ? "md" : "lg"}>
      <MUIDataTable
        title={"Leads"}
        data={data.map((val) => {
          return [
            val.firstName,
            val.TempId,
            val.citizenship,
            val.portOfArrival,
            val.email,
            val.city,
            val.phoneNumber,
            val.visaService,
            val.visaOptions,
            val.passportNumber,
            val.paymentStatus ? (
              <Button variant="contained" size="small" color="success">
                Payment done
              </Button>
            ) : (
              <Button variant="contained" size="small" color="error">
                Payment pending
              </Button>
            ),
            val.qualification,
            val.religion,
          ];
        })}
        columns={columns}
        options={options}
      />
    </Container>
  );
};

export default Dashboard;
