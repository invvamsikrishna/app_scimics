import { Box, Card, CircularProgress, Divider, Grid, IconButton, MenuItem, Stack } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customMuiStyles } from "../common/CustomStyles";
import { getQuestionsList } from "../../actions/question";
import { URHFTextField } from "../../components/hook-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import { COMMON_ERROR_MSG } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminServices from "../../services/AdminServices";
import { useAlertContext } from "../../components/AlertProvider";

const QuestionsList = ({ account, question, getQuestionsList }) => {
  const classes = customMuiStyles();
  const navigate = useNavigate();
  const { showLoading, hideLoading, showSnackbar, showAlertDialog } = useAlertContext();

  const [category, setCategory] = useState(account.user?.categories[0]?.icap_category_pk || "");
  const [subCategory, setSubCategory] = useState(account.user?.categories[0]?.subcategories[0]?.sub_category_pk || "");

  useEffect(() => {
    handleSearch();
  }, []);

  const columns = [
    {
      name: "scimic_question_pk",
      label: "QId",
    },
    {
      name: "question",
      label: "Question",
    },
    {
      name: "option1",
      label: "Option 1",
    },
    {
      name: "option2",
      label: "Option 2",
    },
    {
      name: "option3",
      label: "Option 3",
    },
    {
      name: "option4",
      label: "Option 4",
    },
    {
      name: "answer",
      label: "Correct Answer",
    },
    {
      name: "scimic_question_pk",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = question.data.findIndex((e) => e.scimic_question_pk == value);
          var isComprehensive = question.data[index].comprehension_id;

          return (
            <Stack direction="row">
              <IconButton color="primary" disabled={isComprehensive} onClick={() => handleEdit(question.data[index])}>
                <EditIcon />
              </IconButton>

              <IconButton color="error" disabled={isComprehensive} onClick={() => showAlertDialog({ description: "Are you sure? Do you want to delete?", agreeCallback: () => handleDelete(value) })}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 100,
    download: false,
    print: false,
  };

  const handleSearch = () => {
    if (!category || !subCategory) {
      showSnackbar("Category and Subcategory are required", "error");
      return;
    }

    getQuestionsList(category, subCategory);
  };

  const handleEdit = (data) => {
    if (!data.comprehension_id) {
      navigate("/admin-dashboard/ques-management/add-mcq-question", { state: data });
    }
  };

  const handleDelete = async (id) => {
    showLoading();

    try {
      await AdminServices.deleteMcqQuestion(id);

      handleSearch();
      showSnackbar("MCQ Question deleted successfully");
    } catch (err) {
      showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
    }

    hideLoading();
  };

  return (
    <Card elevation={1}>
      <Box p={3}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={3}>
            <URHFTextField
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
              select
            >
              {account.user?.categories?.map((item, index) => (
                <MenuItem key={index} value={item.icap_category_pk}>
                  {item.icap_category_name}
                </MenuItem>
              ))}
            </URHFTextField>
          </Grid>

          <Grid item xs={3}>
            <URHFTextField name="subcategory" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} select>
              {account.user?.categories
                ?.find((e) => e.icap_category_pk == category)
                ?.subcategories?.map((item, index) => (
                  <MenuItem key={index} value={item.sub_category_pk}>
                    {item.sub_category_name}
                  </MenuItem>
                ))}
            </URHFTextField>
          </Grid>

          <Grid item xs={2}>
            <LoadingButton loading={question.isLoading} variant="contained" onClick={handleSearch}>
              Search
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {question.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!question.isLoading && <MUIDataTable title="" className={classes.customTable} columns={columns} data={question.data ?? []} options={options} />}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
    question: state.question,
  };
};

export default connect(mapStateToProps, { getQuestionsList })(QuestionsList);
