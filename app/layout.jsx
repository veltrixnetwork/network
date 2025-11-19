import "@mantine/carousel/styles.css";
import { Anchor, Box, ColorSchemeScript, Container, Group, Image, MantineProvider, Stack, Text, ThemeIcon } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import Link from "next/link";
import { FaDiscord, FaPlay } from "react-icons/fa";
import { TbCopy } from "react-icons/tb";
import JoinButton from "../components/JoinButton";
import Navbar from "../components/Navbar";
import ThemeHotkey from "../components/ThemeHotkey";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { BasketProvider } from "../contexts/BasketContext";
import { UserProvider } from '../contexts/UserContext';
import { settings } from "../settings";
import { theme } from "../theme/theme";
import "../theme/theme.css";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

export const metadata = {
  title: settings.server_name,
  description: "Welcome to " + settings.server_name + " Minecraft server.",
};

export const dynamicParams = false;

export default async function RootLayout({ children }) {
  const t = await getTranslations("Hero");
  const locale = await getLocale();
  const messages = await getMessages();

  let player = null;
  let discordCount = null;
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${settings.server_ip}`);
    const data = await res.json();
    player = data.players?.online.toLocaleString('en-GB') ?? null;
  } catch { }
  try {
    const discordRes = await fetch(`https://discord.com/api/v9/invites/${settings.discord_invite_code}?with_counts=true`);
    const discordData = await discordRes.json();
    discordCount = discordData.profile.online_count.toLocaleString('en-GB') ?? null;
  } catch { }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {settings.theme.enable_snow && <div className="snowflakes">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="snowflake">
                <div className="inner">❅</div>
              </div>
            ))}
          </div>}

          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <UserProvider>
              <ColorSchemeScript defaultColorScheme="dark" />
              <BasketProvider>
                <ModalsProvider>
                  <ThemeHotkey />

                  <Navbar />
                  <Notifications position="bottom-center" />
                  <Box className="page">
                    <Container>
                      <Group pt="12rem" pb="4rem" pos="relative" style={{ zIndex: 1 }} justify="space-evenly">
                        <JoinButton>
                          <Group visibleFrom="md" className="pointer">
                            <ThemeIcon radius="50%" color="primary" c="#000" size="4rem">
                              <FaPlay size="1.6rem" />
                            </ThemeIcon>
                            <div>
                              <Text fz="1.4rem" fw={700} c="bright">{t("playNow")}</Text>
                              <Group gap="0.4rem">
                                <TbCopy size="1.2rem" />
                                <Text size="lg" c="bright">{player !== null ? player : "..."} {t("online")}</Text>
                              </Group>
                            </div>
                          </Group>
                        </JoinButton>
                        <Link href="/">
                          <Image src={settings.hero_image_url} alt={settings.server_name} maw={{ base: 200, md: 250 }} className="main-logo" />
                        </Link>
                        <Anchor td="none " href={settings.discord_url} target="_blank">
                          <Group visibleFrom="md">
                            <div>
                              <Text ta="right" fz="1.4rem" fw={700} c="bright">{t("discord")}</Text>
                              <Text size="lg" c="bright">{discordCount !== null ? `${discordCount} ${t("online")}` : "..."}</Text>
                            </div>
                            <ThemeIcon radius="50%" color="primary" c="#000" size="4rem">
                              <FaDiscord size="1.6rem" />
                            </ThemeIcon>
                          </Group></Anchor>
                      </Group>
                    </Container>
                    {children}
                  </Box>
                  <Box p="0.4rem 1rem" mt="2rem" className="footer">
                    <Container>
                      <Group justify="space-between">
                        <Group>
                          <Link href="https://tebex.io" target="_blank">
                            <Image className="invert-icon" src="/tebex_logo.png" alt="Tebex Logo" h={40} /></Link>
                          <Stack gap={0} justify="space-between">
                            <Text>© {new Date().getFullYear()} {settings.server_name}. Reservados todos los derechos.</Text>
                            <Text size="sm" c="bright">El proceso de pago de este sitio web es propiedad de Tebex Limited y está operado por ella, que se encarga del cumplimiento de las normas sobre productos, la asistencia en la facturación y los reembolsos.</Text>
                          </Stack>
                        </Group>
                        <div>
                          <Group>
                            <Anchor c="bright" size="sm" href="https://checkout.tebex.io/impressum" target="_blank">Información legal</Anchor>
                            <Anchor c="bright" size="sm" href="https://checkout.tebex.io/terms" target="_blank">Terminos y condiciones</Anchor>
                            <Anchor c="bright" size="sm" href="https://checkout.tebex.io/privacy" target="_blank">Política de privacidad</Anchor>
                            <ThemeSwitcher />
                          </Group>
                        </div>
                      </Group>
                    </Container>
                  </Box>

                </ModalsProvider>
              </BasketProvider>
            </UserProvider>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
