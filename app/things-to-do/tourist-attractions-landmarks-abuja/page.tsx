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
	const post = await getPostBySlug('tourist-attractions-landmarks-abuja');
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

export default async function TouristAttractionsLandmarksPage() {
	const post = await getPostBySlug('tourist-attractions-landmarks-abuja');
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
				"description": "The-Bedouin is the founder of Places in Abuja and a 25-year resident of the capital. He has personally hiked Zuma Rock, explored every corner of the Arts & Crafts Village, and believes the National Mosque is most beautiful at sunset.",
				"worksFor": {
					"@id": "https://placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#breadcrumb",
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
						"name": "Must-See Tourist Attractions and Landmarks in Abuja"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja"
				},
				"headline": "Must-See Tourist Attractions and Landmarks in Abuja (2025 Guide)",
				"description": "Your essential guide to Abuja's most iconic landmarks and attractions—from the ancient power of Zuma Rock to the golden dome of the National Mosque.",
				"datePublished": "2025-11-02T10:00:00+01:00",
				"dateModified": "2025-11-02T10:00:00+01:00",
				"author": {
					"@id": "https://placesinabuja.com/about#the-bedouin"
				},
				"publisher": {
					"@id": "https://placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#zuma-rock"},
					{"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#national-mosque"},
					{"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#usuma-dam"},
					{"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#yaradua-centre"},
					{"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#magicland"}
				]
			},
			{
				"@type": "TouristAttraction",
				"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#zuma-rock",
				"name": "Zuma Rock",
				"description": "A towering 725-meter monolith and ancient guardian known as the 'Gateway to Abuja.' Featured on the 100 Naira note, it's a massive, watchful sentinel on the main road from Kaduna.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Madalla",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "PlaceOfWorship",
				"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#national-mosque",
				"name": "Abuja National Mosque",
				"description": "The city's most defining architectural icon, known for its massive golden dome and four towering minarets. A symbol of unity and a breathtaking piece of modern Islamic architecture.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "TouristAttraction",
				"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#usuma-dam",
				"name": "Usuma Dam",
				"description": "A massive, beautiful reservoir located just outside the city proper, offering a sense of peace and stunning natural vistas. Perfect for picnics, nature walks, and boat rides.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "TouristAttraction",
				"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#yaradua-centre",
				"name": "Shehu Musa Yar'Adua Centre",
				"description": "One of Abuja's most significant modern landmarks, featuring a museum, library, and foundation dedicated to the memory of the late Major General Shehu Musa Yar'Adua.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#magicland",
				"name": "Magicland Amusement Park",
				"description": "Abuja's premier and most nostalgic theme park, known as 'Wondericland.' A colorful, sprawling park designed for families, featuring rollercoasters, rides, and arcade games."
			},
			{
				"@type": "FAQPage",
				"@id": "https://placesinabuja.com/things-to-do/tourist-attractions-landmarks-abuja#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What is the most iconic landmark in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Zuma Rock is arguably the most iconic natural landmark, standing as the 'Gateway to Abuja' and featured on the 100 Naira note. The Abuja National Mosque with its golden dome is the most iconic architectural landmark, visible from miles around and representing the city's skyline."
						}
					},
					{
						"@type": "Question",
						"name": "Can non-Muslims visit the Abuja National Mosque?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Yes, the Abuja National Mosque is open to both Muslims and non-Muslims. It was built as a symbol of unity and welcomes all visitors. However, visitors should dress respectfully and follow the dress code guidelines when entering the complex."
						}
					},
					{
						"@type": "Question",
						"name": "Is it possible to hike Zuma Rock?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Yes, Zuma Rock offers a strenuous hike that is not recommended for beginners. The climb takes 3-4 hours and rewards hikers with unparalleled views of the entire region. Hiring a local guide is recommended for safety, as they know the safest paths up the rock."
						}
					},
					{
						"@type": "Question",
						"name": "What is the best time to visit the National Mosque?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The best time to visit the Abuja National Mosque is just before sunset, when the golden dome seems to catch fire against the sky. This is when the visual impact is most breathtaking. However, it's a beautiful landmark worth visiting at any time of day."
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
				<Script id="tourist-attractions-graph" type="application/ld+json" strategy="afterInteractive">
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

