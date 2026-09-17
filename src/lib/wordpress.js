const WP_API_URL = import.meta.env.VITE_WP_API_URL || 'https://public-api.wordpress.com/wp/v2/sites/your-site.wordpress.com';

/**
 * Fetch all posts from WordPress
 */
export async function getPosts() {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
  } catch (error) {
    console.error('WordPress API Error:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug) {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);
    if (!res.ok) throw new Error('Failed to fetch post');
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('WordPress API Error:', error);
    return null;
  }
}

/**
 * Fetch pages from WordPress
 */
export async function getPages() {
  try {
    const res = await fetch(`${WP_API_URL}/pages?_embed`);
    if (!res.ok) throw new Error('Failed to fetch pages');
    return await res.json();
  } catch (error) {
    console.error('WordPress API Error:', error);
    return [];
  }
}
