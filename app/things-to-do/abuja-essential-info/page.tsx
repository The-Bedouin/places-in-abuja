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
	const post = await getPostBySlug('abuja-essential-info');
	if (!post) return {};

	return {
		title: post.title,
		description: post.excerpt,
		alternates: {
			canonical: post.canonical || 'https://www.placesinabuja.com/things-to-do/abuja-essential-info'
		},
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.image ? [post.image] : [],
			type: 'article',
			url: post.canonical || 'https://www.placesinabuja.com/things-to-do/abuja-essential-info'
		}
	};
}

export default async function AbujaEssentialInfoPage() {
	const post = await getPostBySlug('abuja-essential-info');
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
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#bello-hassan",
				"name": "Bello Hassan",
				"url": "https://www.placesinabuja.com/things-to-do/abuja-essential-info",
				"jobTitle": "Senior Writer & Local Guide",
				"description": "Bello Hassan is a senior writer for Places in Abuja and a 15-year resident of the city. After moving from Lagos in 2010, he has worked as a consultant, helping new expatriates and their families get settled in the FCT. His insights are based on years of first-hand experience navigating life in Nigeria's capital.",
				"worksFor": {
					"@id": "https://www.placesinabuja.com/#organization"
				}
			},
			{
				"@type": "BreadcrumbList",
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#breadcrumb",
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
						"name": "Abuja Essential Info: A Practical Guide for Residents & Visitors (2025)"
					}
				]
			},
			{
				"@type": "BlogPosting",
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#article",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info"
				},
				"headline": "Abuja Essential Info: A Practical Guide for Residents & Visitors (2025)",
				"description": "The definitive, trustworthy guide to the practical realities of living in Nigeria's capital—from safety and healthcare to schools and daily life essentials.",
				"datePublished": "2025-11-03T10:00:00+01:00",
				"dateModified": "2025-11-03T10:00:00+01:00",
				"author": {
					"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#bello-hassan"
				},
				"publisher": {
					"@id": "https://www.placesinabuja.com/#organization"
				},
				"mentions": [
					{"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#safety"},
					{"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#healthcare"},
					{"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#schools"},
					{"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#daily-life"},
					{"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#abuja"}
				]
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#safety",
				"name": "Abuja Safety",
				"description": "The real story on security in Abuja, from residents who live it every day. Life in central areas like Maitama, Wuse 2, Asokoro, and Jabi is generally calm and secure. The feeling on the ground is one of reasonable safety, not constant fear, built on a foundation of practical, common-sense precautions."
			},
			{
				"@type": "MedicalBusiness",
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#healthcare",
				"name": "Abuja Healthcare",
				"description": "A complete guide to the best private hospitals and clinics in Abuja. The standard of private healthcare in this city is high, with modern, well-equipped facilities offering comprehensive services from 24/7 emergency care to specialized surgeries. Institutions like Nizamiye Hospital and Nisa Premier Hospital are known for their modern facilities and wide range of specialists.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "EducationalOrganization",
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#schools",
				"name": "International Schools in Abuja",
				"description": "A parent's guide to the top international schools in Abuja. The city has a mature, high-quality, and diverse international school system with British, American, and IB curricula. These schools serve as social and community hubs for the expat and professional community.",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Abuja",
					"addressRegion": "Abuja"
				}
			},
			{
				"@type": "Place",
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#daily-life",
				"name": "Daily Life in Abuja",
				"description": "A guide to handling essentials like banking, utilities, shopping, and more in Abuja. Setting up day-to-day life is a straightforward process with efficient banking (Zenith, GTBank, Access Bank), modern malls like Jabi Lake Mall, traditional markets like Wuse Market, and reliable mobile internet from providers like MTN and Airtel."
			},
			{
				"@type": "City",
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#abuja",
				"name": "Abuja",
				"description": "Nigeria's capital city, a practical and manageable place to live when you have the right information about safety, healthcare, schools, and daily life essentials. A city where settling in is a smooth process when you have reliable, on-the-ground answers to practical questions."
			},
			{
				"@type": "FAQPage",
				"@id": "https://www.placesinabuja.com/things-to-do/abuja-essential-info#faq",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "What is the emergency number in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The national emergency number in Nigeria is 112. This number is free to call from any mobile network and can be used to request help from the Police, Fire Service, or Ambulance services."
						}
					},
					{
						"@type": "Question",
						"name": "Is it safe to walk at night in Abuja?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "As a local, my strong advice is no, you should not walk at night. While main districts are secure, they are not designed for pedestrian traffic after dark. For all nighttime movement, I and other residents exclusively use cars or trusted ride-sharing apps like Bolt and Uber."
						}
					},
					{
						"@type": "Question",
						"name": "What do I need to open a bank account as an expat?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "You will typically need: 1. A valid ID (your passport). 2. Your residence permit (CERPAC). 3. A recent utility bill or tenancy agreement as proof of address. 4. Two passport photographs. Having these ready will make the process very fast."
						}
					},
					{
						"@type": "Question",
						"name": "Is the internet in Abuja good?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "The internet in Abuja is generally reliable, but it's different from what you might be used to. The most common solution is high-speed 4G/5G mobile data from providers like MTN or Airtel, which is fast enough for streaming and video calls. Fiber optic 'to the home' is available but less common and mostly found in new estates."
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
				<Script id="abuja-essential-info-graph" type="application/ld+json" strategy="afterInteractive">
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

