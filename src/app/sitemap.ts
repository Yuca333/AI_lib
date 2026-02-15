import { MetadataRoute } from 'next'
import { elements } from '@/lib/elements'
import { getLibraryMeta, getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';
import { SITE_URL } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL
    const patterns = getPatternLibrary();
    const playbooks = getPlaybooks();
    const references = getReferenceLibrary();
    const indexedAt = new Date(getLibraryMeta().indexedAt);

    const elementUrls = elements.map((element) => ({
        url: `${baseUrl}/elements/${element.slug}`,
        lastModified: indexedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const patternUrls = patterns.map((pattern) => ({
        url: `${baseUrl}/library/${pattern.id}`,
        lastModified: indexedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const playbookUrls = playbooks.map((playbook) => ({
        url: `${baseUrl}/playbooks/${playbook.slug}`,
        lastModified: indexedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const referenceUrls = references.map((doc) => ({
        url: `${baseUrl}/reference/${doc.id}`,
        lastModified: indexedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    const machineUrls = [
        '/llms.txt',
        '/llm-index.json',
        '/llm',
        '/anti-patterns',
        '/examples',
        '/lovable-optimized',
        '/api/llm/index',
        '/api/llm/patterns',
        '/api/llm/playbooks',
        '/api/llm/references',
        '/api/llm/search',
        '/api/llm/contracts',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: indexedAt,
        changeFrequency: 'daily' as const,
        priority: route.startsWith('/api/') ? 0.7 : 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: indexedAt,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/library`,
            lastModified: indexedAt,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/playbooks`,
            lastModified: indexedAt,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/reference`,
            lastModified: indexedAt,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/llm`,
            lastModified: indexedAt,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...machineUrls,
        ...elementUrls,
        ...patternUrls,
        ...playbookUrls,
        ...referenceUrls,
    ]
}
