import { tebexClient } from "./tebexClient";

export async function getCategories() {
    const categories = await tebexClient("categories?includePackages=1");
    return categories.data;
}

