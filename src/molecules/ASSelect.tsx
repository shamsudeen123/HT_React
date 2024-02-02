import { useForm, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type IProps = {
  name: string;
  children: any;
};

type Props = IProps & TextFieldProps;

export default function ASSelect({ name, children, ...other }: Props) {
  const { control } = useForm();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          sx={{ width: "100%" }}
          // fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
