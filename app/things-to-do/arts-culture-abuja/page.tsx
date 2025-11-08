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
	const post = await getPostBySlug('arts-culture-abuja');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: post.canonical || 'https://www.placesinabuja.com/things-to-do/arts-culture-abuja'
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article',
			url: post.canonical || 'https://www.placesinabuja.com/things-to-do/arts-culture-abuja'
		}
	};
}

export default async function ArtsCulturePage() {
	const post = await getPostBySlug('arts-culture-abuja');
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
				"description": "The-Bedouin is the founder of Places in Abuja and a 25-year resident of the capital. He is a passionate collector of contemporary Nigerian art and has spent countless hours haggling at the Arts & Crafts Village.",
				"worksFor": {
					"@id": "https://www.placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#breadcrumb",
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
						"name": "The Ultimate Guide to Arts & Culture in Abuja"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja"
				},
				"headline": "The Ultimate Guide to Arts & Culture in Abuja (2025)",
				"description": "Your complete guide to Abuja's vibrant arts and culture scene—from contemporary galleries to traditional crafts and museums.",
				"datePublished": "2025-11-02T10:00:00+01:00",
				"dateModified": "2025-11-02T10:00:00+01:00",
				"author": {
					"@id": "https://www.placesinabuja.com/about#the-bedouin"
				},
				"publisher": {
					"@id": "https://www.placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#arts-crafts-village"},
					{"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#maitama-galleries"},
					{"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#national-museum"},
					{"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#contemporary-art"},
					{"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#maitama"}
				]
			},
			{
				"@type": "TouristAttraction",
				"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#arts-crafts-village",
				"name": "Abuja Arts & Crafts Village",
				"description": "A vibrant, traditional market and the single best place in Abuja for authentic, handmade Nigerian souvenirs.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Museum",
				"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#national-museum",
				"name": "Nigerian National Museum",
				"description": "The capital's foremost institution for ethnography and history, housing a significant collection of artifacts including traditional pottery, ancient Nok terracotta heads, and cultural regalia.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "TouristAttraction",
				"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#contemporary-art",
				"name": "Abuja Contemporary Art Scene",
				"description": "A rapidly growing hub for Nigerian art, featuring both high-end galleries and smaller, independent studios where you can meet artists and discover bold, experimental pieces."
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#maitama-galleries",
				"name": "Maitama Art Galleries",
				"description": "High-end, blue-chip galleries in upscale Maitama featuring investment-grade pieces from established Nigerian masters and the most talked-about new voices in contemporary art.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Maitama",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#maitama",
				"name": "Maitama",
				"description": "An upscale neighborhood home to many of Abuja's most sophisticated art galleries, featuring stunning minimalist spaces designed for quiet contemplation."
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.placesinabuja.com/things-to-do/arts-culture-abuja#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "Where can I find the best contemporary art galleries in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Maitama is home to many of Abuja's most sophisticated, high-end galleries featuring investment-grade pieces from established Nigerian masters. The area has become a hub for contemporary Nigerian art, with stunning minimalist spaces designed for quiet contemplation."
						}
					},
					{
						"@type": "Question",
						"name": "What is the best place to buy authentic Nigerian souvenirs in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The Arts & Crafts Village is the single best place in Abuja for authentic, handmade Nigerian souvenirs. This traditional market features a charming collection of thatched-roof huts where you can find hand-tooled leather goods, traditional fabrics, intricate woodwork, beaded jewelry, and pottery from artisans across Nigeria."
						}
					},
					{
						"@type": "Question",
						"name": "What can I see at the Nigerian National Museum in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The Nigerian National Museum in Abuja houses a significant collection of artifacts including traditional pottery, ancient Nok terracotta heads, and cultural regalia. It serves as the nation's memory bank, preserving the rich history of Nigeria's hundreds of ethnic groups and offering a deep dive into the nation's foundational cultures."
						}
					},
					{
						"@type": "Question",
						"name": "Is bargaining expected at the Arts & Crafts Village?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Yes, bargaining is not just expected but is a friendly, respected part of the culture at the Arts & Crafts Village. Haggling is part of the fun and experience. A warm smile and fair negotiation are all part of the authentic market experience."
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
				<Script id="arts-culture-graph" type="application/ld+json" strategy="afterInteractive">
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

