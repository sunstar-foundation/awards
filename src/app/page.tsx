import { Container } from "./components/container";
import { H1 } from "./components/typography";
import { EdhfLink } from "./edhf-link";
import { WdhaLink } from "./wdha-link";


export default function Home() {
  return (
    <Container>
      <H1>Sunstar Foundation Awards - Application forms</H1>
      <p>
        Welcome to the Sunstar Foundation Awards submission forms. Please select
        the appropriate form from the list below to begin your submission
        process. Each form is designed to gather specific information related to
        the respective award category. Ensure that you fill out all required
        fields accurately and completely.
      </p>

      <WdhaLink />
      <EdhfLink />
    </Container>
  );
}