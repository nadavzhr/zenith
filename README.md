# Bytelog

Bytelog is a personal "digital vault" and learning catalyst. It serves as a permanent, searchable home for technical notes, articles, and references, functioning similarly to an Obsidian vault but built for my self. The goal is to create a space where I can document my learning journey, share insights, and hold myself accountable to clarity and accuracy.

## The Philosophy

The core of this project is driven by two main principles:

1.  **The Feynman Technique**:
    > "If you cannot explain a concept simply, you do not understand it well enough."
    > — Richard Feynman

    Writing these articles forces me to distill complex topics into their simplest forms, ensuring true mastery.
2.  **First Principles**: I aim to break down complex systems and concepts by starting from their most fundamental truths.
3.  **Accountability**: By putting this content on the public web, I hold myself to a higher standard of accuracy and clarity. It's a way to ensure I don't just "spew bullshit" while I learn, even if no one ever reads it (most likely).

## Infrastructure & Simplicity

I chose **Astro** to power Bytelog because it handles all the heavy lifting of infrastructure (routing, performance, SEO, build pipelines) so I can focus on what matters: **learning and writing.**

The goal is absolute simplicity:
- **Content-First**: Adding new content is as simple as creating an `.mdx` file.
- **Markdown with Superpowers**: I write in standard Markdown, but I have the option to drop in interactive React components, complex graphs, or data visualizations exactly where they are needed to explain a point.
- **Topic-First Organization**: Unlike a traditional blog that decays over time, content here is organized by **Topic**, keeping information structured and evergreen.

## High-Level Features

-   **Static Search**: Instant, full-text search powered by Pagefind (runs entirely in the browser).
-   **Math Precision**: First-class LaTeX support via KaTeX for technical writing.
-   **Islands of Interactivity**: Reach for React components only when a static explanation isn't enough.
-   **Editorial Design**: A minimalist, high-contrast aesthetic designed for long-form reading.

## Handling Images

Bytelog uses **Astro's Assets API** to automatically optimize images. 

1.  **Placement**: Place all images (covers, inline photos) in `src/assets/`.
2.  **Article Covers**: Reference the image in your frontmatter using a relative path:
    ```md
    ---
    title: My Article
    cover: ../../assets/my-image.png
    ---
    ```
3.  **Optimization**: During the build process, Astro will automatically resize the image, compress it, and convert it to modern formats like WebP or AVIF.
4.  **Islands**: For custom React components that need images, import them directly from `src/assets/`.

## Workflow

1.  **Think**: Research a new topic from first principles.
2.  **Write**: Ensure `src/content/topics/<topic>.mdx` exists, then write the article under `src/content/articles/<topic>/<article-name>.mdx`, using Markdown and React components as needed.
3.  **Refine**: Simplify the explanation until it passes the Feynman test.
4.  **Deploy**: Push to GitHub; Astro builds the static site into the `/docs` folder for hosting on GitHub Pages.

---
© 2026 Bytelog. All rights reserved.
