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
	const post = await getPostBySlug('spas-wellness-abuja');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: post.canonical || 'https://www.placesinabuja.com/things-to-do/spas-wellness-abuja'
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article',
			url: post.canonical || 'https://www.placesinabuja.com/things-to-do/spas-wellness-abuja'
		}
	};
}

export default async function SpasWellnessPage() {
	const post = await getPostBySlug('spas-wellness-abuja');
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
				"description": "The-Bedouin is the founder of Places in Abuja and a 25-year resident of the capital. He considers himself a connoisseur of deep-tissue massages and believes a monthly spa visit is critical to surviving Abuja's social scene.",
				"worksFor": {
					"@id": "https://www.placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#breadcrumb",
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
						"name": "The Ultimate Guide to Spas & Wellness in Abuja"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja"
				},
				"headline": "The Ultimate Guide to Spas & Wellness in Abuja (2025)",
				"description": "Your complete guide to Abuja's spa and wellness scene—from luxurious hotel spas to dedicated day spas for relaxation and self-care.",
				"datePublished": "2025-11-02T10:00:00+01:00",
				"dateModified": "2025-11-02T10:00:00+01:00",
				"author": {
					"@id": "https://www.placesinabuja.com/about#the-bedouin"
				},
				"publisher": {
					"@id": "https://www.placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#hotel-spas"},
					{"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#day-spas"},
					{"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#wellness-scene"},
					{"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#spa-treatments"},
					{"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#abuja"}
				]
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#hotel-spas",
				"name": "Abuja Hotel Spas",
				"description": "Luxurious 5-star hotel spas offering all-encompassing sanctuaries of wellness with serene swimming pools, steam rooms, and extensive treatment menus for full-day escapes."
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#day-spas",
				"name": "Abuja Day Spas",
				"description": "Dedicated day spas tucked away in quiet neighborhoods, focusing on high-performance, targeted treatments like deep-tissue massages, high-tech facials, and traditional hammam rituals."
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#wellness-scene",
				"name": "Abuja Wellness Scene",
				"description": "A sophisticated wellness industry that has matured beyond simple pampering, dedicated to providing a true escape from the city's hustle with pure, sophisticated tranquility."
			},
			{
				"@type": "HealthAndBeautyBusiness",
				"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#spa-treatments",
				"name": "Abuja Spa Treatments",
				"description": "Expert deep-tissue massages, high-tech facials, and traditional hammam rituals for a deep, purifying cleanse.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#abuja",
				"name": "Abuja",
				"description": "The capital city where spa and wellness have become a core part of the modern lifestyle, providing an essential escape from high-stakes meetings, bustling traffic, and a fast-paced social calendar."
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.placesinabuja.com/things-to-do/spas-wellness-abuja#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What types of spas are available in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Abuja offers two main types of spas: luxurious 5-star hotel spas for full-day escapes with swimming pools, steam rooms, and extensive treatment menus, and dedicated day spas in quiet neighborhoods that focus on high-performance, targeted treatments like deep-tissue massages, high-tech facials, and traditional hammam rituals."
						}
					},
					{
						"@type": "Question",
						"name": "What should I expect from a 5-star hotel spa in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "5-star hotel spas in Abuja are all-encompassing sanctuaries of wellness, offering serene swimming pools, steam rooms, and extensive treatment menus. These luxurious destinations allow you to completely check out for hours on end, providing a true escape from the city's hustle with pure, sophisticated tranquility."
						}
					},
					{
						"@type": "Question",
						"name": "What treatments are available at dedicated day spas in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Dedicated day spas in Abuja offer high-performance, targeted treatments including expert deep-tissue massages to undo weeks of stress, high-tech facials to rejuvenate your skin, and traditional hammam rituals for a deep, purifying cleanse. These spas focus on providing effective, results-oriented wellness experiences."
						}
					},
					{
						"@type": "Question",
						"name": "Why is spa and wellness important in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "In a city that moves at a high-energy pace with high-stakes meetings, bustling traffic, and a fast-paced social calendar, relaxation isn't just a luxury—it's a necessity. Spa and wellness have become a core part of the modern Abuja lifestyle, providing an essential escape to disconnect from the hustle and recharge."
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
				<Script id="spas-wellness-graph" type="application/ld+json" strategy="afterInteractive">
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

