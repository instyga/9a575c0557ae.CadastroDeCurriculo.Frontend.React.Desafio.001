import { useState } from "react";
import { AppShell } from "@mantine/core";
import { AppFooter } from "./components/app-footer";
import { AppHeader } from "./components/app-header";
import { Home } from "./pages/home";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);

  const [personalData, setPersonalData] = useState({});
  const [professionalExperiences, setProfessionalExperiences] = useState({});
  const [scholarshipDetails, setScholarshipDetails] = useState({});

  const nextStep = () => {
    if (isStepValid && currentStep < 3) setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleValidationChange = (isValid) => {
    setIsStepValid(isValid);
  };

  const handleFormDataChange = (step, data) => {
    if (step === 1) setPersonalData(data);
    if (step === 2) setProfessionalExperiences(data);
    if (step === 3) setScholarshipDetails(data);
  };

  const handleSubmit = () => {
    if (isStepValid) {
      const allData = {
        personalData,
        professionalExperiences,
        scholarshipDetails,
      };
      console.log("Dados enviados:", allData);
      
      setCurrentStep(1);
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 80 }}
      padding="md"
      bg="gray.0"
    >
      <AppShell.Header bg="blue">
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Home
          currentStep={currentStep}
          onValidationChange={handleValidationChange}
          onFormDataChange={handleFormDataChange}
        />
      </AppShell.Main>
      <AppShell.Footer>
        <AppFooter
          currentStep={currentStep}
          nextStep={nextStep}
          prevStep={prevStep}
          isStepValid={isStepValid}
          onSubmit={handleSubmit}
        />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;