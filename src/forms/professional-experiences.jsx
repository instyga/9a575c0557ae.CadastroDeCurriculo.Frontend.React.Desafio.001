import { useState, useEffect, useCallback } from "react";
import {
  Checkbox,
  Fieldset,
  Grid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { FormSectionTitle } from "../components/form-section-title";
import { DateInput } from "@mantine/dates";

export const FormProfessionalExperiences = ({ onValidationChange, onFormDataChange }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
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
        ([key, value]) => key === "current" || value !== ""
      );
    onValidationChange(isValid);
  }, [errors, formData, onValidationChange]);

  return (
    <Fieldset
      legend={
        <FormSectionTitle
          step={2}
          title="Experiência profissional"
          caption="Lista de experiências profissionais"
        />
      }
    >
      <Grid>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <TextInput
            label="Empresa"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            error={errors.company}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <TextInput
            label="Cargo"
            value={formData.position}
            onChange={(e) => handleChange("position", e.target.value)}
            error={errors.position}
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
            label="Data da saída"
            value={formData.endDate}
            onChange={(date) => handleChange("endDate", date)}
            error={formData.current ? "" : errors.endDate}
            disabled={formData.current}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 12 }}>
          <Checkbox
            label="Ainda trabalho nesta empresa"
            checked={formData.current}
            onChange={(e) => handleChange("current", e.target.checked)}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 12 }}>
          <Textarea
            label="Descrição das atividades"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            description="Dica: fale sobre as atividades que você exerceu e que trouxeram impactos positivos para a empresa"
          />
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};
