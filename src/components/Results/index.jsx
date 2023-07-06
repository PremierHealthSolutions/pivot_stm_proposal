import {
  Alert,
  AlertIcon,
  Box,
  Code,
  FormControl,
  FormLabel,
  Heading,
  ListItem,
  Select,
  Stack,
  StackDivider,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { plans } from "../../data/pivot_response.json";
import useSite from "../../hooks/use-site";
import { formatter } from "../../support/format-usd";

const Results = () => {
  const { maxOOP, maxCoverage } = useSite();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let matches = [];

    for (const planId in plans) {
      const plan = plans[planId];
      if (
        plan.coreBenefits &&
        plan.coreBenefits.deductible === String(maxOOP) &&
        plan.coreBenefits.outOfPocketMax === String(maxOOP) &&
        plan.coreBenefits.lifetimeMax === maxCoverage &&
        plan.coreBenefits.rxScheduleDescription.includes("Discount Card Only")
      ) {
        matches.push(plan);
      }
    }

    if (matches.length) {
      setItems(matches);
    }
  }, [maxCoverage, maxOOP, plans]);
  return (
    <Box my={8}>
      <Stack direction="row" gap={8}>
        <Box flex="1">
          <Heading my={8}>Results</Heading>
          <Box>
            {items.map((plan, key) => (
              <Box key={key}>
                <VStack align="stretch" divider={<StackDivider />} gap={4}>
                  <Heading size="md">{`Plan: ${plan.planId}`}</Heading>
                  <Box>
                    <Heading mb={4} size="md">
                      Durations
                    </Heading>
                    <FormControl>
                      <FormLabel>Select Duration Limit</FormLabel>
                      <Select>
                        {plan.durations.map((duration, x) => (
                          <option key={x}>{`${duration.policyDuration} days / ${
                            duration.maxConsecutivePolicies
                          } term(s) - ${formatter.format(
                            duration.monthly.baseRate
                          )}`}</option>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <Heading mb={4} size="md">
                      Core Benefits
                    </Heading>
                    <VStack align="stretch">
                      {Object.keys(plan.coreBenefits)
                        .sort()
                        .map((key) => (
                          <VStack align="stretch">
                            <Box fontWeight="bold">{`${key}: `}</Box>
                            <Box>{plan.coreBenefits[key]}</Box>
                          </VStack>
                        ))}
                    </VStack>
                  </Box>
                  {/* <Box as="pre">{JSON.stringify(plan.durations, 0, 2)}</Box> */}
                </VStack>
              </Box>
            ))}
          </Box>
        </Box>
        <Box flex="0.2">
          <Box bg="gray.100" rounded="2xl" p={4}>
            <Heading mb={4} size="md">
              Logic for parsing API response
            </Heading>
            <UnorderedList spacing="4">
              <ListItem>
                Match <Code>coreBenefits.deductible</Code> to selected
                Deductible/Max OOP
              </ListItem>
              <ListItem>
                Match <Code>coreBenefits.outOfPocketMax</Code> to selected
                Deductible/Max OOP
              </ListItem>
              <ListItem>
                Match <Code>coreBenefits.lifetimeMax</Code> to selected Maximum
                Coverage Amount
                <Alert maxW="500px" mt={4}>
                  <AlertIcon /> Except for Indiana where $2,000,000 is required
                </Alert>
              </ListItem>
              <ListItem>
                Match <Code>coreBenefits.rxScheduleDescription</Code> to
                selected "Discount Card Only"
                <Alert maxW="500px" mt={4}>
                  <AlertIcon /> Except for Iowa where insured RX is required
                </Alert>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Results;
