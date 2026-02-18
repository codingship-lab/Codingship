export type ServiceStatus = "Beta" | "Live" | "Deprecated";

export type Tag = { id: string; name: string; slug: string };

export type Service = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  embed_url: string | null;
  external_url: string | null;
  status: ServiceStatus;
  featured: boolean;
  published: boolean;
  logo_url: string | null;
  card_image_url: string | null;
  created_at: string;
  updated_at: string;
  tags: Tag[];
};

export type UserRole = "admin" | "user";
