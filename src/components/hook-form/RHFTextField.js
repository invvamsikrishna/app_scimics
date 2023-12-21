import { useFormContext, Controller } from "react-hook-form";
import { Box, CircularProgress, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

const CustomTextField = styled(TextField)({
  borderRadius: 1,
  marginTop: "8px !important",
  "& .MuiInputBase-root": {
    backgroundColor: "#212428",
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
  },
  "& .MuiSelect-outlined": {
    padding: "12px 14px",
  },
  "& ::placeholder": {
    textOverflow: "ellipsis !important",
    color: "#85869999",
  },
});

export default function RHFTextField({ name, label, loading, onChange, InputLabelProps, ...other }) {
  const { control } = useFormContext();

  return (
    <>
      <InputLabel shrink={false} htmlFor={"username"}>
        <Typography component="span" color="white" fontSize={12} fontWeight="normal">
          {label}
        </Typography>
      </InputLabel>

      <Controller
        name={name}
        control={control}
        style={{ marginTop: 0 }}
        render={({ field, fieldState: { error } }) => (
          <CustomTextField
            {...field}
            fullWidth
            value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
              onChange && onChange(e);
            }}
            error={!!error}
            helperText={error?.message}
            InputLabelProps={{ ...field.InputLabelProps, ...InputLabelProps }}
            InputProps={{
              ...field.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="primary" size={20} /> : null}
                  {field.InputProps?.endAdornment}
                </React.Fragment>
              ),
            }}
            {...other}
          />
        )}
      />
    </>
  );
}

export function URHFTextField({ name, label, onChange, InputLabelProps, ...other }) {
  return (
    <>
      <InputLabel shrink={false} htmlFor={"username"}>
        <Typography component="span" color="white" fontSize={12} fontWeight="normal">
          {label}
        </Typography>
      </InputLabel>

      <CustomTextField fullWidth {...other} />
    </>
  );
}