import { Box, Card, CircularProgress } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { getMyTestReports } from "../../actions/report";
import { connect } from "react-redux";
import { fDateTime } from "../../services/formatTime";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useRowData } from "../../components/createContextCodes/RowDataContext";
import { customMuiStyles } from "../common/CustomStyles";

const TestReportsList = ({ account, report, getMyTestReports }) => {
  const classes = customMuiStyles();
  // console.log(report);
  useEffect(() => {
    getMyTestReports(account.user?.user_pk);
  }, []);
  const navigate = useNavigate();
  const { setRowData } = useRowData();
  const onShowPdfClick = (rowData) => {
    // console.log(rowData);
    setRowData(rowData);
    navigate("/user/viewpdf");
  };

  const columns = [
    {
      name: "createdon",
      label: "Exam on",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return fDateTime(value);
        },
      },
    },
    {
      name: "total",
      label: "Total",
      options: { display: "false" },
    },
    {
      name: "won",
      label: "Total Marks",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return `${value} of ${data[1]}`;
        },
      },
    },
    {
      name: "ca_total",
      label: "Total",
      options: { display: "false" },
    },
    {
      name: "ca_won",
      label: "Cognitive Abilities",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return `${value} of ${data[3]}`;
        },
      },
    },
    {
      name: "tp_total",
      label: "Total",
      options: { display: "false" },
    },
    {
      name: "tp_won",
      label: "Technical Proficiency",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return `${value} of ${data[5]}`;
        },
      },
    },
    {
      name: "cs_total",
      label: "Total",
      options: { display: "false" },
    },
    {
      name: "cs_won",
      label: "Communication Skills",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return `${value} of ${data[7]}`;
        },
      },
    },
    {
      name: "pb_total",
      label: "Total",
      options: { display: "false" },
    },
    {
      name: "pb_won",
      label: "Personality and Behavioral",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return `${value} of ${data[9]}`;
        },
      },
    },
    {
      name: "icap_report_pk",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = {
            icap_report_pk: value,
            user_id: tableMeta.rowData[12],
            firstname: tableMeta.rowData[13],
            lastname: tableMeta.rowData[14],
            createdon: tableMeta.rowData[15],
          };
          // var data = tableMeta.rowData;
          return (
            <LoadingButton
              variant="outlined"
              onClick={() => onShowPdfClick(rowData)}
              sx={{
                color: "#5a64c1",
                backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)",
                border: "1px solid #5C67C7",
              }}
            >
              Show Report
            </LoadingButton>
          );
        },
      },
    },
    {
      name: "user_id",
      label: "user_id",
      options: { display: "false" },
    },
    {
      name: "firstname",
      label: "firstname",
      options: { display: "false" },
    },
    {
      name: "lastname",
      label: "lastname",
      options: { display: "false" },
    },
    {
      name: "createdon",
      label: "createdon",
      options: { display: "false" },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    download: false,
    print: false,
  };

  return (
    <Card elevation={1}>
      {report.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!report.isLoading && <MUIDataTable title="" className={classes.customTable} columns={columns} data={report.data ?? []} options={options} />}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
    report: state.report,
  };
};

export default connect(mapStateToProps, { getMyTestReports })(TestReportsList);
