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
import texas_plans from "../../data/pivot_texas_updated.json";
import iowa_plans from "../../data/pivot_iowa.json";
import kansas_plans from "../../data/pivot_kansas.json";
import florida_plans from "../../data/pivot_florida.json";
import missouri_plans from "../../data/pivot_missouri.json";
import indiana_plans from "../../data/pivot_indiana.json";
import id_plans from "../../data/pivot_id.json";
import nc_plans from "../../data/pivot_nc.json";
import nd_plans from "../../data/pivot_nd.json";
import va_plans from "../../data/pivot_va.json";
import sc_plans from "../../data/pivot_sc.json";
import useSite from "../../hooks/use-site";
import { formatter } from "../../support/format-usd";

const dataSelection = {
  TX: texas_plans,
  IA: iowa_plans,
  FL: florida_plans,
  KS: kansas_plans,
  MO: missouri_plans,
  ID: id_plans,
  IN: indiana_plans,
  NC: nc_plans,
  ND: nd_plans,
  SC: sc_plans,
  VA: va_plans,
};

const Results = () => {
  const { maxOOP, maxCoverage, planType } = useSite();
  const [items, setItems] = useState([]);
  const [dataSource, setDataSource] = useState(texas_plans);
  const [dataState, setDataState] = useState("Texas");

  useEffect(() => {
    let matches = [];
    const discountText =
      dataState === "IA"
        ? "$500 Deductible Then Copay Applies ($5/$35/$75) $1000 Benefit Max"
        : "Discount Card Only";
    for (const planId in dataSource.plans) {
      const plan = dataSource.plans[planId];
      if (
        plan.complianceProductLine === planType &&
        plan.coreBenefits &&
        plan.coreBenefits.deductible === String(maxOOP) &&
        plan.coreBenefits.outOfPocketMax === String(maxOOP) &&
        plan.coreBenefits.lifetimeMax === maxCoverage &&
        plan.coreBenefits.rxScheduleDescription.includes(discountText)
      ) {
        matches.push(plan);
      }
    }

    setItems(matches);
  }, [maxCoverage, maxOOP, dataSource]);

  function handleDataChange(e) {
    const val = e.target.value;

    if (val in dataSelection) {
      setDataState(val);
      setDataSource(dataSelection[val]);
    }
  }
  return (
    <Box my={8}>
      <Stack direction="row" gap={8}>
        <Box flex="1">
          <FormControl>
            <FormLabel>Data Source</FormLabel>
            <Select
              name="maxOOP"
              onChange={handleDataChange}
              placeholder="Select Data Source"
            >
              {Object.keys(dataSelection).map((key) => (
                <option value={key}>{key}</option>
              ))}
            </Select>
          </FormControl>
          <Heading my={8}>Results</Heading>
          <Box>
            {items.length === 0 && (
              <Alert status="warning">
                <AlertIcon />
                No results found
              </Alert>
            )}
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
                      Monthly Fees
                    </Heading>
                    <VStack align="stretch" divider={<StackDivider />} gap={4}>
                      {plan.durations.map((duration, x) => (
                        <Box key={x}>
                          <Heading size="lg">{`${
                            duration.policyDuration
                          } days / ${
                            duration.maxConsecutivePolicies
                          } term(s) - ${formatter.format(
                            duration.monthly.baseRate
                          )}`}</Heading>
                          {duration.monthly.fees.map(({ name, value }, p) => (
                            <Box key={p}>
                              <Box fontWeight="bold">{name}</Box>
                              <Box>{formatter.format(value)}</Box>
                            </Box>
                          ))}
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                  <Box>
                    <Heading mb={4} size="md">
                      Core Benefits
                    </Heading>
                    <VStack align="stretch">
                      {Object.keys(plan.coreBenefits)
                        .sort()
                        .map((key, i) => (
                          <VStack align="stretch" key={i}>
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
                Match <Code bg="gray.300">complianceProductLine</Code> to
                selected EPIC_BASE
              </ListItem>
              <ListItem>
                Match <Code bg="gray.300">coreBenefits.deductible</Code> to
                selected Deductible/Max OOP
              </ListItem>
              <ListItem>
                Match <Code bg="gray.300">coreBenefits.outOfPocketMax</Code> to
                selected Deductible/Max OOP
              </ListItem>
              <ListItem>
                Match <Code bg="gray.300">coreBenefits.lifetimeMax</Code> to
                selected Maximum Coverage Amount
                <Alert maxW="500px" mt={4}>
                  <AlertIcon /> Except for Indiana where $2,000,000 is required
                </Alert>
              </ListItem>
              <ListItem>
                Match{" "}
                <Code bg="gray.300">coreBenefits.rxScheduleDescription</Code> to
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
