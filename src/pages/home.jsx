import { Container } from "@mantine/core";
import { ExperimentalFormAlert } from "../components/experimental-form-alert";
import { FormPersonalData } from "../forms/personal-data";
import { FormProfessionalExperiences } from "../forms/professional-experiences";
import { FormScholarshipDetails } from "../forms/scholarship-details";
import { ProfessionalExperiencesList } from "../forms/professional-experiences-list";
import { ScholarshipList } from "../forms/scholarship-list";

export const Home = ({ currentStep, onValidationChange, onFormDataChange }) => {
  return (
    <Container size="lg">
      <ExperimentalFormAlert />
      {currentStep === 1 && (
        <div>
          <h2>Dados Pessoais</h2>
          <FormPersonalData
            onValidationChange={onValidationChange}
            onFormDataChange={(data) => onFormDataChange(1, data)}
          />
        </div>
      )}
      
      {currentStep === 2 && (
        <div>
          <h2>Experiências Profissionais</h2>
          <FormProfessionalExperiences
            onValidationChange={onValidationChange}
            onFormDataChange={(data) => onFormDataChange(2, data)}
          />
          <ProfessionalExperiencesList experiences={[]} />
        </div>
      )}
      
      {currentStep === 3 && (
        <div>
          <h2>Detalhes da Escolaridade</h2>
          <FormScholarshipDetails
            onValidationChange={onValidationChange}
            onFormDataChange={(data) => onFormDataChange(3, data)}
          />
          <ScholarshipList scholarships={[]} />
        </div>
      )}
    </Container>
  );
};
