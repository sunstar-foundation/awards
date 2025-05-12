import { Container } from "./components/container";

export default function Home() {
  return (
    <Container>
      <h1>Sunstar Foundation - Awards submissionf forms</h1>
      <p>
        Welcome to the Sunstar Foundation Awards submission forms. Please select
        the appropriate form from the list below to begin your submission
        process. Each form is designed to gather specific information related to
        the respective award category. Ensure that you fill out all required
        fields accurately and completely.
      </p>
      <a href="/wdha">
        <button className="px-4 py-2 text-white bg-bluecolor hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[150px] cursor-pointer">
          World Dental Hygienist Award
        </button>
      </a>
      <a href="/awards/2023">
        <button className="px-4 py-2 text-white bg-bluecolor hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[150px] cursor-pointer">
          European Dental Hygienist Award
        </button>
      </a>
    </Container>
  );
}
