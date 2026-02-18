import { mockServices } from "@/lib/mock-data";

export async function listPublishedServices() {
  return mockServices.filter((service) => service.published);
}

export async function getPublishedServiceBySlug(slug: string) {
  return mockServices.find((service) => service.published && service.slug === slug) ?? null;
}
