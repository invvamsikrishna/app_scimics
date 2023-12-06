import { useFormContext, Controller } from "react-hook-form";
import { InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";

const CustomTextField = styled(TextField)({
  backgroundColor: "#212428",
  borderRadius: 1,
  marginTop: "8px !important",
  "& input": {
    padding: "12px 14px",
  },
  "& ::placeholder": {
    textOverflow: "ellipsis !important",
    color: "#85869999",
  },
});

export default function RHFTextField({ name, label, onChange, InputLabelProps, ...other }) {
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
            InputLabelProps={{ ...field.inputlabelprops, ...InputLabelProps }}
            {...other}
          />
        )}
      />
    </>
  );
}
