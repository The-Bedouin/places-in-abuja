import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const ArticleTOC = dynamic(() => import('@/components/ArticleTOC'), { ssr: false });
import RightRail from '@/components/RightRail';
import AbujaMap from '@/components/AbujaMap';

export async function generateMetadata(): Promise<Metadata> {
	const post = await getPostBySlug('shopping-abuja');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: post.canonical || 'https://www.placesinabuja.com/things-to-do/shopping-abuja'
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article',
			url: post.canonical || 'https://www.placesinabuja.com/things-to-do/shopping-abuja'
		}
	};
}

export default async function ShoppingPage() {
	const post = await getPostBySlug('shopping-abuja');
	if (!post) return notFound();
	
	const baseUrl = 'https://www.placesinabuja.com';

	const SCHEMA_JSON = `{
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": "https://www.placesinabuja.com/#organization",
				"name": "Places in Abuja",
				"url": "https://www.placesinabuja.com/"
			},
			{
				"@type": "Person",
				"@id": "https://www.placesinabuja.com/about#the-bedouin",
				"name": "The-Bedouin",
				"url": "https://www.placesinabuja.com/about",
				"jobTitle": "Founder",
				"description": "The-Bedouin is the founder of Places in Abuja and a 25-year resident of the capital. He has spent more money than he'd like to admit in Maitama boutiques but believes a successful trip to Wuse Market is the ultimate shopping win.",
				"worksFor": {
					"@id": "https://www.placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#breadcrumb",
				"itemListElement": [
					{
						"@type": "ListItem",
						"position": 1,
						"name": "Home",
						"item": "https://www.placesinabuja.com/"
					},
					{
						"@type": "ListItem",
						"position": 2,
						"name": "Things to Do",
						"item": "https://www.placesinabuja.com/things-to-do"
					},
					{
						"@type": "ListItem",
						"position": 3,
						"name": "The Ultimate Guide to Shopping in Abuja"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja"
				},
				"headline": "The Ultimate Guide to Shopping in Abuja (2025)",
				"description": "Your complete guide to Abuja's shopping scene—from modern malls to traditional markets and luxury boutiques.",
				"datePublished": "2025-11-02T10:00:00+01:00",
				"dateModified": "2025-11-02T10:00:00+01:00",
				"author": {
					"@id": "https://www.placesinabuja.com/about#the-bedouin"
				},
				"publisher": {
					"@id": "https://www.placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#jabi-lake-mall"},
					{"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#traditional-markets"},
					{"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#maitama-boutiques"},
					{"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#wuse-market"},
					{"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#maitama"}
				]
			},
			{
				"@type": "ShoppingCenter",
				"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#jabi-lake-mall",
				"name": "Jabi Lake Mall",
				"description": "The premier shopping destination in Abuja, offering a complete all-in-one experience with international brands, modern cinema, diverse food court, and stunning waterfront location."
			},
			{
				"@type": "Market",
				"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#traditional-markets",
				"name": "Abuja Traditional Markets",
				"description": "The vibrant, beating heart of Abuja's commerce, offering a full-body sensory experience with energetic vendors, fresh spices, and authentic local culture."
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#maitama-boutiques",
				"name": "Maitama Boutiques",
				"description": "The exclusive hub for luxury and designer fashion in Abuja, featuring high-end boutiques with international luxury brands and flagship stores for top-tier Nigerian and African fashion designers."
			},
			{
				"@type": "Market",
				"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#wuse-market",
				"name": "Wuse Market",
				"description": "The vibrant, chaotic heart of Abuja's commerce and an essential cultural experience.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Wuse",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#maitama",
				"name": "Maitama",
				"description": "An upscale neighborhood and the heart of Abuja's 'see and be seen' culture, where the city's elite come for curated fashion and exclusive retail experiences."
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.placesinabuja.com/things-to-do/shopping-abuja#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What is the best mall in Abuja for shopping?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Jabi Lake Mall is the premier shopping destination in Abuja, offering a complete all-in-one experience with international brands, a modern cinema, diverse food court, and stunning waterfront location. It's the city's modern social hub where families and friends spend entire days shopping, dining, and relaxing by the lake."
						}
					},
					{
						"@type": "Question",
						"name": "Where can I find the best bargains in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Wuse Market is the undisputed hub for the best bargains in Abuja. This vibrant, traditional market offers fresh produce, spices, traditional fabrics like ankara and adire, local crafts, kitchenware, and electronics at the lowest prices in the city. Be prepared to bargain—haggling is an essential and friendly part of the shopping experience."
						}
					},
					{
						"@type": "Question",
						"name": "Where can I find luxury and designer fashion in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Maitama is the exclusive hub for luxury and designer fashion in Abuja. The area features high-end boutiques with international luxury brands from Paris, Milan, and London, as well as flagship stores for top-tier Nigerian and African fashion designers. This is where you'll find bespoke and ready-to-wear local design, perfect for special occasions like weddings."
						}
					},
					{
						"@type": "Question",
						"name": "Is bargaining expected at traditional markets in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Yes, bargaining is not just expected but is a friendly and essential part of shopping at traditional markets like Wuse Market. Haggling is part of the cultural experience and transaction process. A warm smile and a bit of confidence are your best tools for getting the best prices."
						}
					}
				]
			}
		]
	}`;

	// Get related posts
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
				<Script id="shopping-graph" type="application/ld+json" strategy="afterInteractive">
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

