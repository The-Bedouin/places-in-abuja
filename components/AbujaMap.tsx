import Script from 'next/script';

export default function AbujaMap() {
  const mapQueryUrl = 'https://www.google.com/maps?q=Abuja%2C%20Nigeria';
  const embedUrl = `${mapQueryUrl}&z=12&output=embed`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: 'Abuja',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abuja',
      addressCountry: 'NG'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.0764785,
      longitude: 7.398574
    },
    hasMap: mapQueryUrl
  };

  return (
    <section aria-label="Map of Abuja" className="mt-12">
      <h2 className="text-xl font-semibold mb-3">Map of Abuja</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        Explore key locations around Abuja. Use the interactive map below or{' '}
        <a href={mapQueryUrl} target="_blank" rel="noopener" className="underline">view a larger map</a>.
      </p>
      <div className="relative w-full overflow-hidden rounded-lg border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 shadow">
        <div className="relative h-64 sm:h-80 w-full">
          <iframe
            title="Google Map of Abuja, Nigeria"
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      <Script id="abuja-map-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
    </section>
  );
}


