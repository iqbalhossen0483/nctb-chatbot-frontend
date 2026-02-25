import Container from "@/components/Container";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Container />
    </Suspense>
  );
};

export default Page;
