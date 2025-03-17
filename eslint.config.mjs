import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

// Get directory name for proper path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat for legacy config support
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

// Define ESLint configuration with optimized settings
const eslintConfig = [
  // Include recommended ESLint configs
  js.configs.recommended,

  // Add Next.js specific configurations with core-web-vitals for performance
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add TypeScript strict rules for better type safety
  ...tseslint.configs.recommended,

  // Performance optimization: only lint TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Enforce React hooks rules for better performance
      "react-hooks/exhaustive-deps": "warn",

      // Disable some rules that might conflict with Next.js patterns
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // Enforce proper imports for better code organization
      "import/no-anonymous-default-export": "warn",
    },
  },

  // Add Tailwind CSS linting for better CSS performance
  ...compat.config({
    extends: ["plugin:tailwindcss/recommended"],
  }),

  // Add Prettier for consistent formatting
  ...compat.config({
    extends: ["prettier"],
  }),

  // Ignore build artifacts and dependencies for faster linting
  { ignores: ["node_modules/**", ".next/**", "out/**"] },
];

export default eslintConfig;
