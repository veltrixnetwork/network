import {
    Anchor,
    BackgroundImage,
    Box,
    Button,
    Container,
    Grid,
    GridCol,
    Group,
    Image,
    NumberFormatter,
    Paper,
    SimpleGrid,
    Text,
    Title
} from "@mantine/core";

import fs from "fs";
import Link from "next/link";
import path from "path";
import { FaDiscord } from "react-icons/fa";
import { TbTarget, TbTrophy } from "react-icons/tb";

import CategoriesSidebar from "../../../components/CategoriesSidebar.jsx";
import CommunityGoal from "../../../components/CommunityGoal.jsx";
import FadeIn from "../../../components/FadeIn.jsx";
import LoginCTA from "../../../components/LoginCTA.jsx";

import { settings } from "../../../settings.js";
import { getCommunityGoal } from "../../../utils/getCommunityGoal.js";
import { getTopDonator } from "../../../utils/getTopDonator.js";
import { getCategories } from "../../../utils/getCategories.js";

import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StoreLayout({ children }) {
    const t = await getTranslations("Store");

    // 🔥 PROTEGIDO TOTAL (NO CRASH)
    const [communityGoal, topDonator, allCategories] = await Promise.all([
        getCommunityGoal().catch(() => null),
        getTopDonator().catch(() => ({ name: "", id: "", total: 0 })),
        getCategories().catch(() => [])
    ]);

    // 🔥 SAFE SETTINGS (CLAVE)
    const topCategories = settings?.top_categories || [];
    const featuredCategories = settings?.featured_categories || [];

    // 🔥 FS PROTEGIDO
    let rankTableExists = false;
    try {
        rankTableExists = fs.existsSync(
            path.join(process.cwd(), "components", "RanksTable.jsx")
        );
    } catch {
        rankTableExists = false;
    }

    return (
        <FadeIn>
            <Container pos="relative" style={{ zIndex: 1 }}>

                {/* CATEGORÍAS TOP */}
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                    {(allCategories || [])
                        .filter(category =>
                            topCategories.includes(category?.id?.toString?.() || "")
                        )
                        .map((category) => (
                            <Anchor
                                component={Link}
                                c="bright"
                                href={`/store/${category.slug}`}
                                key={category?.id}
                            >
                                <Paper
                                    className={
                                        "hover-card" +
                                        (topCategories.includes(category?.id?.toString?.() || "")
                                            ? " featured-category"
                                            : "")
                                    }
                                    p="1.4rem"
                                >
                                    {featuredCategories.includes(
                                        category?.id?.toString?.() || ""
                                    ) && (
                                        <Paper
                                            className="featured-category-label"
                                            px="0.4rem"
                                            fz="1rem"
                                        >
                                            {settings?.featured_categories_label || "FEATURED"}
                                        </Paper>
                                    )}

                                    <Group justify="center" wrap="nowrap">
                                        <Image
                                            src={category?.image_url || "/placeholder.png"}
                                            alt={category?.name || "category"}
                                            w={60}
                                        />
                                        <div>
                                            <Title fz="2rem" tt="uppercase" order={2}>
                                                {category?.name || "Unknown"}
                                            </Title>
                                            <Text>{category?.description || ""}</Text>
                                        </div>
                                    </Group>
                                </Paper>
                            </Anchor>
                        ))}
                </SimpleGrid>

                {/* GRID */}
                <Grid columns={24} gutter="2rem" mt="2rem">
                    <GridCol span={{ base: 24, sm: 12, md: 8, lg: 6 }}>

                        {settings?.show_login_cta && <LoginCTA />}

                        <Paper mb="1rem" p="1rem">
                            <CategoriesSidebar categories={allCategories || []} />
                        </Paper>

                        {/* RANKS */}
                        {rankTableExists && (
                            <Paper mb="1rem" p="1rem">
                                <Anchor component={Link} c="bright" href="/ranks">
                                    <Group wrap="nowrap">
                                        <Image src="/gift-box.png" alt="ranks" w={42} />
                                        <div>
                                            <Title fz="1.3rem" tt="uppercase" order={2}>
                                                {t("ranksComparison")}
                                            </Title>
                                            <Text size="sm">
                                                {t("compareRanksAndFeatures")}
                                            </Text>
                                        </div>
                                    </Group>
                                </Anchor>
                            </Paper>
                        )}

                        {/* COMMUNITY GOAL */}
                        {communityGoal && (
                            <Paper mb="1rem" p="1rem">
                                <Group mb="1rem" gap="0.8rem">
                                    <TbTarget size="1.8rem" />
                                    <Title order={2} c="bright">
                                        {t("communityGoal")}
                                    </Title>
                                </Group>
                                <CommunityGoal goal={communityGoal} />
                            </Paper>
                        )}

                        {/* TOP DONATOR */}
                        {topDonator?.id && (
                            <Paper mb="1rem" p="1rem 1rem 0 1rem">
                                <Group mb="1rem" gap="0.8rem">
                                    <TbTrophy size="1.8rem" />
                                    <Title order={2} c="bright">
                                        {t("topDonator")}
                                    </Title>
                                </Group>

                                <Group>
                                    <Image
                                        src={
                                            "https://visage.surgeplay.com/bust/128/" +
                                            topDonator?.name
                                        }
                                        alt={topDonator?.name}
                                        w={128}
                                    />
                                    <div>
                                        <Text size="xl" fw={700} c="bright">
                                            {topDonator?.name}
                                        </Text>
                                        <Text size="xl" c="bright">
                                            <NumberFormatter value={topDonator?.total || 0} />
                                        </Text>
                                    </div>
                                </Group>
                            </Paper>
                        )}

                        {/* SOPORTE */}
                        {settings?.show_support_widget && (
                            <Paper mb="1rem" p="1rem">
                                <Title c="bright" mb="0.6rem" order={2}>
                                    {t("needHelp")}
                                </Title>
                                <Text mb="1rem" size="lg">
                                    {t("joinDiscordForHelp")}
                                </Text>
                                <Button
                                    component={Link}
                                    leftSection={<FaDiscord size="1rem" />}
                                    href={settings.discord_url}
                                    target="_blank"
                                >
                                    {t("joinDiscord")}
                                </Button>
                            </Paper>
                        )}
                    </GridCol>

                    <GridCol span={{ base: 24, sm: 12, md: 16, lg: 18 }}>
                        {children}
                    </GridCol>
                </Grid>
            </Container>
        </FadeIn>
    );
}
