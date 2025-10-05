export interface BlogPostFrontmatter {
  title: string;
  date: string;
  tags?: string[];
  author?: string;
  image?: string;
  excerpt?: string;
  // Optional structured place info for schema.org enrichment
  place?: {
    type?: 'Place' | 'Restaurant' | 'TouristAttraction' | 'Park';
    name: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  };
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
  readingTime?: string;
}


