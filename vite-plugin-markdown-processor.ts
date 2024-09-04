import { Plugin } from "vite";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";

interface PluginOptions {
  customCSS?: string;
}

export default function markdownProcessor(options: PluginOptions = {}): Plugin {
  const md = new MarkdownIt();

  return {
    name: "vite-plugin-markdown-processor",
    transform(code, id) {
      if (!id.endsWith(".md")) return null;

      const { content, data } = matter(code);
      const html = md.render(content);

      let result = `
        const frontmatter = ${JSON.stringify(data)};
        const html = ${JSON.stringify(html)};

        export { frontmatter, html };
        export default { frontmatter, html };
      `;

      // Add custom CSS
      if (options.customCSS) {
        result = `
          import '${options.customCSS}';
          ${result}
        `;
      }

      return {
        code: result,
        map: null,
      };
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".md")) {
        console.log("Markdown file updated:", file);
        server.ws.send({ type: "full-reload" });
        return [];
      }
    },
  };
}
