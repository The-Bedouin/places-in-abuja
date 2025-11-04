import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
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
import RightRail from '@/components/RightRail';
import AbujaMap from '@/components/AbujaMap';

export async function generateMetadata(): Promise<Metadata> {
	const post = await getPostBySlug('best-restaurants-abuja');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article'
		}
	};
}

export default async function BestRestaurantsPage() {
	const post = await getPostBySlug('best-restaurants-abuja');
	if (!post) return notFound();
	
	const baseUrl = 'https://placesinabuja.com';

	const SCHEMA_JSON = `{
	  "@context": "https://schema.org",
	  "@graph": [
	    {
	      "@type": "Organization",
	      "@id": "https://placesinabuja.com/#organization",
	      "name": "Places in Abuja",
	      "url": "https://placesinabuja.com/",
	      "logo": { "@type": "ImageObject", "url": "https://placesinabuja.com/logo.svg" }
	    },
	    {
	      "@type": "Person",
	      "@id": "https://placesinabuja.com/author/femi-adebayo/#person",
	      "name": "Femi Adebayo",
	      "url": "https://placesinabuja.com/author/femi-adebayo",
	      "jobTitle": "Chief Food Critic",
	      "description": "For this guide, he personally visited hundreds of establishments—from high-end fine dining rooms to hidden local canteens—to meticulously vet each recommendation for quality, consistency, and overall experience.",
	      "worksFor": { "@id": "https://placesinabuja.com/#organization" }
	    },
	    {
	      "@type": "BreadcrumbList",
	      "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#breadcrumb",
	      "itemListElement": [
	        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://placesinabuja.com/" },
	        { "@type": "ListItem", "position": 2, "name": "Food & Drink", "item": "https://placesinabuja.com/food-drink" },
	        { "@type": "ListItem", "position": 3, "name": "Best Restaurants in Abuja" }
	      ]
	    },
	    {
	      "@type": "BlogPosting",
	      "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#article",
	      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja" },
	      "headline": "Best Restaurants in Abuja (Our Ultimate 2025 List)",
	      "description": "The definitive, constantly updated guide to the best restaurants in Abuja. Discover top-rated spots by area, cuisine, and vibe, all vetted by local food experts.",
	      "datePublished": "2025-10-31T17:29:00+01:00",
	      "dateModified": "2025-10-31T17:29:00+01:00",
	      "author": { "@id": "https://placesinabuja.com/author/femi-adebayo/#person" },
	      "publisher": { "@id": "https://placesinabuja.com/#organization" },
	      "mentions": [
	        {"@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#wuse2"},
	        {"@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#maitama"},
	        {"@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#garki"},
	        {"@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#jabi"},
	        {"@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#asokoro"}
	      ]
	    },
	    { "@type": "Place", "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#wuse2", "name": "Wuse 2", "description": "The vibrant, beating heart of Abuja's dining scene, with a high density of trendy and beloved restaurants." },
	    { "@type": "Place", "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#maitama", "name": "Maitama", "description": "An upscale district known for luxurious and sophisticated restaurants, ideal for fine dining and special celebrations." },
	    { "@type": "Place", "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#garki", "name": "Garki", "description": "Offers an authentic taste of Abuja, celebrated for incredible value and fantastic traditional Nigerian canteens." },
	    { "@type": "Place", "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#jabi", "name": "Jabi", "description": "A modern, scenic area known for relaxed, family-friendly dining and beautiful waterfront restaurants." },
	    { "@type": "Place", "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#asokoro", "name": "Asokoro", "description": "The city's exclusive diplomatic quarter, offering a quiet and discreet dining scene with elegant, high-end establishments." },
	    {
	      "@type": "FAQPage",
	      "@id": "https://placesinabuja.com/food-drink/best-restaurants-abuja#faq",
	      "mainEntity": [
	        { "@type": "Question", "name": "What is the best area in Abuja for a social dinner with lots of options?", "acceptedAnswer": { "@type": "Answer", "text": "Wuse 2 is the vibrant, beating heart of Abuja's dining scene and the best area for a social dinner. It has an unmatched density of high-quality restaurants catering to every taste and budget, from the city's trendiest new openings to its most beloved institutions." } },
	        { "@type": "Question", "name": "Where can I find the best restaurants for luxury fine dining in Abuja?", "acceptedAnswer": { "@type": "Answer", "text": "For a refined and exclusive fine dining experience, Maitama is the undisputed champion. This upscale district is home to Abuja's most luxurious and sophisticated restaurants, making it the go-to destination for special celebrations and high-stakes business dinners." } },
	        { "@type": "Question", "name": "Which restaurants in Abuja are best for authentic Nigerian food?", "acceptedAnswer": { "@type": "Answer", "text": "Our guide features a dedicated list for the best Nigerian restaurants. These spots serve up authentic, home-style cooking that celebrates diverse culinary traditions, from perfectly prepared pounded yam to flavour-packed bowls of Afang and Edikang Ikong soup. Garki is a particularly strong neighborhood for finding traditional canteens." } }
	      ]
	    }
	  ]
	}`;

	const { getAllPosts } = await import('@/lib/posts');
	const allPosts = await getAllPosts();
	const related = allPosts
		.filter((p) => p.slug !== post.slug)
		.filter((p) => p.tags?.some((t) => post.tags?.includes(t)))
		.slice(0, 5)
		.map((p) => ({ slug: p.slug, title: p.title }));

	const hasToc = /(^|\n)##\s+|(^|\n)###\s+/m.test(post.content);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
				<Script id="best-restaurants-graph" type="application/ld+json" strategy="afterInteractive">
					{SCHEMA_JSON}
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
				<main
					className={`${hasToc ? 'lg:col-span-8' : 'lg:col-span-10'} col-span-1`}
				>
					<article className="prose prose-lg dark:prose-invert max-w-none">
						<header className="mb-8">
							<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
							{post.excerpt && (
								<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>
							)}
							{post.image && (
								<div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
									<Image
										src={post.image}
										alt={post.title}
										fill
										className="object-cover"
										priority
									/>
								</div>
							)}
							<div className="flex flex-wrap gap-2 mb-6">
								{post.tags?.map((tag) => (
									<Link
										key={tag}
										href={`/blog?tag=${encodeURIComponent(tag)}`}
										className="chip"
									>
										{tag}
									</Link>
								))}
							</div>
						</header>

						<div className="prose prose-lg dark:prose-invert max-w-none">
							<MDXRemote
								source={post.content}
								options={{
									mdxOptions: {
										rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
										remarkPlugins: [remarkGfm]
									}
								}}
							/>
						</div>
					</article>
				</main>

				{/* Right rail */}
				<aside className="lg:col-span-2 col-span-1">
					<RightRail related={related} />
				</aside>
			</div>

			{/* Bottom map */}
			<div className="mt-16">
				<AbujaMap />
			</div>
		</>
	);
}
