import { useFormContext, Controller } from "react-hook-form";
import { CircularProgress, IconButton, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const CustomTextField = styled(TextField)({
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

export default function RHFTextField({ name, label, loading, onChange, InputLabelProps, type, ...other }) {
  const { control } = useFormContext();
  const [passwordType, setPasswordType] = useState(type);
  const [eyeIcon, setEyeIcon] = useState(false);

  useEffect(() => {
    setPasswordType(type);
  }, [type]);

  const togglePasswordVisibility = () => {
    setEyeIcon(!eyeIcon);
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

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
                  {type === "password" && (
                    <IconButton onClick={togglePasswordVisibility} sx={{ p: 0, color: "white" }}>
                      {eyeIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  )}
                </React.Fragment>
              ),
            }}
            type={passwordType}
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

export function ACQCTextField({ name, label, value, max, setQuantity, ...other }) {
  const [errorText, setErrorText] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0 || inputValue > max) {
      setErrorText(`Value should be between 0 to ${max}`);
    } else {
      setErrorText('');
      setQuantity(inputValue)
    }
  };
  
  const handleArrowKeys = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setQuantity((prevValue) => Math.min(Number(prevValue) + 1, max));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setQuantity((prevValue) => Math.max(Number(prevValue) - 1, 0));
    }
  };
  
  return (
    <TextField name={name} label={label} type="number" sx={{ margin: 2, width: "20%" }}
      value={value} onChange={(e)=>handleInputChange(e)} onKeyDown={handleArrowKeys}
      inputProps={{
        min: 0,
        max: max,
      }}
      error={Boolean(errorText)}
      helperText={errorText}
      {...other}
    />
  );
}

export function ACTTextField({ name, value, setTime, ...other }) {
  const [errorText, setErrorText] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0 || inputValue > 60) {
      setErrorText(`Time should be between 0min to 60min`);
    } else {
      setErrorText('');
      setTime(inputValue)
    }
  };
  
  const handleArrowKeys = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setTime((prevValue) => Math.min(Number(prevValue) + 1, 60));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setTime((prevValue) => Math.max(Number(prevValue) - 1, 0));
    }
  };
  
  return (
    <TextField name={name} label="Time (Min)" type="number" sx={{ width: "80%" }}
      value={value} onChange={(e)=>handleInputChange(e)} onKeyDown={handleArrowKeys}
      inputProps={{
        min: 0,
        max: 60,
      }}
      error={Boolean(errorText)}
      helperText={errorText}
      {...other}
    />
  );
}

export function AGTextField({ name, value, label, setQuestionCount, ...other }) {
  const [errorText, setErrorText] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0 || inputValue > 20) {
      setErrorText(`Value should be between 0 to 20`);
    } else {
      setErrorText('');
      setQuestionCount(inputValue)
    }
  };
  
  const handleArrowKeys = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setQuestionCount((prevValue) => Math.min(Number(prevValue) + 1, 20));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setQuestionCount((prevValue) => Math.max(Number(prevValue) - 1, 0));
    }
  };
  
  return (
    <TextField name={name} label={label} type="number" sx={{ marginLeft: 3, width: "150px" }}
      value={value} onChange={(e)=>handleInputChange(e)} onKeyDown={handleArrowKeys}
      inputProps={{
        min: 0,
        max: 20,
      }}
      error={Boolean(errorText)}
      helperText={errorText}
      {...other}
    />
  );
}
