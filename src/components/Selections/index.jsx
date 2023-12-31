import {
  Box,
  Code,
  FormControl,
  FormLabel,
  Heading,
  ListItem,
  Select,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react";
import { maxCoverages } from "../../data/max-coverages";
import { maxOopOptions } from "../../data/max-oop";
import useSite from "../../hooks/use-site";
const Selections = () => {
  const { setMaxCoverage, setMaxOOP, setPlanType } = useSite();
  function handleCoverageAmount(e) {
    const value = e.currentTarget.value;
    setMaxCoverage(value);
  }
  function handleOOPChange(e) {
    const value = e.currentTarget.value;
    setMaxOOP(value);
  }
  function handlePlanTypeChange(e) {
    const value = e.currentTarget.value;
    setPlanType(value);
  }
  return (
    <Box mt={4}>
      <Heading mb="4">Notes</Heading>
      <Box>
        <UnorderedList>
          <ListItem>
            This is just a proposal of how Pivot STM could work
          </ListItem>
          <ListItem>
            Data is not fetching from live API, it is pulling from{" "}
            <Code>data/pivot_response.json</Code> which was copy/pasted from
            Rate Validation area in e123.
          </ListItem>
          <ListItem>
            Rating factors for this API response are:
            <UnorderedList>
              <ListItem>
                <strong>Primary member only</strong>
              </ListItem>
              <ListItem>
                <strong>Zip Code:</strong> 75007 (Texas)
              </ListItem>
              <ListItem>
                <strong>Gender:</strong> Male
              </ListItem>
              <ListItem>
                <strong>DOB:</strong> 03/13/1986
              </ListItem>
              s
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </Box>
      <Heading my={8}>Make Selections</Heading>
      <SimpleGrid columns={4} gap={4}>
        <FormControl>
          <FormLabel>Plan Type</FormLabel>
          <Select
            name="planType"
            onChange={handlePlanTypeChange}
            placeholder="Make Selection"
          >
            <option value={"EPIC_BASE"}>EPIC_BASE</option>
            <option value={"EPIC_PPO"}>EPIC_PPO</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Deductible / Max OOP</FormLabel>
          <Select
            name="maxOOP"
            onChange={handleOOPChange}
            placeholder="Make Selection"
          >
            {Object.keys(maxOopOptions).map((key) => (
              <option key={key} value={key}>
                {maxOopOptions[key]}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Maximum Coverage Amount</FormLabel>
          <Select
            name="coverageAmount"
            onChange={handleCoverageAmount}
            placeholder="Make Selection"
          >
            {Object.keys(maxCoverages).map((key) => (
              <option key={key} value={key}>
                {maxCoverages[key]}
              </option>
            ))}
          </Select>
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default Selections;
