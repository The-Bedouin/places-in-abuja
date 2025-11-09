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
	const post = await getPostBySlug('where-to-live-abuja');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: post.canonical || 'https://www.placesinabuja.com/things-to-do/where-to-live-abuja'
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article',
			url: post.canonical || 'https://www.placesinabuja.com/things-to-do/where-to-live-abuja'
		}
	};
}

export default async function WhereToLiveAbujaPage() {
	const post = await getPostBySlug('where-to-live-abuja');
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
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#bello-hassan",
				"name": "Bello Hassan",
				"url": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja",
				"jobTitle": "Senior Writer & Local Guide",
				"description": "Bello Hassan is a senior writer for Places in Abuja and a 15-year resident of the city. After moving from Lagos in 2010, he has worked as a consultant, helping new expatriates and their families get settled in the FCT. He has an in-depth, on-the-ground knowledge of the city's neighborhoods, schools, and local economy.",
				"worksFor": {
					"@id": "https://www.placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#breadcrumb",
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
						"name": "Where to Live in Abuja: A Neighborhood Guide (2025)"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja"
				},
				"headline": "Where to Live in Abuja: A Neighborhood Guide (2025)",
				"description": "The definitive guide to Abuja's neighborhoods—from the exclusive enclave of Maitama to the bustling hub of Wuse 2, helping you find your perfect fit in Nigeria's capital.",
				"datePublished": "2025-11-02T10:00:00+01:00",
				"dateModified": "2025-11-02T10:00:00+01:00",
				"author": {
					"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#bello-hassan"
				},
				"publisher": {
					"@id": "https://www.placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#maitama"},
					{"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#wuse-2"},
					{"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#gwarinpa"},
					{"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#jabi"},
					{"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#garki"}
				]
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#maitama",
				"name": "Maitama",
				"description": "The exclusive enclave for luxury and diplomacy in Abuja. The diplomatic heart of Nigeria, home to dozens of embassies and high commissions, offering unparalleled security, serenity, and status with wide, impeccably maintained roads and manicured landscaping.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Maitama",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#wuse-2",
				"name": "Wuse 2",
				"description": "The 24/7 social and commercial heartbeat of Abuja. The city's true commercial and social nucleus operating at a fast, relentless pace with the highest concentration of restaurants, cafes, clubs, and bars in the entire FCT.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Wuse 2",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#gwarinpa",
				"name": "Gwarinpa",
				"description": "Abuja's sprawling, family-friendly suburban community. The largest single housing estate in West Africa, designed for families and long-term residents who want more space and a true suburban feel with numerous schools, markets, and family-oriented services.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Gwarinpa",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#jabi",
				"name": "Jabi",
				"description": "The modern lifestyle and recreation hub of Abuja, offering a perfect blend of urban sophistication and natural beauty. Built around Jabi Lake, featuring modern apartments, Jabi Lake Mall, and a trendy, recreational vibe for those who want to work, play, and live well.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Jabi",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#garki",
				"name": "Garki",
				"description": "The practical and administrative heart of Abuja. One of the city's oldest and most established districts, serving as the practical administrative center with numerous government offices, the Central Bank of Nigeria, and the National Hospital.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Garki",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.placesinabuja.com/things-to-do/where-to-live-abuja#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What is the most expensive neighborhood in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Maitama is widely considered the most expensive and exclusive neighborhood in Abuja, followed closely by Asokoro. This is due to the high concentration of embassies, high-end properties, and top-level security."
						}
					},
					{
						"@type": "Question",
						"name": "Which Abuja neighborhood is best for families?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "While many families live all over the city, Gwarinpa is the most popular choice specifically for a family-focused, suburban lifestyle. It has a strong sense of community, more green space, and a large number of schools and family-oriented services. Jabi is also a popular modern option."
						}
					},
					{
						"@type": "Question",
						"name": "I'm a young professional. Where should I live?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Based on our experience, most young professionals are drawn to Wuse 2 or Jabi. Choose Wuse 2 if you want to be in the absolute center of the social and nightlife scene. Choose Jabi if you prefer a more modern, lifestyle-focused vibe with access to the lake and mall."
						}
					},
					{
						"@type": "Question",
						"name": "What is the daily commute like from a suburb like Gwarinpa?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The commute is a key factor. A drive from Gwarinpa to the Central Business District can take anywhere from 20 to 45 minutes, depending heavily on the rush-hour traffic peaks (typically 7:30-9:00 AM)."
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
				<Script id="where-to-live-abuja-graph" type="application/ld+json" strategy="afterInteractive">
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

