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
	const post = await getPostBySlug('getting-around-abuja');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: post.canonical || 'https://www.placesinabuja.com/things-to-do/getting-around-abuja'
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article',
			url: post.canonical || 'https://www.placesinabuja.com/things-to-do/getting-around-abuja'
		}
	};
}

export default async function GettingAroundAbujaPage() {
	const post = await getPostBySlug('getting-around-abuja');
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
				"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#bello-hassan",
				"name": "Bello Hassan",
				"url": "https://www.placesinabuja.com/things-to-do/getting-around-abuja",
				"jobTitle": "Senior Writer & Local Guide",
				"description": "Bello Hassan is a senior writer for Places in Abuja and a 15-year resident of the city. After moving from Lagos in 2010, he has worked as a consultant, helping new expatriates and their families get settled in the FCT. He has an in-depth, on-the-ground knowledge of the city's neighborhoods, transport, and local economy.",
				"worksFor": {
					"@id": "https://www.placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#breadcrumb",
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
						"name": "Getting Around Abuja: A Transport Guide (2025)"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja"
				},
				"headline": "Getting Around Abuja: A Transport Guide (2025)",
				"description": "Your complete guide for navigating Abuja—from ride-sharing apps like Bolt and Uber to airport transport and local taxis, helping you move around the city safely and confidently.",
				"datePublished": "2025-11-03T10:00:00+01:00",
				"dateModified": "2025-11-03T10:00:00+01:00",
				"author": {
					"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#bello-hassan"
				},
				"publisher": {
					"@id": "https://www.placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#ride-sharing"},
					{"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#airport-transport"},
					{"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#green-cabs"},
					{"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#nnamdi-azikiwe-airport"}
				]
			},
			{
				"@type": "Service",
				"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#ride-sharing",
				"name": "Ride-Sharing Apps in Abuja",
				"description": "The modern standard for navigating Abuja using Bolt and Uber. These apps are not just an option; they are the standard, providing safety through logged journeys and real-time tracking, fixed pricing that removes the stress of haggling, and are the dominant, most recommended methods for moving around the city, especially in central districts like Wuse 2, Maitama, Jabi, and Garki where a car is rarely more than five minutes away.",
				"serviceType": "Transportation Service",
				"areaServed": {
					"@type": "City",
					"name": "Abuja"
				}
			},
			{
				"@type": "Service",
				"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#airport-transport",
				"name": "Airport Transport in Abuja",
				"description": "The best ways to get from Nnamdi Azikiwe International Airport (ABV) to your destination in Abuja. The journey from the airport to the city center takes about 30 to 45 minutes, depending on traffic. Options include app-based ride-sharing with fixed pricing (showing exact fare before booking) or official licensed airport taxis with negotiated fares.",
				"serviceType": "Transportation Service",
				"areaServed": {
					"@type": "City",
					"name": "Abuja"
				}
			},
			{
				"@type": "Service",
				"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#green-cabs",
				"name": "Abuja Green Cabs",
				"description": "The iconic official city taxis painted in green and white. Before Bolt and Uber dominated the streets, these were the undisputed king of Abuja transport. These local taxis do not have meters and require negotiation and agreement on fare before opening the car door, making them perfect for when your phone is dead, in areas with poor data coverage, or for quick short hops.",
				"serviceType": "Taxi Service",
				"areaServed": {
					"@type": "City",
					"name": "Abuja"
				}
			},
			{
				"@type": "Airport",
				"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#nnamdi-azikiwe-airport",
				"name": "Nnamdi Azikiwe International Airport",
				"iataCode": "ABV",
				"description": "Abuja's main international airport, located approximately 30 to 45 minutes from the city center. The airport offers ride-sharing pickup areas and official licensed taxi services for transport to destinations like Wuse 2 and Maitama.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.placesinabuja.com/things-to-do/getting-around-abuja#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What is the average taxi fare from Abuja airport to Maitama?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "As a local, I can tell you that a ride-sharing app like Bolt or Uber will typically cost between N5,000 and N7,000 from the airport (ABV) to Maitama or Wuse 2, depending on demand and time of day. If you are negotiating with an airport taxi, this is a good baseline to have in mind."
						}
					},
					{
						"@type": "Question",
						"name": "Is Bolt or Uber better in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Both are widely used and reliable in the central areas. In my experience, Bolt often has slightly lower prices and more available drivers. However, I recommend having both apps on your phone to compare prices and availability in real-time."
						}
					},
					{
						"@type": "Question",
						"name": "Is it safe to use taxis in Abuja at night?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Generally, yes, but you must be smart. I strongly recommend using a ride-sharing app (Bolt/Uber) at night instead of hailing a street cab. The app provides a digital record of your trip, the driver's details, and a live-tracking feature you can share, which is a crucial safety layer."
						}
					},
					{
						"@type": "Question",
						"name": "Do you have to tip taxi drivers in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "No, tipping is not required or expected for taxi or ride-sharing drivers in Abuja. The agreed-upon price (either via the app or through negotiation) is the final price."
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
				<Script id="getting-around-abuja-graph" type="application/ld+json" strategy="afterInteractive">
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

