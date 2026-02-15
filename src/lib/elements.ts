import { patterns } from "./patterns";
import { vocabulary } from "./vocabulary";
import { rules } from "./rules";

export interface WebElement {
  slug: string;
  name: string;
  description: string;
  category: string;
  implementation: string;
  usage: string;
  accessibility: string[];
}

const baseElements: WebElement[] = [
  {
    slug: "semantic-button",
    name: "Semantic Button",
    description: "A button element properly accessible with WAI-ARIA attributes and semantic HTML.",
    category: "Forms",
    implementation: `import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
  };

  return (
    <button 
      className={\`\${baseStyles} \${variants[variant]} \${className || ''}\`}
      type="button"
      {...props}
    />
  );
};`,
    usage: `<Button variant="primary" onClick={() => console.log('Clicked')}>
  Submit
</Button>`,
    accessibility: [
      "Uses native <button> element for keyboard support.",
      "Explicit type='button' prevents accidental form submission.",
      "Focus rings are preserved for keyboard navigation."
    ]
  },
  {
    slug: "accessible-card",
    name: "Accessible Card",
    description: "A content card component with proper heading hierarchy and focus states.",
    category: "Layout",
    implementation: `export const Card = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <article className="border rounded shadow-sm p-4 bg-white">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <div className="text-gray-600">
      {children}
    </div>
  </article>
);`,
    usage: `<Card title="Card Title">
  This is the card content.
</Card>`,
    accessibility: [
      "Uses <article> for semantic containment.",
      "Uses <h3> for proper heading hierarchy (adjust based on context).",
    ]
  }
];

export const elements: WebElement[] = [
  ...baseElements,
  ...patterns,
  ...vocabulary,
  ...rules
];

export function getElement(slug: string): WebElement | undefined {
  return elements.find(el => el.slug === slug);
}
