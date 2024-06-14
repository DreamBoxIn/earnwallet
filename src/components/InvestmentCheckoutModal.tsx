import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FC } from "react";

interface InvestmentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
  };
}

const InvestmentCheckoutModal: FC<InvestmentCheckoutModalProps> = ({ isOpen, onClose, project }) => {
  const toast = useToast();

  const handleInvestment = () => {
    // Aquí puedes agregar la lógica para procesar la inversión
    toast({
      title: "Inversión realizada",
      description: `Has invertido en ${project.title}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout de Inversión</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Estás invirtiendo en: {project.title}</Text>
          <Text mt={4}>{project.description}</Text>
          <Input placeholder="Cantidad a invertir" mt={4} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleInvestment}>
            Confirmar Inversión
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvestmentCheckoutModal;
