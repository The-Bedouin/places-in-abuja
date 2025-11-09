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
	const post = await getPostBySlug('abuja-guide');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: post.canonical || 'https://www.placesinabuja.com/abuja-guide'
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article',
			url: post.canonical || 'https://www.placesinabuja.com/abuja-guide'
		}
	};
}

export default async function AbujaGuidePage() {
	const post = await getPostBySlug('abuja-guide');
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
				"@id": "https://www.placesinabuja.com/abuja-guide#bello-hassan",
				"name": "Bello Hassan",
				"url": "https://www.placesinabuja.com/abuja-guide",
				"jobTitle": "Senior Writer & Local Guide",
				"description": "Bello Hassan is a senior writer for Places in Abuja and a 15-year resident of the city. After moving from Lagos in 2010, he has worked as a consultant, helping new expatriates and their families get settled in the FCT. He has an in-depth, on-the-ground knowledge of the city's neighborhoods, schools, and local economy.",
				"worksFor": {
					"@id": "https://www.placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://www.placesinabuja.com/abuja-guide#breadcrumb",
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
						"name": "The Ultimate Abuja City Guide for Visitors & Residents (2025)"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://www.placesinabuja.com/abuja-guide#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://www.placesinabuja.com/abuja-guide"
				},
				"headline": "The Ultimate Abuja City Guide for Visitors & Residents (2025)",
				"description": "Your complete operating manual for Abuja—from neighborhoods and accommodation to transport and essential info, helping you navigate Nigeria's capital with confidence.",
				"datePublished": "2025-11-02T10:00:00+01:00",
				"dateModified": "2025-11-02T10:00:00+01:00",
				"author": {
					"@id": "https://www.placesinabuja.com/abuja-guide#bello-hassan"
				},
				"publisher": {
					"@id": "https://www.placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://www.placesinabuja.com/abuja-guide#neighborhoods"},
					{"@id": "https://www.placesinabuja.com/abuja-guide#accommodation"},
					{"@id": "https://www.placesinabuja.com/abuja-guide#transport"},
					{"@id": "https://www.placesinabuja.com/abuja-guide#essential-info"},
					{"@id": "https://www.placesinabuja.com/abuja-guide#maitama"},
					{"@id": "https://www.placesinabuja.com/abuja-guide#wuse-2"},
					{"@id": "https://www.placesinabuja.com/abuja-guide#abuja"}
				]
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/abuja-guide#neighborhoods",
				"name": "Abuja Neighborhoods",
				"description": "A complete breakdown of where to live in Abuja, from the exclusive avenues of Maitama to the bustling family life of Gwarinpa, helping you find the area that matches your lifestyle, budget, and daily needs.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "LodgingBusiness",
				"@id": "https://www.placesinabuja.com/abuja-guide#accommodation",
				"name": "Abuja Accommodation",
				"description": "Your guide to the city's top 5-star hotels and the best modern, secure shortlet apartments. Abuja's accommodation scene is built to serve its unique population of diplomats and executives, with exceptionally high standards for security and service.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Service",
				"@id": "https://www.placesinabuja.com/abuja-guide#transport",
				"name": "Abuja Transport",
				"description": "A complete guide to local transport in Abuja, including ride-sharing apps like Bolt and Uber, airport transfers from Nnamdi Azikiwe Airport, and getting around like a local using the city's official green cabs.",
				"serviceType": "Transportation Service",
				"areaServed": {
					"@type": "City",
					"name": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/abuja-guide#essential-info",
				"name": "Abuja Essential Info",
				"description": "Honest, practical advice on safety, the best hospitals, and the top international schools in Abuja. A comprehensive guide to the practical realities of living in Nigeria's capital, from on-the-ground safety to healthcare and daily life essentials.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/abuja-guide#maitama",
				"name": "Maitama",
				"description": "The undisputed capital of luxury and diplomacy in Abuja. A serene, residential enclave for the city's elite with wide, quiet, tree-lined avenues, sprawling ambassadorial residences, and an air of exclusive calm.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Maitama",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/abuja-guide#wuse-2",
				"name": "Wuse 2",
				"description": "The city's energetic commercial heartbeat and the fast-paced, 24/7 center of Abuja's social and business life. Loud, vibrant, and packed with restaurants, bars, shops, and offices, home to the famous Wuse Market.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Wuse 2",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "City",
				"@id": "https://www.placesinabuja.com/abuja-guide#abuja",
				"name": "Abuja",
				"description": "Nigeria's capital city, a masterpiece of modern design with sweeping, wide-open roads, impressive government landmarks, and a surprising leafy calm. A city of fascinating contrasts where political importance meets quiet power-lunches, bustling local markets, and a diverse, ambitious population."
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.placesinabuja.com/abuja-guide#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What is the safest neighborhood in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "While many areas are considered safe, Maitama is generally seen as the most secure due to its high concentration of embassies and government residences. Family-friendly areas like Gwarinpa and Asokoro are also very popular and secure."
						}
					},
					{
						"@type": "Question",
						"name": "What is the best time of year to visit Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The best time to visit is during the Dry Season, from November to March. The weather is warm and sunny, with little to no rain. Be aware of the 'Harmattan' (usually in December-January), a dry, dusty wind from the Sahara, which can be hazy."
						}
					},
					{
						"@type": "Question",
						"name": "Is Abuja an expensive city to live in?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Yes, Abuja is considered one of the most expensive cities in Nigeria, particularly for accommodation. Housing in central, secure districts like Maitama and Wuse 2 is very high. However, daily costs for food and transport can be reasonable."
						}
					},
					{
						"@type": "Question",
						"name": "Do I need cash in Abuja, or are cards accepted?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "You need both. Major hotels, supermarkets (like Shoprite), and upscale restaurants will accept debit/credit cards and bank transfers. However, for local markets (like Wuse Market), green cabs, and smaller shops, cash is essential."
						}
					},
					{
						"@type": "Question",
						"name": "What is the main language spoken in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The official language of business and government is English. However, as a cultural melting pot, you will hear Hausa, Igbo, and Yoruba spoken widely, with Hausa being very common for daily commerce."
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
				<Script id="abuja-guide-graph" type="application/ld+json" strategy="afterInteractive">
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


