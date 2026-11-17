// Dados editáveis da VEIGANET — atualize aqui planos, contatos e redes sociais.
export const site = {
  name: "VEIGANET",
  slogan: "Sua conexão com o futuro.",
  description:
    "Internet 100% fibra óptica para navegar, trabalhar, estudar, assistir e jogar com mais velocidade e estabilidade.",
  // Número no formato internacional, só dígitos. Ex.: 5511999999999
  whatsapp: "5589981161313",
  instagram: "https://instagram.com/",
  website: "https://veiganet.com.br",
  privacyUrl: "#",
  messages: {
    contratar: "Olá! Quero contratar a internet da VEIGANET.",
    cliente: "Olá! Já sou cliente VEIGANET e preciso de atendimento.",
    suporte: "Olá! Preciso de suporte técnico da VEIGANET.",
    geral: "Olá! Gostaria de falar com um atendente da VEIGANET.",
  },
};

export type Plan = {
  name: string;
  speed: number;
  price: string | null; // null = "Consulte" até a empresa definir
  benefits: string[]; // apenas benefícios confirmados pela empresa
  recommended?: boolean;
};

export const plans: Plan[] = [
  { name: "Plano Essencial", speed: 300, price: null, benefits: ["100% fibra óptica"] },
  { name: "Plano Família", speed: 500, price: null, benefits: ["100% fibra óptica"] },
  { name: "Plano Premium", speed: 600, price: null, benefits: ["100% fibra óptica"], recommended: true },
  { name: "Plano Ultra", speed: 800, price: null, benefits: ["100% fibra óptica"] },
];

export const faq = [
  { q: "Como faço para contratar a VEIGANET?", a: "Escolha seu plano e clique em \"Quero contratar\". Você será direcionado ao nosso WhatsApp para concluir o atendimento." },
  { q: "Como descubro se existe cobertura na minha região?", a: "Preencha o formulário de consulta de cobertura com seu endereço. Nossa equipe verifica e retorna pelo WhatsApp." },
  { q: "Como posso falar com o suporte técnico?", a: "Use a opção \"Preciso de suporte técnico\" na seção Atendimento ou o botão de WhatsApp no canto da tela." },
  { q: "Como faço para solicitar atendimento?", a: "Todo o atendimento é feito pelo nosso WhatsApp oficial. Escolha a opção que melhor descreve sua necessidade." },
  { q: "Como funciona a instalação?", a: "Após a confirmação da cobertura e da contratação, nossa equipe agenda a instalação com você. Detalhes são informados no atendimento." },
];

export const waLink = (msg: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
