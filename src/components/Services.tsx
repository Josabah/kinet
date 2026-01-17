import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    title: "Branding & Marketing Sites",
    description: "High-converting websites that establish your digital presence and drive results.",
    priceLabel: "STARTING AT",
    price: "$2,497",
    serviceId: "branding-marketing",
    features: [
      "Custom design & branding",
      "Responsive landing pages",
      "SEO optimization",
      "Analytics integration",
      "CMS integration",
    ],
    highlighted: false,
  },
  {
    title: "MVPs & Startups",
    description: "Launch your product fast with a fully functional MVP built for growth.",
    priceLabel: "STARTING AT",
    price: "$5,997",
    serviceId: "mvp-startup",
    features: [
      "3-4 core features",
      "User authentication",
      "Database integration",
      "Payment processing",
      "Admin dashboard",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    title: "Full-Scale Applications",
    description: "Enterprise-grade solutions with advanced features, security, and scalability.",
    priceLabel: "TAILORED",
    price: "Custom",
    serviceId: "full-scale",
    features: [
      "Complex feature sets",
      "API integrations",
      "Real-time functionality",
      "Custom infrastructure",
      "Ongoing support",
    ],
    highlighted: false,
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Transforming Ideas into
            <br />
            <span className="text-primary">Digital Realities</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive services tailored to accelerate your digital transformation and deliver measurable business
            impact.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: tier.highlighted 
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.4)" 
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.15)" 
              }}
              className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                tier.highlighted
                  ? "bg-foreground text-background"
                  : "bg-card border border-border hover:border-primary/30"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Title & Description */}
              <h3 className={`text-2xl font-display font-bold mb-2 ${
                tier.highlighted ? "text-background" : "text-foreground"
              }`}>
                {tier.title}
              </h3>
              <p className={`text-sm mb-6 ${
                tier.highlighted ? "text-background/70" : "text-muted-foreground"
              }`}>
                {tier.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-xs font-semibold tracking-wider ${
                  tier.highlighted ? "text-background/60" : "text-muted-foreground"
                }`}>
                  {tier.priceLabel}
                </span>
                <div className={`text-4xl font-display font-bold ${
                  tier.highlighted ? "text-background" : "text-foreground"
                }`}>
                  {tier.price}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      tier.highlighted ? "text-primary" : "text-primary"
                    }`} />
                    <span className={`text-sm ${
                      tier.highlighted ? "text-background/90" : "text-foreground"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={`#contact?service=${tier.serviceId}`}
                className={`mt-8 block text-center py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
