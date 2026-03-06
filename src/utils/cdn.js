import data from '../data/config.json';

/**
 * Helper to construct the full URL for assets.
 * Handles both CDN (absolute URLs) and local assets (relative to BASE_URL).
 */
export const cdn = (path) => {
    if (!path) return '';

    // If path is already a full URL, return it
    if (path.startsWith('http')) return path;

    const cdnBase = data.cdn_base_url || '';

    // If cdn_base_url is an absolute URL, join them
    if (cdnBase.startsWith('http')) {
        // Ensure no double slashes if path starts with /
        const base = cdnBase.endsWith('/') ? cdnBase.slice(0, -1) : cdnBase;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${base}${cleanPath}`;
    }

    // Local assets: prepend import.meta.env.BASE_URL
    // Vite sets BASE_URL based on the 'base' config in vite.config.js
    const siteBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const localBase = cdnBase.startsWith('/') ? cdnBase : `/${cdnBase}`;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    const fullPath = `${siteBase}${localBase}${cleanPath}`.replace(/\/+/g, '/');
    return fullPath;
};
