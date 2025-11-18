import axios from "axios";
import { settings } from "../settings";
import { getDemoBlogs } from "./demoBlogs";

export async function getBlogs(limit = 48) {
    if (process.env.NEXT_PUBLIC_IS_DEMO) {
        return getDemoBlogs();
    }

    if (!settings.blog_system.enabled) {
        return [];
    }

   try {
       const res = await axios.get(`${settings.blog_system.ghost_url}/ghost/api/content/posts/?key=${settings.blog_system.ghost_api_key}&limit=${limit}&include=tags,authors`);
       const posts = res.data.posts || [];
       return posts;
   } catch (error) {
        return [];
   }
} 