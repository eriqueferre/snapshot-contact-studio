import { createFileRoute } from "@tanstack/react-router";
import { Header, Hero, Features, Plans, Coverage, About, Support, Faq, Footer, WhatsFab } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEIGANET — Internet 100% Fibra Óptica" },
      { name: "description", content: "VEIGANET: internet 100% fibra óptica com velocidade e estabilidade. Conheça os planos e consulte a cobertura." },
      { property: "og:title", content: "VEIGANET — Sua conexão com o futuro" },
      { property: "og:description", content: "Internet 100% fibra óptica. Conheça os planos e consulte a cobertura no seu endereço." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main><Hero /><Features /><Plans /><Coverage /><About /><Support /><Faq /></main>
      <Footer />
      <WhatsFab />
    </>
  );
}
