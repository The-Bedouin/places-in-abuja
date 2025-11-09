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
	const post = await getPostBySlug('best-hotels-abuja');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: post.canonical || 'https://www.placesinabuja.com/things-to-do/best-hotels-abuja'
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article',
			url: post.canonical || 'https://www.placesinabuja.com/things-to-do/best-hotels-abuja'
		}
	};
}

export default async function BestHotelsAbujaPage() {
	const post = await getPostBySlug('best-hotels-abuja');
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
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#bello-hassan",
				"name": "Bello Hassan",
				"url": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja",
				"jobTitle": "Senior Writer & Local Guide",
				"description": "Bello Hassan is a senior writer for Places in Abuja and a 15-year resident of the city. After moving from Lagos in 2010, he has worked as a consultant, helping new expatriates and their families get settled in the FCT. He has an in-depth, on-the-ground knowledge of the city's neighborhoods, schools, and local economy.",
				"worksFor": {
					"@id": "https://www.placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#breadcrumb",
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
						"name": "Abuja Guide",
						"item": "https://www.placesinabuja.com/abuja-guide"
					},
					{
						"@type": "ListItem",
						"position": 3,
						"name": "The Best Hotels in Abuja: An Expert Guide (2025)"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja"
				},
				"headline": "The Best Hotels in Abuja: An Expert Guide (2025)",
				"description": "The definitive guide to Abuja's accommodation—from 5-star luxury hotels for diplomats and executives to affordable options and serviced apartments, helping you find the perfect place to stay.",
				"datePublished": "2025-11-03T10:00:00+01:00",
				"dateModified": "2025-11-03T10:00:00+01:00",
				"author": {
					"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#bello-hassan"
				},
				"publisher": {
					"@id": "https://www.placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#luxury-hotels"},
					{"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#shortlet-apartments"},
					{"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#affordable-hotels"},
					{"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#maitama"},
					{"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#wuse-2"},
					{"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#jabi"}
				]
			},
			{
				"@type": "LodgingBusiness",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#luxury-hotels",
				"name": "Abuja Luxury 5-Star Hotels",
				"description": "The top-tier standard for diplomats and executives in Abuja. These establishments are the de facto bases of operation for the city's powerful elite, offering diplomatic-level security, world-class conference facilities, state-of-the-art gyms, luxurious spas, and multiple fine-dining restaurants all under one roof.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "LodgingBusiness",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#shortlet-apartments",
				"name": "Abuja Shortlet & Serviced Apartments",
				"description": "The rise of flexible, long-term stays in Abuja. These apartments offer a living area, dining space, and kitchen, providing flexibility and space for expats on temporary contracts, relocating families, or groups who want a private, communal space.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "LodgingBusiness",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#affordable-hotels",
				"name": "Abuja Affordable & Budget-Friendly Hotels",
				"description": "The best-value spots for a clean and secure stay in Abuja. These hotels offer impeccably clean rooms, 24/7 reliable security, solid air conditioning, and dependable power sources without luxury perks, perfect for business travelers on a budget.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#maitama",
				"name": "Maitama",
				"description": "A serene, high-security district in Abuja where many 5-star luxury hotels are located, offering diplomatic-level security and proximity to embassies and government offices.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Maitama",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#wuse-2",
				"name": "Wuse 2",
				"description": "A hotspot for shortlet apartments in Abuja, placing you right in the center of the city's commercial and social action with access to restaurants, cafes, and nightlife.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Wuse 2",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#jabi",
				"name": "Jabi",
				"description": "A trendy area in Abuja known for ultra-modern, serviced high-rise apartments and hotels, offering a modern lifestyle with access to Jabi Lake and Jabi Lake Mall.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Jabi",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.placesinabuja.com/things-to-do/best-hotels-abuja#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What is the difference between a shortlet apartment and a hotel?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The main differences are space, privacy, and amenities. A shortlet provides a full living space, including a kitchen and living room, which is ideal for longer stays or families. A hotel typically offers a single room and on-site services like a restaurant and 24/7 concierge."
						}
					},
					{
						"@type": "Question",
						"name": "I'm visiting for business. Which area is best to stay in?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "This depends on your meetings. For proximity to government offices and embassies, Maitama or the Central Business District are your best bet. If your business is more social or commercial and you want to be near restaurants, Wuse 2 is the center of the action."
						}
					},
					{
						"@type": "Question",
						"name": "Are hotels in Abuja safe, especially for a solo traveler?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Yes, reputable hotels in Abuja are generally very safe. The 5-star hotels have diplomatic-level security. For any hotel, as a local, I recommend choosing one in a well-lit, busy area (like Maitama, Wuse 2, or Jabi) and checking recent reviews for mentions of security."
						}
					},
					{
						"@type": "Question",
						"name": "What is the most important amenity to look for in an Abuja hotel?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Hands down, it's reliable 24/7 power. Ask if the hotel has a high-capacity generator and, ideally, an inverter system. Constant air-conditioning and Wi-Fi depend on this, and as I mentioned in my tip, it's the true mark of a quality, well-run establishment."
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
				<Script id="best-hotels-abuja-graph" type="application/ld+json" strategy="afterInteractive">
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

