import { InfoPage, InfoSection } from "@/components/info-page";

const sections: InfoSection[] = [
  {
    title: "Data We Collect",
    bullets: [
      "Contact details you share via forms or email",
      "Usage data from site analytics to improve performance",
      "Communications related to quotes and support",
    ],
  },
  {
    title: "How We Use It",
    bullets: [
      "Respond to inquiries and provide product information",
      "Improve site reliability and user experience",
      "Maintain records for compliance and service quality",
    ],
  },
  {
    title: "Your Choices",
    bullets: [
      "Request access, correction, or deletion of your data",
      "Opt out of non-essential communications",
      "Cookies: adjust browser settings to manage tracking",
    ],
  },
  {
    title: "Contact",
    bullets: [
      "Email: privacy@addiscable.et",
      "Address: Gelan Industrial Zone, Sheger City, Ethiopia",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="How Addis Cable collects, uses, and protects your information when you interact with us online or offline."
      sections={sections}
    />
  );
}
