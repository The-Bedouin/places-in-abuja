declare module 'rss' {
  interface RSSOptions {
    title: string;
    site_url: string;
    feed_url: string;
    description: string;
    language?: string;
    copyright?: string;
    managingEditor?: string;
    webMaster?: string;
    lastBuildDate?: Date;
    ttl?: number;
  }

  interface RSSItemOptions {
    title: string;
    url: string;
    date: Date;
    description?: string;
    author?: string;
    categories?: string[];
    guid?: string;
    custom_elements?: any[];
  }

  class RSS {
    constructor(options: RSSOptions);
    item(options: RSSItemOptions): void;
    xml(options?: { indent?: boolean }): string;
  }

  export = RSS;
}
