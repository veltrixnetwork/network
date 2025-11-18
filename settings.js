export const settings = {
    navbar_logo_url: "/logo.png", // reference to the logo image from the `public` folder, or an external url
    hero_image_url: "/logo.png", // reference to the hero image from the `public` folder, or an external url

    server_name: "VeltrixMC",
    server_ip: "veltrixnetwork.xyz", // Leave empty if you dont support Java

    server_bedrock_ip: "veltrixnetwork.xyz", // Leave empty if you dont support Bedrock
    server_bedrock_port: "19132", // Leave empty if you dont support Bedrock
    bedrock_support: true,

    discord_url: "https://discord.gg/VeltrixMC",
    discord_invite_code: "buzz", // The invite code for the discord server. e.g. "veltrixmc" or "eq38J6fe"

    community_goal_variant: "bar", // "semicircle", "bar", "ring"

    top_categories: [], // The categories that will be shown on the top of the store page
    featured_categories: ['2855888'], // Enter the category ID of the categories you want to feature with the label below
    featured_categories_label: "NEW ITEMS",
    featured_package_ids: ["6589678", "6589679", "6589681", "6589682"], // Displayed in the "Featured packages" carousel section of the store page

    rank_package_ids: ["6606918", "6606919", "6606920", "6606921"],
    show_support_widget: true, // Show the support widget on the sidebar
    show_login_cta: true, // Show the login call to action on the sidebar
    wiki_link: { // the "Wiki" link in the navbar
        shown: true,
        url: "https://wiki.VeltrixMC.com"
    },
    blog_system: {
        enabled: true, // Set to false to hide the blog system from the navbar and home page
        home_page_featured_post: "newest", // "newest" or {specific_post_id} e.g. "12a1bb33949b210001bf8e0e"
        ghost_api_key: "", // e.g. "216edf32532451931420af90d1"
        ghost_url: "", // e.g. "https://blog.yourwebsite.com"
    },
    sales: {
        show_sale_banner: true,
        sale_banner_variant: "full", // "full", "compact"
    },
    theme: {
        enable_snow: false,
    },
    translation_system: {
        enabled: true, // Will hide language switcher if disabled
        default_language: "en", // Default language to use if no language is selected
        languages: [
            { flag: '/language_icons/en.png', value: "English", key: 'en' },
            { flag: '/language_icons/nl.png', value: "Dutch", key: 'nl' },
            { flag: '/language_icons/fr.png', value: "French", key: 'fr' },
            { flag: '/language_icons/de.png', value: "German", key: 'de' },
            { flag: '/language_icons/es.png', value: "Spanish", key: 'es' },
            { flag: '/language_icons/pl.png', value: "Polish", key: 'pl' },
            { flag: '/language_icons/tr.png', value: "Turkish", key: 'tr' },
            // add more languages...
        ]
    },
    currency_symbol: "$",
    voting_links: [
        {
            name: "MC Server List",
            url: "https://mc-server-list.com/server/VeltrixMC"
        },
        {
            name: "Minecraft Server List",
            url: "https://minecraft-server-list.com/server/veltrixmc"
        },
        {
            name: "Top G Servers",
            url: "https://topg.org/server/veltrixmc"
        },
        {
            name: "Minecraft Servers",
            url: "https://minecraftservers.org/server/veltrixmc"
        },
        {
            name: "Top Minecraft Servers",
            url: "https://topminecraftservers.org/server/veltrixmc"
        },
        {
            name: "Minecraft MP",
            url: "https://minecraft-mp.com/server/veltrixmc"
        },
        {
            name: "Minecraft Server List",
            url: "https://minecraft-server-list.com/server/veltrixmc"
        },
        {
            name: "Minecraft Server List",
            url: "https://minecraft-server-list.com/server/veltrixmc"
        },
    ]
}

/*
    How to change rules:
    1. Set the key in the messages/{lang}.json files
    2. Set the label in the rules config below
    3. Set the description in the messages/{lang}.json files

    NOTE: The `label` and `description` need to be the same as the key in the messages/{lang}.json files under "Rules"
*/

export const serverRules = [
    {
        label: 'noCheating', // This relates to the key in the messages/{lang}.json file
        description: 'noCheatingDesc' // This relates to the key in the messages/{lang}.json file
    },
    {
        label: 'respectOthers',
        description: 'respectOthersDesc'
    },
    {
        label: 'noGriefing',
        description: 'noGriefingDesc'
    },
    {
        label: 'noAdvertising',
        description: 'noAdvertisingDesc'
    },
    {
        label: 'keepChatAppropriate',
        description: 'keepChatAppropriateDesc'
    }
];

export const discordRules = [
    {
        label: 'followDiscordTos',
        description: 'followDiscordTosDesc'
    },
    {
        label: 'noSpamming',
        description: 'noSpammingDesc'
    },
    {
        label: 'respectPrivacy',
        description: 'respectPrivacyDesc'
    },
    {
        label: 'noNsfwContent',
        description: 'noNsfwContentDesc'
    },
    {
        label: 'useChannelsProperly',
        description: 'useChannelsProperlyDesc'
    }
];
