import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, MenuItem, Grid, Typography, Radio, Card } from "@mui/material";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlertContext } from "../../components/AlertProvider";
import AdminServices from "../../services/AdminServices";
import { COMMON_ERROR_MSG } from "../../constants";
import { connect } from "react-redux";

const AddMcqQuestion = ({ account }) => {
  const props = useLocation().state;
  const isEdit = props && props.scimic_question_pk !== null;

  const { showSnackbar } = useAlertContext();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(0);

  useEffect(() => {
    setAnswer([props?.option1, props?.option2, props?.option3, props?.option4].indexOf(props?.answer) || 0);
    reset(defaultValues);
  }, []);

  const schema = Yup.object().shape({
    icap_category_id: Yup.string().required("Category is required"),
    icap_subcategory_id: Yup.string().required("Subcategory is required"),
    question: Yup.string().required("Question is required"),
    option1: Yup.string().required("Option is required"),
    option2: Yup.string().required("Option is required"),
    option3: Yup.string().required("Option is required"),
    option4: Yup.string().required("Option is required"),
  });

  const defaultValues = {
    icap_category_id: props?.icap_category_id || "",
    icap_subcategory_id: props?.icap_subcategory_id || "",
    question: props?.question || "",
    option1: props?.option1 || "",
    option2: props?.option2 || "",
    option3: props?.option3 || "",
    option4: props?.option4 || "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const category = watch("icap_category_id");

  const onSubmit = async (data) => {
    var formData = {
      ...data,
      answer: [data.option1, data.option2, data.option3, data.option4][answer],
    };

    if (!isEdit) {
      addQuestion(formData);
    } else {
      updateQuestion(formData);
    }
  };

  const addQuestion = async (data) => {
    setLoading(true);

    try {
      const response = await AdminServices.addMcqQuestion({ ...data, icap_qscategory_id: 1, comprehension_id: null, domain_id: 1 });
      setLoading(false);

      showSnackbar("MCQ Question added successfully");
      reset();
    } catch (err) {
      showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

  const updateQuestion = async (data) => {
    setLoading(true);

    try {
      const response = await AdminServices.updateMcqQuestion(props?.scimic_question_pk, data);
      setLoading(false);

      showSnackbar("MCQ Question updated successfully");
      navigate(-1);
    } catch (err) {
      showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={6}>
            <RHFTextField
              name="icap_category_id"
              label="Category"
              onChange={(e) => {
                // setSubCategory("");
              }}
              select
            >
              {account.user?.categories?.map((item, index) => (
                <MenuItem key={index} value={item.icap_category_pk}>
                  {item.icap_category_name}
                </MenuItem>
              ))}
            </RHFTextField>
          </Grid>

          <Grid item xs={6}>
            <RHFTextField name="icap_subcategory_id" label="Subcategory" select>
              {account.user?.categories
                ?.find((e) => e.icap_category_pk == category)
                ?.subcategories?.map((item, index) => (
                  <MenuItem key={index} value={item.sub_category_pk}>
                    {item.sub_category_name}
                  </MenuItem>
                ))}
            </RHFTextField>
          </Grid>
        </Grid>

        <Box p={1} />

        <Stack spacing={2}>
          <RHFTextField name="question" label="Question" />

          <Typography component="span" color="white" fontSize={12} fontWeight="normal">
            Options
          </Typography>

          <Stack direction="row" sx={{ display: "flex" }}>
            <Radio value="a" checked={answer == 0} onChange={() => setAnswer(0)} />
            <RHFTextField name="option1" />
          </Stack>

          <Stack direction="row" sx={{ display: "flex" }}>
            <Radio value="b" checked={answer == 1} onChange={() => setAnswer(1)} />
            <RHFTextField name="option2" />
          </Stack>

          <Stack direction="row" sx={{ display: "flex" }}>
            <Radio value="c" checked={answer == 2} onChange={() => setAnswer(2)} />
            <RHFTextField name="option3" />
          </Stack>

          <Stack direction="row" sx={{ display: "flex" }}>
            <Radio value="d" checked={answer == 3} onChange={() => setAnswer(3)} />
            <RHFTextField name="option4" />
          </Stack>
        </Stack>

        <Box p={2} />

        <Stack direction="row" spacing={1} sx={{ justifyContent: "end" }}>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            {isEdit ? "Update" : "Submit"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapStateToProps, null)(AddMcqQuestion);
