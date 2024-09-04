import "./style.css";
import { frontmatter, html } from "./content/sample.md";

console.log(frontmatter);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="markdown-content">
      <h1>${frontmatter.title || "Untitled"}</h1>
      <p>${html}</p>
    </div>
  </div>
`;
