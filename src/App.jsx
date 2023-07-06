import { ChakraProvider, Container } from "@chakra-ui/react";
import Selections from "./components/Selections";
import Results from "./components/Results";
import { SiteContext, useSiteContext } from "./hooks/use-site";

function App() {
  return (
    <ChakraProvider>
      <SiteContext.Provider value={useSiteContext({})}>
        <Container maxW="container.xl">
          <Selections />
          <Results />
        </Container>
      </SiteContext.Provider>
    </ChakraProvider>
  );
}

export default App;
