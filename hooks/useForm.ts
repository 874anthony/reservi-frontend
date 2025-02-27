import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface ValidationRules {
  [key: string]: string;
}

export default function useForm<T>(
  initialState: T,
  submitCallback: (data: T) => void,
  validationRules: ValidationRules
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationRules>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors: ValidationRules = {};

    Object.keys(validationRules).forEach((key) => {
      if (!formData[key as keyof T]) {
        tempErrors[key] = validationRules[key];
      }
    });

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ): void => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      submitCallback(formData);

      setFormData(initialState);
      setLoading(false);
    }
  };

  return { formData, errors, loading, handleChange, handleSubmit };
}
