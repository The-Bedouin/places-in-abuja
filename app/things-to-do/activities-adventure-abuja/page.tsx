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
	const post = await getPostBySlug('activities-adventure-abuja');
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

export default async function ActivitiesAdventurePage() {
	const post = await getPostBySlug('activities-adventure-abuja');
	if (!post) return notFound();
	
	const baseUrl = 'https://placesinabuja.com';

	const SCHEMA_JSON = `{
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
				"@id": "https://placesinabuja.com/about#the-bedouin",
				"name": "The-Bedouin",
				"url": "https://placesinabuja.com/about",
				"jobTitle": "Founder",
				"description": "The-Bedouin is the founder of Places in Abuja and a 25-year resident of the capital. He has personally hiked the trails of Aso Rock, tested nearly every game spot in Wuse 2, and believes Millennium Park is the city's greatest treasure.",
				"worksFor": {
					"@id": "https://placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#breadcrumb",
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
						"name": "Things to Do",
						"item": "https://placesinabuja.com/things-to-do"
					},
					{
						"@type": "ListItem",
						"position": 3,
						"name": "Activities & Adventure in Abuja"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja"
				},
				"headline": "The Ultimate Guide to Activities & Adventure in Abuja (2025)",
				"description": "Your complete guide to Abuja's best activities and adventures—from game spots and arcades to parks, picnics, and sports facilities.",
				"datePublished": "2025-11-02T10:00:00+01:00",
				"dateModified": "2025-11-02T10:00:00+01:00",
				"author": {
					"@id": "https://placesinabuja.com/about#the-bedouin"
				},
				"publisher": {
					"@id": "https://placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#millennium-park"},
					{"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#city-park"},
					{"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#monaliza"},
					{"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#jabi-lake"},
					{"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#wuse-2"}
				]
			},
			{
				"@type": "Park",
				"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#millennium-park",
				"name": "Millennium Park",
				"description": "A sprawling, beautifully manicured park that is Abuja's go-to for family outings and lazy Sunday afternoons.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Park",
				"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#city-park",
				"name": "City Park",
				"description": "One of the true pioneers in Abuja's social and recreation scene, known for its lively atmosphere, football fields, and fantastic grilled fish.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "TouristAttraction",
				"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#monaliza",
				"name": "Monaliza",
				"description": "A sprawling center that blends green space with sporting facilities including jogging tracks, tennis courts, football fields, and horse riding. Famous for its large 'I Love Abuja' sign.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Park",
				"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#jabi-lake",
				"name": "Jabi Lake Park",
				"description": "Abuja's waterfront offering a unique blend of nature and activity, featuring boat rides, jogging paths, and waterside cafes.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Jabi",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#wuse-2",
				"name": "Wuse 2",
				"description": "The vibrant hub of Abuja's game center scene, home to modern arcades, bowling alleys, VR experiences, and paintball arenas perfect for date nights and group hangouts."
			},
			{
				"@type": "FAQPage",
				"@id": "https://placesinabuja.com/things-to-do/activities-adventure-abuja#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What are the best game spots for a date night in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Abuja has fantastic game centers perfect for date nights, especially in Wuse 2. Bowling alleys, modern arcades, and VR experiences are popular choices. These spots offer a fun, interactive way to break the ice and actually get to know each other while having a great time."
						}
					},
					{
						"@type": "Question",
						"name": "Which park is best for a family picnic in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Millennium Park is the top choice for family picnics. It offers sprawling, beautifully manicured lawns, plenty of shade, and a safe, welcoming atmosphere. Jabi Lake is also excellent for picnics with waterfront views and good facilities."
						}
					},
					{
						"@type": "Question",
						"name": "Where can I go hiking in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Abuja offers numerous hiking trails in the hills surrounding the city. There are several hiking groups that organize weekly treks, and trails around Aso Rock are particularly popular. These hikes offer both a serious workout and incredible views of the city."
						}
					},
					{
						"@type": "Question",
						"name": "What activities are available at Jabi Lake?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Jabi Lake offers a variety of activities including boat rides, jogging along the perimeter, picnicking, and relaxing at waterside cafes. It's a perfect spot for both active recreation and peaceful relaxation with beautiful sunset views."
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
				<Script id="activities-adventure-graph" type="application/ld+json" strategy="afterInteractive">
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

