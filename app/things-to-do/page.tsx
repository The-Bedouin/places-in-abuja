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
	const post = await getPostBySlug('things-to-do-abuja');
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

export default async function ThingsToDoPage() {
	const post = await getPostBySlug('things-to-do-abuja');
	if (!post) return notFound();
	
	const baseUrl = 'https://placesinabuja.com';

	const SCHEMA_JSON = `{
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Article",
				"@id": "https://placesinabuja.com/things-to-do#article",
				"headline": "The Ultimate Guide to Things to Do in Abuja (2025)",
				"datePublished": "2025-11-01T15:41:00+01:00",
				"dateModified": "2025-11-01T15:41:00+01:00",
				"author": {
					"@type": "Person",
					"@id": "https://placesinabuja.com/about#the-bedouin",
					"name": "The-Bedouin",
					"url": "https://placesinabuja.com/about",
					"description": "Founder of Places in Abuja and a 25-year resident of the capital, dedicated to showing visitors and residents the hidden gems of the FCT."
				},
				"publisher": {
					"@type": "Organization",
					"@id": "https://placesinabuja.com/#organization",
					"name": "Places in Abuja",
					"url": "https://placesinabuja.com",
					"logo": {
						"@type": "ImageObject",
						"url": "https://placesinabuja.com/logo.svg"
					}
				},
				"mainEntityOfPage": {
					"@id": "https://placesinabuja.com/things-to-do"
				},
				"description": "The ultimate guide to the best things to do in Abuja (2025). Discover iconic landmarks, fun activities, parks, game centers, art, culture, shopping, and spas.",
				"mentions": [
					{ "@id": "https://placesinabuja.com/things-to-do#zuma-rock" },
					{ "@id": "https://placesinabuja.com/things-to-do#national-mosque" },
					{ "@id": "https://placesinabuja.com/things-to-do#national-church" },
					{ "@id": "https://placesinabuja.com/things-to-do#arts-crafts-village" },
					{ "@id": "https://placesinabuja.com/things-to-do#millennium-park" },
					{ "@id": "https://placesinabuja.com/things-to-do#jabi-lake" },
					{ "@id": "https://placesinabuja.com/things-to-do#wuse-market" },
					{ "@id": "https://placesinabuja.com/things-to-do#jabi-lake-mall" },
					{ "@id": "https://placesinabuja.com/things-to-do#spas-guide" },
					{ "@id": "https://placesinabuja.com/things-to-do#faq" },
					{ "@id": "https://placesinabuja.com/things-to-do#how-to-zuma-rock" },
					{ "@id": "https://placesinabuja.com/guide/neighborhoods/wuse-2#place" },
					{ "@id": "https://placesinabuja.com/guide/neighborhoods/maitama#place" },
					{ "@id": "https://placesinabuja.com/guide/neighborhoods/jabi#place" }
				]
			},
			{
				"@type": "WebPage",
				"@id": "https://placesinabuja.com/things-to-do",
				"url": "https://placesinabuja.com/things-to-do",
				"name": "The Ultimate Guide to Things to Do in Abuja (2025)",
				"isPartOf": {
					"@id": "https://placesinabuja.com/#website"
				},
				"breadcrumb": {
					"@id": "https://placesinabuja.com/things-to-do#breadcrumb"
				},
				"mainEntity": {
					"@id": "https://placesinabuja.com/things-to-do#article"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://placesinabuja.com/things-to-do#breadcrumb",
				"itemListElement": [
					{
						"@type": "ListItem",
						"position": 1,
						"name": "Home",
						"item": "https://placesinabuja.com"
					},
					{
						"@type": "ListItem",
						"position": 2,
						"name": "Things to Do",
						"item": "https://placesinabuja.com/things-to-do"
					}
				]
			},
			{
				"@type": "TouristAttraction",
				"@id": "https://placesinabuja.com/things-to-do#zuma-rock",
				"name": "Zuma Rock"
			},
			{
				"@type": "PlaceOfWorship",
				"@id": "https://placesinabuja.com/things-to-do#national-mosque",
				"name": "Abuja National Mosque"
			},
			{
				"@type": "PlaceOfWorship",
				"@id": "https://placesinabuja.com/things-to-do#national-church",
				"name": "National Ecumenical Centre (National Church)"
			},
			{
				"@type": "TouristAttraction",
				"@id": "https://placesinabuja.com/things-to-do#arts-crafts-village",
				"name": "Abuja Arts & Crafts Village"
			},
			{
				"@type": "Park",
				"@id": "https://placesinabuja.com/things-to-do#millennium-park",
				"name": "Millennium Park"
			},
			{
				"@type": "Park",
				"@id": "https://placesinabuja.com/things-to-do#jabi-lake",
				"name": "Jabi Lake Park",
				"containedInPlace": {
					"@id": "https://placesinabuja.com/guide/neighborhoods/jabi#place"
				}
			},
			{
				"@type": "Market",
				"@id": "https://placesinabuja.com/things-to-do#wuse-market",
				"name": "Wuse Market",
				"containedInPlace": {
					"@id": "https://placesinabuja.com/guide/neighborhoods/wuse-2#place"
				}
			},
			{
				"@type": "ShoppingCenter",
				"@id": "https://placesinabuja.com/things-to-do#jabi-lake-mall",
				"name": "Jabi Lake Mall",
				"containedInPlace": {
					"@id": "https://placesinabuja.com/guide/neighborhoods/jabi#place"
				}
			},
			{
				"@type": "ItemList",
				"@id": "https://placesinabuja.com/things-to-do#spas-guide",
				"name": "Guide to the Best Spas in Abuja",
				"description": "A curated guide to the best spas in Abuja for relaxation, massage, and wellness treatments."
			},
			{
				"@type": "Place",
				"@id": "https://placesinabuja.com/guide/neighborhoods/wuse-2#place",
				"name": "Wuse 2, Abuja"
			},
			{
				"@type": "Place",
				"@id": "https://placesinabuja.com/guide/neighborhoods/maitama#place",
				"name": "Maitama, Abuja"
			},
			{
				"@type": "Place",
				"@id": "https://placesinabuja.com/guide/neighborhoods/jabi#place",
				"name": "Jabi, Abuja"
			},
			{
				"@type": "FAQPage",
				"@id": "https://placesinabuja.com/things-to-do#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What are the best free things to do in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Abuja is great for budget-friendly activities. Visiting Millennium Park, window-shopping at the Arts & Crafts Village, walking around Jabi Lake, and visiting the National Mosque or National Church are all completely free."
						}
					},
					{
						"@type": "Question",
						"name": "What is the best area for activities in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Wuse 2 is the central hub for nightlife, restaurants, and many game spots. However, the Central Business District (CBD) and Maitama are where you'll find most of the major landmarks, galleries, and parks."
						}
					},
					{
						"@type": "Question",
						"name": "Is Abuja a good place for a family vacation?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Absolutely. Based on our experience, it's one of Nigeria's most family-friendly cities. Places like Wonderland Amusement Park, the numerous game centers, Jabi Lake Park, and Millennium Park make it an excellent choice for kids."
						}
					},
					{
						"@type": "Question",
						"name": "What is there to do in Abuja at night?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Abuja's nightlife is vibrant, with a huge range of options from chill rooftop lounges in Wuse 2 to lively clubs in Gwarinpa. See Our Full Guide: [The Ultimate Abuja Nightlife Guide](https://placesinabuja.com/eat-drink/nightlife)"
						}
					}
				]
			},
			{
				"@type": "HowTo",
				"@id": "https://placesinabuja.com/things-to-do#how-to-zuma-rock",
				"name": "How to Plan a Day Trip to Zuma Rock",
				"description": "A step-by-step guide on how to plan a day trip to see Zuma Rock from Abuja.",
				"step": [
					{
						"@type": "HowToStep",
						"name": "Leave Early",
						"text": "Zuma Rock is on the main road to Kaduna, about a 45-minute drive from the city center. Leave by 7:00 AM to beat the traffic and the worst of the sun.",
						"url": "https://placesinabuja.com/things-to-do#how-to-step-1",
						"position": "1"
					},
					{
						"@type": "HowToStep",
						"name": "Pack Essentials",
						"text": "Bring at least 2-3 liters of water per person, sunscreen, a hat, and some high-energy snacks. Good hiking shoes are non-negotiable.",
						"url": "https://placesinabuja.com/things-to-do#how-to-step-2",
						"position": "2"
					},
					{
						"@type": "HowToStep",
						"name": "Hire a Guide (Optional)",
						"text": "While you can see the rock from the road, hiring a local guide is recommended if you plan to hike. They know the safest paths.",
						"url": "https://placesinabuja.com/things-to-do#how-to-step-3",
						"position": "3"
					},
					{
						"@type": "HowToStep",
						"name": "The Hike",
						"text": "The hike itself is strenuous and takes 3-4 hours. It's not for beginners, but the view from the top is one of the best in Nigeria.",
						"url": "https://placesinabuja.com/things-to-do#how-to-step-4",
						"position": "4"
					},
					{
						"@type": "HowToStep",
						"name": "Plan Your Return",
						"text": "Aim to be down by early afternoon. Grab a late lunch at a roadside eatery in Suleja (the nearby town) before heading back to Abuja.",
						"url": "https://placesinabuja.com/things-to-do#how-to-step-5",
						"position": "5"
					}
				],
				"totalTime": "PT6H"
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
				<Script id="things-to-do-graph" type="application/ld+json" strategy="afterInteractive">
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

