import { WebElement } from "./elements";

export const rules: WebElement[] = [
    {
        slug: "rule-no-placeholders",
        name: "Rule: No Placeholders",
        description: "Never ship placeholder values (e.g., '0', '—') or empty containers. If data is missing, render a fallback state or remove the element.",
        category: "Core Rules",
        implementation: `// ❌ BAD
const UserProfile = ({ user }) => (
  <div>
    <h1>{user.name || "User Name"}</h1>
    <img src={user.avatar} />
  </div>
);

// ✅ GOOD
const UserProfile = ({ user }) => {
  if (!user) return null; // Or a specific skeleton loader
  
  return (
    <div>
       <h1>{user.name}</h1>
       <img 
         src={user.avatar} 
         onError={(e) => { e.currentTarget.src = '/fallback-avatar.png' }}
       />
    </div>
  );
}`,
        usage: "Apply this rule to all dynamic data components.",
        accessibility: [
            "Placeholders can be confusing to screen readers.",
            "Empty containers can cause layout shifts."
        ]
    },
    {
        slug: "rule-mobile-overflow",
        name: "Rule: Mobile Overflow Prevention",
        description: "Every layout container must prevent horizontal overflow. Use overflow-hidden on sections and break-words for text.",
        category: "Core Rules",
        implementation: `// Global CSS or Layout wrapper
.main-container {
  overflow-x: hidden;
  max-width: 100vw;
}

// Typography
.headline {
  overflow-wrap: break-word;
  hyphens: auto;
}`,
        usage: "<main className=\"overflow-x-hidden min-h-screen\">...</main>",
        accessibility: [
            "Horizontal scrolling on mobile is a major WCAG failure (Reflow).",
            "Ensure content fits within 320px width."
        ]
    }
];
