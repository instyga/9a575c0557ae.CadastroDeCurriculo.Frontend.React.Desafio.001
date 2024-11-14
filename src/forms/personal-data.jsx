import { useState, useEffect, useCallback } from "react";
import { Fieldset, Grid, TextInput, Radio, Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import InputWithMask from "react-input-mask";
import { FormSectionTitle } from "../components/form-section-title";

export const FormPersonalData = ({ onValidationChange, onFormDataChange }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    nationality: "",
    birthplace: "",
    birthDate: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  const validateField = useCallback((name, value) => {
    let error = "";
    if (!value) {
      error = "Este campo é obrigatório.";
    } else if (name === "email" && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      error = "Insira um e-mail válido.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  }, []);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
    onFormDataChange(formData); // Atualiza os dados do formulário no App
  };

  useEffect(() => {
    const isValid = Object.values(errors).every((err) => !err) &&
      Object.values(formData).every((value) => value !== "");
    onValidationChange(isValid);
  }, [errors, formData, onValidationChange]);

  return (
    <Fieldset
      legend={
        <FormSectionTitle
          step={1}
          title="Dados Pessoais"
          caption="Informações Pessoais de contato"
        />
      }
    >
      <Grid>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <TextInput
            label="Nome Completo"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            error={errors.fullName}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <Radio.Group
            label="Gênero"
            value={formData.gender}
            onChange={(value) => handleChange("gender", value)}
            error={errors.gender}
          >
            <Group my="xs">
              <Radio value="male" label="Masculino" />
              <Radio value="female" label="Feminino" />
              <Radio value="other" label="Outro" />
            </Group>
          </Radio.Group>
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 3 }}>
          <Select
            data={["Brasileiro", "Estrangeiro"]}
            label="Nacionalidade"
            value={formData.nationality}
            onChange={(value) => handleChange("nationality", value)}
            error={errors.nationality}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 3 }}>
          <TextInput
            label="Naturalidade"
            value={formData.birthplace}
            onChange={(e) => handleChange("birthplace", e.target.value)}
            error={errors.birthplace}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 3 }}>
          <DateInput
            valueFormat="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
            label="Data de Nascimento"
            value={formData.birthDate}
            onChange={(date) => handleChange("birthDate", date)}
            error={errors.birthDate}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <TextInput
            label="E-mail"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 3 }}>
          <TextInput
            component={InputWithMask}
            mask="(99) 9999-9999"
            placeholder="(99) 9999-9999"
            label="Telefone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={errors.phone}
          />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 3 }}>
          <TextInput
            label="Celular / Whatsapp"
            component={InputWithMask}
            mask="(99) 99999-9999"
            placeholder="(99) 99999-9999"
            value={formData.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
            error={errors.whatsapp}
          />
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};
