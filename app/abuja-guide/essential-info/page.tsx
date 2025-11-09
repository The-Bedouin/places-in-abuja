import type { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://www.placesinabuja.com/abuja-guide'
		}
	};
}
export { default } from '../page';


