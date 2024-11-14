import { Button, Container, Group } from "@mantine/core";
import { openConfirmSaveModal } from "../helpers/open-confirm-save-modal";

export const AppFooter = ({ currentStep, nextStep, prevStep, isStepValid, onSubmit }) => {
  const handleFinalSubmit = () => {
    openConfirmSaveModal(() => {
      onSubmit();
      alert("Dados enviados com sucesso!");
    });
  };

  return (
    <Container size="lg">
      <Group my="lg" position="right">
        {currentStep > 1 && (
          <Button variant="light" onClick={prevStep}>
            Voltar
          </Button>
        )}

        {currentStep < 3 ? (
          <Button onClick={nextStep} disabled={!isStepValid}>
            Próximo
          </Button>
        ) : (
          <Button
            color="teal"
            onClick={handleFinalSubmit}
            disabled={!isStepValid}
          >
            Salvar dados
          </Button>
        )}
      </Group>
    </Container>
  );
};
