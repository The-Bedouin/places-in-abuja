import type { BlogPost } from '@/types/content';

export function buildArticleJsonLd(post: BlogPost, baseUrl: string) {
  const article: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: post.author ? { '@type': 'Person', name: post.author } : undefined,
    image: post.image ? [absoluteUrl(baseUrl, post.image)] : undefined,
    description: post.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`
    }
  };

  const placeSchema = buildPlaceJsonLd(post, baseUrl);
  return placeSchema ? [article, placeSchema] : article;
}

export function buildPlaceJsonLd(post: BlogPost, baseUrl: string) {
  if (!post.place) return null;
  const t = post.place.type || 'Place';
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': t,
    name: post.place.name,
    address: post.place.address,
  };
  if (typeof post.place.latitude === 'number' && typeof post.place.longitude === 'number') {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: post.place.latitude,
      longitude: post.place.longitude
    };
  }
  return schema;
}

function absoluteUrl(base: string, url: string) {
  try {
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}


