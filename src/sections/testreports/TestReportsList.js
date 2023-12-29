import { Box, Card, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { getMyTestReports } from "../../actions/report";
import { connect } from "react-redux";
import { fDateTime } from "../../services/formatTime";

export const useStyles = makeStyles((theme) => ({
  customTable: {
    "& th": { padding: "16px 8px" },
    "& td": { padding: "16px 8px" },
  },
}));

const TestReportsList = ({ account, report, getMyTestReports }) => {
  const classes = useStyles();

  useEffect(() => {
    getMyTestReports(account.user?.user_pk);
  }, []);

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
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    download: false,
    print: false,
    setTableProps: () => {
      return {
        // size: "small",
      };
    },
  };

  return (
    <Card elevation={1}>
      {report.loading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!report.loading && <MUIDataTable title="" className={classes.customTable} columns={columns} data={report.data ?? []} options={options} />}
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
