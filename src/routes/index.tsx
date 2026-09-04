import { createFileRoute } from "@tanstack/react-router";
import { KaskadeSandbox } from "@/components/kaskade/sandbox";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <KaskadeSandbox />;
}
