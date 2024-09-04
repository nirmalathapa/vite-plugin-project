/// <reference types="vite/client" />

declare module "*.md" {
  const frontmatter: Record<string, any>;
  const html: string;
  export { frontmatter, html };
}
