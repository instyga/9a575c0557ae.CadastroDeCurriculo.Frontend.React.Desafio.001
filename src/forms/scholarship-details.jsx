import { useState, useEffect, useCallback } from "react";
import {
  Checkbox,
  Fieldset,
  Grid,
  TextInput,
} from "@mantine/core";
import { FormSectionTitle } from "../components/form-section-title";
import { DateInput } from "@mantine/dates";

export const FormScholarshipDetails = ({ onValidationChange, onFormDataChange }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    institution: "",
    course: "",
    startDate: "",
    endDate: "",
    ongoing: false,
  });

  const validateField = useCallback((name, value) => {
    let error = "";
    if (!value) {
      error = "Este campo é obrigatório.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  }, []);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
    onFormDataChange(formData);
  };

  useEffect(() => {
    const isValid =
      Object.values(errors).every((err) => !err) &&
      Object.entries(formData).every(
        ([key, value]) => key === "ongoing" || value !== ""
      );
    onValidationChange(isValid);
  }, [errors, formData, onValidationChange]);

  return (
    <Fieldset
      legend={
        <FormSectionTitle
          step={3}
          title="Escolaridade"
          caption="Lista de cursos e graduações"
        />
      }
    >
      <Grid>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <TextInput
            label="Instituição"
            value={formData.institution}
            onChange={(e) => handleChange("institution", e.target.value)}
            error={errors.institution}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <TextInput
            label="Curso"
            value={formData.course}
            onChange={(e) => handleChange("course", e.target.value)}
            error={errors.course}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 3 }}>
          <DateInput
            placeholder="DD/MM/YYYY"
            label="Data de início"
            value={formData.startDate}
            onChange={(date) => handleChange("startDate", date)}
            error={errors.startDate}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 3 }}>
          <DateInput
            placeholder="DD/MM/YYYY"
            label="Data do término"
            value={formData.endDate}
            onChange={(date) => handleChange("endDate", date)}
            error={formData.ongoing ? "" : errors.endDate}
            disabled={formData.ongoing}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <Checkbox
            label="Ainda estou cursando"
            checked={formData.ongoing}
            onChange={(e) => handleChange("ongoing", e.target.checked)}
          />
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};
