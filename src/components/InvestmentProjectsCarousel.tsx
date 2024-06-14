import { Box, Flex, Text, Image, VStack, Button, HStack, IconButton, Tag, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import InvestmentCheckoutModal from "./InvestmentCheckoutModal";

const projects = [
  {
    title: "Earn USDT",
    description: "Invierte USDT",
    image: "/images/image1.jpg",
    link: "#",
    profitability: "12% APR",
  },
  {
    title: "Earn PXO",
    description: "Invierte PXO",
    image: "/images/image2.jpg",
    link: "#",
    profitability: "15% APR",
  },
];

const InvestmentProjectsCarousel = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);

  const nextProjects = () => {
    setScrollIndex((prevIndex) => Math.min(prevIndex + 1, projects.length - 1));
  };

  const prevProjects = () => {
    setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleInvestClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");

  return (
    <Box mt={8} p={4} bg={bg} borderRadius="md" boxShadow="lg" maxW="full">
      <Flex justifyContent="space-between" alignItems="center">
        <IconButton
          onClick={prevProjects}
          colorScheme="blue"
          borderRadius="full"
          icon={<MdArrowBack />}
          aria-label="Previous projects"
        />
        <Box flex="1" mx={4} overflowX="scroll">
          <HStack spacing={4} transform={`translateX(-${scrollIndex * 220}px)`} transition="transform 0.3s ease-in-out">
            {projects.map((project, index) => (
              <Box key={index} minW="200px" maxW="200px" p={4} bg={bg} color={color} borderRadius="md" boxShadow="md" position="relative">
                <VStack spacing={4} align="start">
                  <Box w="100%" h="150px" overflow="hidden" borderRadius="md" position="relative">
                    <Image src={project.image} alt={project.title} w="100%" h="100%" objectFit="cover" />
                    {project.profitability && (
                      <Tag colorScheme="green" position="absolute" bottom={2} right={2} fontWeight="bold">
                        {project.profitability}
                      </Tag>
                    )}
                  </Box>
                  <Text fontSize="lg" fontWeight="bold">{project.title}</Text>
                  <Text fontSize="sm">{project.description}</Text>
                  <Flex w="100%" justifyContent="flex-end">
                    <Button onClick={() => handleInvestClick(project)} colorScheme="blue">
                      Invertir
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </HStack>
        </Box>
        <IconButton
          onClick={nextProjects}
          colorScheme="blue"
          borderRadius="full"
          icon={<MdArrowForward />}
          aria-label="Next projects"
        />
      </Flex>
      {selectedProject && (
        <InvestmentCheckoutModal
          isOpen={isOpen}
          onClose={onClose}
          project={selectedProject}
        />
      )}
    </Box>
  );
};

export default InvestmentProjectsCarousel;
