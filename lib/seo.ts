import type { BlogPost } from '@/types/content';

export function buildArticleJsonLd(post: BlogPost, baseUrl: string) {
  // Format dates with timezone (using West Africa Time - WAT)
  const formatDateWithTimezone = (dateString: string) => {
    const date = new Date(dateString);
    // Add timezone offset for West Africa Time (UTC+1)
    const offsetDate = new Date(date.getTime() + (1 * 60 * 60 * 1000));
    return offsetDate.toISOString().replace('Z', '+01:00');
  };

  const article: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: formatDateWithTimezone(post.date),
    dateModified: formatDateWithTimezone(post.date),
    author: post.author ? { 
      '@type': 'Person', 
      name: post.author,
      url: `${baseUrl}/about` // Adding author URL
    } : undefined,
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


