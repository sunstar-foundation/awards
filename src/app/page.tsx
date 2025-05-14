import { Container } from "./components/container";
import { H1 } from "./components/typography";

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
      <a href="/world-dental-hygienist-awards">
        <button className="px-4 py-2 text-white bg-bluecolor hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[150px] cursor-pointer">
          World Dental Hygienist Award
        </button>
      </a>
      <a href="/gum-edhf-award-of-distinction">
        <button className="px-4 py-2 text-white bg-bluecolor hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[150px] cursor-pointer">
          GUM EDHF Award of Distinction
        </button>
      </a>
    </Container>
  );
}
