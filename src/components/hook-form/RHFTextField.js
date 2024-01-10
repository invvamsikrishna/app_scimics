import { useFormContext, Controller } from "react-hook-form";
import { CircularProgress, IconButton, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

//AdminCongigurationQuestionCountTextField
export function ACQCTextField({ name, label, value, max, setCount, errorText, setErrorText, startErrorText, endErrorText, ...other }) {

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0 || inputValue > max) {
      setErrorText(`${startErrorText} ${max} ${endErrorText}`);
    } else {
      setErrorText('');
      setCount(inputValue)
    }
  };

  const handleArrowButtonUp = (e) => {
      setErrorText('');
      e.preventDefault();
    setCount((prevValue) => Math.min(Number(prevValue) + 1, max));
  }

  const handleArrowButtonDown = (e) => {
      setErrorText('');
      e.preventDefault();
    setCount((prevValue) => Math.max(Number(prevValue) - 1, 0));
  }

  const handleArrowKeys = (e) => {
    if (e.key === 'ArrowUp') {
      handleArrowButtonUp(e)
    } else if (e.key === 'ArrowDown') {
      handleArrowButtonDown(e)
    } else if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === '+') {
      e.preventDefault();
    }
  };

  return (
    <TextField type="number" sx={{ marginTop: 1, width: "90%", marginRight:1 }}
    name={name} label={label} value={value} onChange={(e) => handleInputChange(e)} onKeyDown={handleArrowKeys}
      inputProps={{
        min: 0,
        max: max,
      }}
      error={Boolean(errorText)}
      helperText={errorText}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "end" }}>
            <IconButton
              sx={{ width: "10%", height: "10%" }}
              edge="end" onClick={(e) => handleArrowButtonUp(e)}>
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton
              sx={{ width: "10%", height: "10%" }}
              edge="end" onClick={(e) => handleArrowButtonDown(e)}>
              <ArrowDropDownIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
}

// AdminGeneratingquestionsTextField
export function AGTextField({ name, value, label, setQuestionCount, errorText, handleInputChange, handleArrowKeys, handleArrowButtonUp, handleArrowButtonDown, ...other }) {

  return (
    <TextField name={name} label={label} type="number" sx={{ marginTop: 1, width: "85%", marginRight:1 }}
      value={value} onChange={(e) => handleInputChange(e)} onKeyDown={(e) => handleArrowKeys(e)}
      inputProps={{
        min: 0,
        max: 20,
      }}
      error={Boolean(errorText)}
      helperText={errorText}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "end" }}>
            <IconButton
              sx={{ width: "10%", height: "10%" }}
              edge="end" onClick={(e) => handleArrowButtonUp(e)}>
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton
              sx={{ width: "10%", height: "10%" }}
              edge="end" onClick={(e) => handleArrowButtonDown(e)}>
              <ArrowDropDownIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
}
