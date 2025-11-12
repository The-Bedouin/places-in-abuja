import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { buildArticleJsonLd } from '@/lib/seo';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const ArticleTOC = dynamic(() => import('@/components/ArticleTOC'), { ssr: false });
const CommentSection = dynamic(() => import('@/components/CommentSection'), { ssr: false });
import RightRail from '@/components/RightRail';
import AbujaMap from '@/components/AbujaMap';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: post.image ? [post.image] : undefined,
      type: 'article'
    }
  };
}

const STREET_FOOD_SCHEMA = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://placesinabuja.com/#organization",
      "name": "Places in Abuja",
      "url": "https://placesinabuja.com/"
    },
    {
      "@type": "Person",
      "@id": "https://placesinabuja.com/author/femi-adebayo/#person",
      "name": "Femi Adebayo",
      "url": "https://placesinabuja.com/author/femi-adebayo",
      "jobTitle": "Chief Food Critic",
      "description": "Femi Adebayo is the Chief Food Critic and co-founder of Places in Abuja. Having lived in and written about the capital for over a decade, he has dedicated his career to exploring every corner of the city's culinary scene.",
      "worksFor": {
        "@id": "https://placesinabuja.com/#organization"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://placesinabuja.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Food & Drink",
          "item": "https://placesinabuja.com/food-drink-abuja"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "The Ultimate Abuja Street Food Guide"
        }
      ]
    },
    {
      "@type": "BlogPosting",
      "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja"
      },
      "headline": "The Ultimate Abuja Street Food Guide (Suya, Bole, Masa & More)",
      "description": "Your deep dive into the incredible world of Abuja's street food, from iconic dishes like Suya and Bole to the best neighbourhood hotspots and markets.",
      "datePublished": "2024-10-29T09:00:00+01:00",
      "dateModified": "2025-10-29T18:20:00+01:00",
      "author": {
        "@id": "https://placesinabuja.com/author/femi-adebayo/#person"
      },
      "publisher": {
        "@id": "https://placesinabuja.com/#organization"
      },
      "mentions": [
        {"@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#suya"},
        {"@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#bole"},
        {"@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#masa"},
        {"@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#wuse-market"},
        {"@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#garki"}
      ]
    },
    {
      "@type": "Recipe",
      "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#suya",
      "name": "Suya",
      "description": "The undisputed king of Nigerian street food. It consists of thinly sliced, expertly spiced meat grilled to perfection over a charcoal fire, doused in fiery yaji pepper and served with fresh onions and tomatoes.",
      "recipeCuisine": "Nigerian",
      "recipeCategory": "Street Food",
      "recipeIngredient": [
        "Beef or Chicken",
        "Yaji Pepper Spice",
        "Onions",
        "Tomatoes"
      ]
    },
    {
      "@type": "Recipe",
      "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#bole",
      "name": "Bole & Fish",
      "description": "A hearty and satisfying meal featuring ripe plantains roasted over charcoal until soft, sweet, and smoky, paired with a fiery pepper sauce and a whole grilled fish.",
      "recipeCuisine": "Nigerian",
      "recipeCategory": "Street Food",
      "recipeIngredient": [
        "Ripe Plantain",
        "Mackerel or Croaker Fish",
        "Pepper Sauce"
      ]
    },
    {
      "@type": "Recipe",
      "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#masa",
      "name": "Masa",
      "description": "Fluffy, slightly sour rice cakes, pan-fried to have a crispy exterior and a soft, tender inside, often served with Miyan Taushe (a rich pumpkin stew).",
      "recipeCuisine": "Northern Nigerian",
      "recipeCategory": "Street Food",
      "recipeIngredient": [
        "Rice",
        "Yeast",
        "Sugar"
      ]
    },
    {
      "@type": "FoodEstablishment",
      "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#wuse-market",
      "name": "Wuse Market Street Food Stalls",
      "description": "The chaotic, vibrant, and essential centre of Abuja's daytime street food scene.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Wuse",
        "addressRegion": "Abuja"
      }
    },
    {
      "@type": "Place",
      "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#garki",
      "name": "Garki Street Food Area",
      "description": "The traditional soul of Abuja street food, particularly around Area 1, 2, and 8, known for classic Suya and Bole."
    },
    {
      "@type": "FAQPage",
      "@id": "https://placesinabuja.com/food-drink-abuja/street-food-abuja#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it safe to eat street food in Abuja?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it can be very safe to enjoy street food in Abuja. The key is to choose vendors wisely. We recommend looking for popular spots with high customer turnover, ensuring the food is cooked fresh and hot in front of you, and observing the general cleanliness of the stall."
          }
        },
        {
          "@type": "Question",
          "name": "What is the most essential street food to try in Abuja?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The most essential and iconic street food to try in Abuja is Suya. It's thinly sliced, spiced meat grilled over charcoal and is considered a national obsession. It's the ultimate social food and a perfect introduction to the city's street food culture."
          }
        },
        {
          "@type": "Question",
          "name": "Which neighbourhood is best for authentic street food in Abuja?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For the most traditional and authentic street food experience, Garki is the top recommendation. The residential areas like Area 1, 2, and 8 are famous for their legendary neighbourhood spots that specialize in classic Suya and Bole with top-tier quality."
          }
        }
      ]
    }
  ]
}`;

const BAKERY_GUIDE_SCHEMA = `{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://placesinabuja.com/#organization", "name": "Places in Abuja", "url": "https://placesinabuja.com/" },
    { "@type": "Person", "@id": "https://placesinabuja.com/author/femi-adebayo/#person", "name": "Femi Adebayo", "url": "https://placesinabuja.com/author/femi-adebayo", "jobTitle": "Chief Food Critic", "description": "For this guide, he personally visited and vetted dozens of bakeries, from small, family-run shops to high-end artisanal bakeries, to ensure every recommendation meets the highest standards of quality, taste, and reliability.", "worksFor": { "@id": "https://placesinabuja.com/#organization" } },
    { "@type": "BreadcrumbList", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#breadcrumb", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://placesinabuja.com/" }, { "@type": "ListItem", "position": 2, "name": "Eat & Drink", "item": "https://placesinabuja.com/blog/food-drink-abuja" }, { "@type": "ListItem", "position": 3, "name": "The Ultimate Abuja Bakery Guide" } ] },
    { "@type": "BlogPosting", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#article", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja" }, "headline": "The Ultimate Abuja Bakery Guide (Best Bread, Cakes & Pastries)", "description": "Your definitive guide to finding the best bread, celebration cakes, and pastries in Abuja. Discover top-rated bakeries by neighborhood and specialty, based on in-depth, on-the-ground testing.", "image": [], "datePublished": "2025-10-30T11:00:00+01:00", "dateModified": "2025-10-30T11:00:00+01:00", "author": { "@id": "https://placesinabuja.com/author/femi-adebayo/#person" }, "publisher": { "@id": "https://placesinabuja.com/#organization" }, "mentions": [ {"@id": "https://placesinabuja.com/blog/bakery-guide-abuja#bread"}, {"@id": "https://placesinabuja.com/blog/bakery-guide-abuja#cakes"}, {"@id": "https://placesinabuja.com/blog/bakery-guide-abuja#pastries"}, {"@id": "https://placesinabuja.com/blog/bakery-guide-abuja#wuse2"}, {"@id": "https://placesinabuja.com/blog/bakery-guide-abuja#maitama"}, {"@id": "https://placesinabuja.com/blog/bakery-guide-abuja#garki"} ] },
    { "@type": "Product", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#bread", "name": "Fresh Bread", "description": "Including soft Nigerian-style bread, crusty artisanal sourdough, and healthy whole wheat loaves from Abuja's top bakeries." },
    { "@type": "Product", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#cakes", "name": "Celebration Cakes", "description": "Reliable and creative bakers in Abuja known for crafting beautiful custom-designed cakes for birthdays, anniversaries, and special events." },
    { "@type": "Product", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#pastries", "name": "Pastries & Snacks", "description": "Classic Nigerian pastries like flaky meat pies and sausage rolls, as well as buttery croissants and other savoury treats." },
    { "@type": "Place", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#wuse2", "name": "Wuse 2", "description": "The commercial heart of the city, home to many of Abuja's most popular and high-end bakeries with a wide variety of premium treats." },
    { "@type": "Place", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#maitama", "name": "Maitama", "description": "A refined area with a focus on high-quality, artisanal products and bespoke celebration cakes from exclusive, hidden gem bakeries." },
    { "@type": "Place", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#garki", "name": "Garki", "description": "The heartland for classic, no-fuss Nigerian baking, home to long-standing bakeries trusted by locals for delicious and affordable bread and meat pies." },
    { "@type": "FAQPage", "@id": "https://placesinabuja.com/blog/bakery-guide-abuja#faq", "mainEntity": [ { "@type": "Question", "name": "Where can I find the best birthday cake in Abuja?", "acceptedAnswer": { "@type": "Answer", "text": "Our guide highlights the most reliable and creative bakers in Abuja for celebration cakes. These bakeries are known for crafting beautiful custom designs that taste as incredible as they look, ensuring your event's centerpiece is perfect." } }, { "@type": "Question", "name": "Which bakeries in Abuja open early in the morning?", "acceptedAnswer": { "@type": "Answer", "text": "For those who want bread that is still warm from the oven, our guide includes a dedicated list of 'Early Bird Bakeries' that open their doors at the crack of dawn, telling you exactly where to go to pick up the freshest possible loaf at 7 AM." } }, { "@type": "Question", "name": "Where can I find artisanal or sourdough bread in Abuja?", "acceptedAnswer": { "@type": "Answer", "text": "We have a specific section dedicated to true bread connoisseurs, highlighting the dedicated artisanal bakers in Abuja who use high-quality ingredients and traditional methods to create exceptional loaves, including perfect crusty sourdough." } } ] }
  ]
}`;

const CAFE_GUIDE_SCHEMA = `{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://placesinabuja.com/#organization", "name": "Places in Abuja", "url": "https://placesinabuja.com/" },
    { "@type": "Person", "@id": "https://placesinabuja.com/author/femi-adebayo/#person", "name": "Femi Adebayo", "url": "https://placesinabuja.com/author/femi-adebayo", "jobTitle": "Chief Food Critic", "description": "As a long-time remote worker and coffee aficionado, he has personally tested dozens of cafes across the city, meticulously rating them on everything from Wi-Fi stability and outlet availability to the quality of their espresso.", "worksFor": { "@id": "https://placesinabuja.com/#organization" } },
    { "@type": "BreadcrumbList", "@id": "https://placesinabuja.com/blog/cafe-guide-abuja#breadcrumb", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://placesinabuja.com/" }, { "@type": "ListItem", "position": 2, "name": "Eat & Drink", "item": "https://placesinabuja.com/blog/food-drink-abuja" }, { "@type": "ListItem", "position": 3, "name": "The Ultimate Abuja Cafe Guide" } ] },
    { "@type": "BlogPosting", "@id": "https://placesinabuja.com/blog/cafe-guide-abuja#article", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://placesinabuja.com/blog/cafe-guide-abuja" }, "headline": "The Ultimate Abuja Cafe Guide (Best Coffee, Brunch & Work Spots)", "description": "Your definitive guide to Abuja's best cafes for coffee, brunch, and remote work. Find your perfect spot by neighborhood, vibe, or specialty, based on on-the-ground testing.", "image": [], "datePublished": "2025-10-30T10:00:00+01:00", "dateModified": "2025-10-30T10:00:00+01:00", "author": { "@id": "https://placesinabuja.com/author/femi-adebayo/#person" }, "publisher": { "@id": "https://placesinabuja.com/#organization" }, "mentions": [ {"@id": "https://placesinabuja.com/blog/cafe-guide-abuja#wuse2"}, {"@id": "https://placesinabuja.com/blog/cafe-guide-abuja#maitama"}, {"@id": "https://placesinabuja.com/blog/cafe-guide-abuja#garki"}, {"@id": "https://placesinabuja.com/blog/cafe-guide-abuja#jabi"} ] },
    { "@type": "Place", "@id": "https://placesinabuja.com/blog/cafe-guide-abuja#wuse2", "name": "Wuse 2", "description": "The trendy, high-energy epicentre of Abuja's cafe culture, with a high concentration of stylish and popular spots for brunch and co-working." },
    { "@type": "Place", "@id": "https://placesinabuja.com/blog/cafe-guide-abuja#maitama", "name": "Maitama", "description": "Known for a sophisticated, serene, and upscale cafe scene perfect for business meetings or a peaceful afternoon." },
    { "@type": "Place", "@id": "https://placesinabuja.com/blog/cafe-guide-abuja#garki", "name": "Garki", "description": "Offers a more grounded and relaxed cafe experience with beloved local spots and hidden gems ideal for focused work." },
    { "@type": "Place", "@id": "https://placesinabuja.com/blog/cafe-guide-abuja#jabi", "name": "Jabi", "description": "Features a modern, laid-back cafe scene with bright, airy spaces perfect for relaxed weekend outings." },
    { "@type": "FAQPage", "@id": "https://placesinabuja.com/blog/cafe-guide-abuja#faq", "mainEntity": [ { "@type": "Question", "name": "What is the best cafe for remote work in Abuja?", "acceptedAnswer": { "@type": "Answer", "text": "The best cafes for remote work in Abuja are those with tested high-speed Wi-Fi, ample plug sockets, and a moderate noise level. Our guide identifies specific spots that are optimized for productivity, ensuring you can work without frustrating connection drops." } }, { "@type": "Question", "name": "Which neighborhood has the trendiest cafes in Abuja?", "acceptedAnswer": { "@type": "Answer", "text": "Wuse 2 is the trendy, high-energy epicentre of Abuja's cafe culture. It boasts the highest concentration of stylish, popular, and talked-about cafes, making it the best destination if you want to be in the heart of the action." } }, { "@type": "Question", "name": "Where can I find a quiet cafe for a business meeting in Abuja?", "acceptedAnswer": { "@type": "Answer", "text": "Maitama is the ideal neighborhood for finding a quiet, upscale cafe suitable for a business meeting. The cafes there are known for their sophisticated, serene, and beautifully designed atmosphere with top-notch service." } } ] }
  ]
}`;

const FOOD_DRINK_GUIDE_SCHEMA = `{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://placesinabuja.com/#organization", "name": "Places in Abuja", "url": "https://placesinabuja.com/" },
    { "@type": "Person", "@id": "https://placesinabuja.com/author/femi-adebayo/#person", "name": "Femi Adebayo", "url": "https://placesinabuja.com/author/femi-adebayo", "jobTitle": "Chief Food Critic", "description": "Your complete guide to discovering Abuja's culinary landscape. Femi has spent years exploring and documenting the capital's best food and drink spots.", "worksFor": { "@id": "https://placesinabuja.com/#organization" } },
    { "@type": "BreadcrumbList", "@id": "https://placesinabuja.com/blog/food-drink-abuja#breadcrumb", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://placesinabuja.com/" }, { "@type": "ListItem", "position": 2, "name": "The Ultimate Guide to Food & Drink in Abuja (2025)" } ] },
    { "@type": "BlogPosting", "@id": "https://placesinabuja.com/blog/food-drink-abuja#article", "mainEntityOfPage": { "@type": "WebPage", "@id": "https://placesinabuja.com/blog/food-drink-abuja" }, "headline": "The Ultimate Guide to Food & Drink in Abuja (2025)", "description": "Your complete guide to discovering Abuja's incredible culinary landscape - from sizzling street suya to fine dining establishments.", "image": [], "datePublished": "2025-01-27T10:00:00+01:00", "dateModified": "2025-01-27T10:00:00+01:00", "author": { "@id": "https://placesinabuja.com/author/femi-adebayo/#person" }, "publisher": { "@id": "https://placesinabuja.com/#organization" } },
    // Add additional mentions, FAQPage, etc. as needed.
  ]
}`;

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  const baseUrl = 'https://places-in-abuja.vercel.app';
  const jsonLd = buildArticleJsonLd(post, baseUrl);

  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== post.slug);
  const related = (post.tags && post.tags.length > 0)
    ? others.filter((p) => p.tags?.some((t) => post.tags?.includes(t))).slice(0, 5)
    : others.slice(0, 5);

  const hasToc = /(^|\n)##\s+|(^|\n)###\s+/m.test(post.content);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Conditionally inject hardcoded schema for the street food guide only */}
      {params.slug === "street-food-abuja" && (
        <Script id="streetfood-graph-jsonld" type="application/ld+json" strategy="afterInteractive">
          {STREET_FOOD_SCHEMA}
        </Script>
      )}
      {params.slug === "bakery-guide-abuja" && (
        <Script id="bakery-guide-graph" type="application/ld+json" strategy="afterInteractive">
          {BAKERY_GUIDE_SCHEMA}
        </Script>
      )}
      {params.slug === "cafe-guide-abuja" && (
        <Script id="cafe-guide-graph" type="application/ld+json" strategy="afterInteractive">
          {CAFE_GUIDE_SCHEMA}
        </Script>
      )}
      {params.slug === "food-drink-abuja" && (
        <Script id="food-drink-guide-graph" type="application/ld+json" strategy="afterInteractive">
          {FOOD_DRINK_GUIDE_SCHEMA}
        </Script>
      )}
      <Script id="post-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

       {/* Left TOC - hidden below lg */}
       {hasToc ? (
        <aside className="hidden lg:block lg:col-span-2">
          <div className="sticky top-20 rounded-lg border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm shadow-2xl dark:shadow-lg p-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
             <ArticleTOC />
           </div>
         </aside>
       ) : null}

       {/* Center content */}
       <main className={`${hasToc ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-12 lg:col-span-9'}`}>
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:underline">
              <span aria-hidden>←</span>
              <span>Back</span>
            </Link>
          </div>
          <article id="article-content" className="prose dark:prose-invert max-w-none">
            <h1>{post.title}</h1>
            {post.image && (
              <div className="my-6">
                <Image src={post.image} alt="" width={1200} height={630} className="w-full h-auto rounded-lg" />
              </div>
            )}
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                },
              }}
            />
          </article>
          <CommentSection />
          <section aria-label="Related posts" className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Related posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {related.slice(0, 4).map((p) => (
                <article key={p.slug} className="group rounded-lg overflow-hidden backdrop-blur-[1px] bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 hover:border-2 hover:border-green-500 dark:hover:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
                  <Link href={`/blog/${p.slug}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={p.image || '/iloveabujasign.png'}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-white/10 dark:bg-black/20 backdrop-blur-[1px]" />
                      <div className="absolute -inset-y-10 -left-1/3 w-2/3 rotate-12 pointer-events-none 
                                      bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                      opacity-0 group-hover:opacity-100 transform -translate-x-1/2 
                                      group-hover:translate-x-[120%] transition duration-700 ease-out" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <div className="mb-2 flex flex-wrap gap-2">
                          {p.tags?.slice(0, 1).map((t) => (
                            <span key={t} className="text-sm px-2 py-1 bg-white/90 text-gray-800 rounded">{t}</span>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold leading-snug text-white drop-shadow-2xl shadow-black/70 line-clamp-2">{p.title}</h3>
                        {p.excerpt && (
                          <p className="mt-2 text-sm text-white/90 drop-shadow-xl shadow-black/60 line-clamp-2">{p.excerpt}</p>
                        )}
                        <p className="mt-3 text-sm text-white font-medium drop-shadow-2xl shadow-black/70">Read more →</p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
          <div className="mt-12">
            <AbujaMap />
          </div>
        </div>
      </main>

       {/* Right rail */}
       <aside className={`${hasToc ? 'md:col-span-12 lg:col-span-3' : 'md:col-span-12 lg:col-span-3'}`}>
         <div className="lg:sticky lg:top-20 rounded-lg border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm shadow-2xl dark:shadow-lg p-4">
           <RightRail related={related.map((p) => ({ slug: p.slug, title: p.title }))} />
         </div>
       </aside>
    </div>
  );
}


