import { useForm, Controller } from "react-hook-form";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Password } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";

type IProps = {
  name: string;
  type: string;
};

type Props = IProps & TextFieldProps;

export default function ASTextField({ name, type, ...other }: Props) {
  const { control } = useForm();
  const [visibilityOff, setVisibilityOff] = useState(false);

  useEffect(() => {
    setVisibilityOff(false);
  }, []);

  const handleVisibility = (type: any) => {
    setVisibilityOff(type === "OFF" ? true : false);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log(field, "field inside textfield...");
        if (field.name === "SSN") {
          // const {onChange} = field
          // onChange((event:any) => event.target.value.slice(0,11))
          //  field.value = field.value.slice(0,11)
        }
        return (
          <TextField
            // className='-ms-clear'
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{ cursor: "pointer" }}>
                  {type === "password" && !visibilityOff && (
                    <VisibilityOffIcon
                      onClick={() => handleVisibility("OFF")}
                    />
                  )}
                  {visibilityOff && (
                    <VisibilityIcon onClick={() => handleVisibility("ON")} />
                  )}
                </InputAdornment>
              ),
            }}
            {...field}
            sx={{ width: "100%" }}
            // fullWidth
            error={!!error}
            // onKeyUp={formatToPhone}
            helperText={error?.message}
            type={
              type === "password" && !visibilityOff
                ? "password"
                : type === "number"
                ? "number"
                : "text"
            }
            {...other}
          />
        );
      }}
    />
  );
}
