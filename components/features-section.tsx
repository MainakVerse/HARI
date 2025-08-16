import FeatureCard from "@/components/feature-card"
import {
  BotIcon,
  SparklesIcon,
  DatabaseIcon,
  ShieldIcon,
  FileTextIcon,
  ServerIcon,
  LockIcon,
  ZapIcon,
} from "@/components/feature-icons"

export default function FeaturesSection() {
  const features = [
    {
      icon: <BotIcon />,
      title: "Advanced LLM Conversations",
      description:
        "Switch between different language models to find the perfect fit for your specific use case with built-in performance analytics.",
      accentColor: "rgba(36, 101, 237, 0.5)",
    },
    {
      icon: <SparklesIcon />,
      title: "Customizable Agents",
      description: "Use our built-in agents or create your own to automate complex workflows and tasks.",
      accentColor: "rgba(236, 72, 153, 0.5)",
    },
    {
      icon: <DatabaseIcon />,
      title: "Enterprise Knowledge Base",
      description: "Secure knowledge management with fine-grained access controls and reference tracking.",
      accentColor: "rgba(34, 211, 238, 0.5)",
    },
    {
      icon: <ShieldIcon />,
      title: "Enterprise Security",
      description: "Bank-level encryption, compliance controls, and data sovereignty options.",
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <FileTextIcon />,
      title: "Prompt Templates",
      description: "Access our extensive library of prompt templates or create custom ones for your organization.",
      accentColor: "rgba(249, 115, 22, 0.5)",
    },
    {
      icon: <ServerIcon />,
      title: "Pay As You Go",
      description: "Configure your own MCP servers for enhanced performance and control.",
      accentColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      icon: <LockIcon />,
      title: "Data Privacy & Compliance",
      description:
        "Meet regulatory requirements with comprehensive compliance features including GDPR, HIPAA, and SOC 2.",
      accentColor: "rgba(251, 191, 36, 0.5)",
    },
    {
      icon: <ZapIcon />,
      title: "Real-time Collaboration",
      description: "Enable teams to work together seamlessly with shared workspaces and collaborative AI sessions.",
      accentColor: "rgba(16, 185, 129, 0.5)",
    },
  ]

  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10" id="features" aria-labelledby="features-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Key Features
            </div>
            <h2 id="features-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              AI Human Resource Platform
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Designed specifically for organizations that demand creativity, customization, and intelligence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
