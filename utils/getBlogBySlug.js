import axios from "axios";
import { getDemoBlogs } from "./demoBlogs";
import { settings } from "../settings";

export async function getBlogBySlug(slug) {
    if (process.env.NEXT_PUBLIC_IS_DEMO) {
        return getDemoBlogs().find(blog => blog.slug === slug);
    }

    const res = await axios.get(`${settings.blog_system.ghost_url}/ghost/api/content/posts/?key=${settings.blog_system.ghost_api_key}&include=tags,authors&filter=slug:${slug}`);
    return res.data.posts[0];
}