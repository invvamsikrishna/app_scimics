import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export function RHFCheckbox({ name, onChange, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      sx={{ color: "text.subtitle" }}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value}
              sx={{ color: "text.subtitle" }}
              onChange={(e) => {
                field.onChange(e.target.checked);
                onChange && onChange(e);
              }}
            />
          )}
        />
      }
      {...other}
    />
  );
}

export function RHFMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) => (field.value.includes(option) ? field.value.filter((value) => value !== option) : [...field.value, option]);

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel key={option.value} control={<Checkbox checked={field.value.includes(option.value)} onChange={() => field.onChange(onSelected(option.value))} />} label={option.label} {...other} />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
