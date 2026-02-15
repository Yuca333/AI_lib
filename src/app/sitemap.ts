import { MetadataRoute } from 'next'
import { elements } from '@/lib/elements'
import { getPatternLibrary, getPlaybooks, getReferenceLibrary } from '@/lib/library-knowledge';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://pat-lib-online.vercel.app'
    const patterns = getPatternLibrary();
    const playbooks = getPlaybooks();
    const references = getReferenceLibrary();

    const elementUrls = elements.map((element) => ({
        url: `${baseUrl}/elements/${element.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const patternUrls = patterns.map((pattern) => ({
        url: `${baseUrl}/library/${pattern.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const playbookUrls = playbooks.map((playbook) => ({
        url: `${baseUrl}/playbooks/${playbook.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const referenceUrls = references.map((doc) => ({
        url: `${baseUrl}/reference/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/library`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/playbooks`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/reference`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/llm`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...elementUrls,
        ...patternUrls,
        ...playbookUrls,
        ...referenceUrls,
    ]
}
