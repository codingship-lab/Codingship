import { Service } from "@/lib/types";

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Prompt Studio",
    slug: "prompt-studio",
    short_description: "Prototype prompt flows with reusable blocks.",
    full_description: "## About\nBuild and test prompt chains.\n\n## Use cases\n- Internal copilots\n- Knowledge agents\n\n## Examples\nTry customer support intent classification.",
    embed_url: "https://example.com",
    external_url: "https://example.com",
    status: "Live",
    featured: true,
    published: true,
    logo_url: null,
    card_image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [{ id: "t1", name: "Productivity", slug: "productivity" }]
  },
  {
    id: "2",
    name: "Vision QA",
    slug: "vision-qa",
    short_description: "Ask questions over screenshots and diagrams.",
    full_description: "## About\nVisual reasoning sandbox.",
    embed_url: null,
    external_url: "https://example.org",
    status: "Beta",
    featured: false,
    published: true,
    logo_url: null,
    card_image_url: null,
    created_at: new Date(Date.now() - 10000000).toISOString(),
    updated_at: new Date().toISOString(),
    tags: [{ id: "t2", name: "Vision", slug: "vision" }]
  }
];
