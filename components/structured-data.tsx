export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Enterprise AI Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    },
    description:
      "Enterprise-grade AI platform with LLM conversations, customizable agents, secure knowledge base, and Pay As You Go.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
    featureList: [
      "Advanced LLM Conversations",
      "Customizable Operations",
      "Incremental Knowledge Base",
      "Prompt Templates",
      "Pay As You Go",
      "Enterprise Security",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
