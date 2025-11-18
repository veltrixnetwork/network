"use client";

import {
    Anchor,
    Box,
    Burger,
    Button,
    Container,
    Drawer,
    Group,
    Image,
    NumberFormatter,
    ScrollArea,
    Stack,
    Text,
    rem
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TbArticle, TbBook2, TbCopy, TbHome, TbSchool, TbShoppingCart, TbTrophy, TbUserFilled } from 'react-icons/tb';
import { useUser } from '../contexts/UserContext';
import { settings } from '../settings';
import Basket from './Basket';
import JoinButton from './JoinButton';
import LoginForm from './LoginForm';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function Navbar() {
    const t = useTranslations('Navbar');
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { user, loading } = useUser();
    const [onlinePlayers, setOnlinePlayers] = useState(0);

    const openLoginModal = () => {
        closeDrawer();
        modals.open({
            children: <LoginForm />,
            size: "50rem",
            padding: "3rem",
            styles: {
                header: {
                    backgroundColor: "transparent",
                }
            }
        });
    }

    useEffect(() => {
        if (settings.server_ip) {
            fetch(`https://api.mcsrvstat.us/3/${settings.server_ip}`).then(res => res.json()).then(data => {
                setOnlinePlayers(data.players.online);
            });
        }
    }, []);

    return (
        <Box className="navbar scrolled navbar-glass">
            <Container py="0.8rem">
                <header>
                    <Group pos="relative" style={{ zIndex: 5 }} justify="space-between" h="100%">
                        <Group gap="4rem">
                            <Link href="/">
                                <Image onClick={closeDrawer} style={{ zIndex: 10 }} src={settings.navbar_logo_url} alt={settings.server_name} w="auto" h={70} />
                            </Link>
                            <Group gap="2rem" h="100%" visibleFrom="md">
                                <Group td="none" c="bright" component={Link} href="/" gap="0.4rem">
                                    <TbHome size="1.2rem" />
                                    <Text size="lg">{t('home')}</Text>
                                </Group>
                                <Group td="none" c="bright" component={Link} href="/store" gap="0.4rem">
                                    <TbShoppingCart size="1.2rem" />
                                    <Text size="lg">{t('store')}</Text>
                                </Group>
                                <Group td="none" c="bright" component={Link} href="/vote" gap="0.4rem">
                                    <TbTrophy size="1.2rem" />
                                    <Text size="lg">{t('vote')}</Text>
                                </Group>
                                {settings.blog_system.enabled && (
                                    <Group td="none" c="bright" component={Link} href="/blog" gap="0.4rem">
                                        <TbArticle size="1.2rem" />
                                        <Text size="lg">{t('blog')}</Text>
                                    </Group>
                                )}
                                <Group td="none" c="bright" component={Link} href="/rules" gap="0.4rem">
                                    <TbSchool size="1.2rem" />
                                    <Text size="lg">{t('rules')}</Text>
                                </Group>
                                {settings.wiki_link.shown && (
                                    <Group td="none" c="bright" component={Link} target="_blank" href={settings.wiki_link.url} gap="0.4rem">
                                        <TbBook2 size="1.2rem" />
                                        <Text size="lg">{t('wiki')}</Text>
                                    </Group>
                                )}
                            </Group>
                        </Group>

                        <Group gap="2rem" visibleFrom="md">
                            <Group>
                                <LanguageSwitcher />
                                {!loading && user && (
                                    <Basket user={user} />
                                )}
                                {!loading && (
                                    <Button bg="primary" h="3.1rem" leftSection={<TbUserFilled />} size="lg" variant="login" onClick={openLoginModal}>
                                        <Text fw={600}>{!user ? t('login') : user?.name}</Text>
                                    </Button>
                                )}
                            </Group>
                            <JoinButton>
                                <Button className="play-button" size="lg">
                                    <Stack align="center" gap={5}>
                                        <Text mb="-0.2rem" fw={700}><NumberFormatter prefix="" value={onlinePlayers} /> {t('online')}</Text>
                                        <Group gap="0.2rem">
                                            <TbCopy size="0.9rem" />
                                            <Text mb="-2px" size="xs" mt="-0.2rem" fw={700}>{settings.server_ip}</Text>
                                        </Group>
                                    </Stack>
                                </Button>
                            </JoinButton>
                        </Group>

                        <Burger color="#fff" style={{ zIndex: 10 }} opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
                    </Group>
                </header>
            </Container>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="20rem"
                closeButtonProps={{
                    c: "#fff"
                }}
                styles={{
                    header: {
                        backgroundColor: "transparent"
                    }
                }}
                title={<Link href="/"><Image src={settings.navbar_logo_url} alt={settings.server_name} w="auto" h={100} /></Link>}
                padding="md"
                hiddenFrom="md"
                zIndex={1000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Stack mx="1rem">
                        <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} href="/">{t('home')}</Anchor>
                        <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} href="/store">{t('store')}</Anchor>
                        <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} href="/vote">{t('vote')}</Anchor>
                        {settings.blog_system.enabled && (
                            <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} href="/blog">{t('blog')}</Anchor>
                        )}
                        {settings.wiki_link.shown && (
                            <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} target="_blank" href={settings.wiki_link.url}>{t('wiki')}</Anchor>
                        )}
                        <Anchor onClick={closeDrawer} size="lg" fw={800} c="bright" component={Link} href="/rules"><Group gap="0.4rem"><TbBook2 size="1.2rem" /><Text size="lg">{t('rules')}</Text></Group></Anchor>
                        <Group>
                            <LanguageSwitcher />
                            {(user !== null && user !== "") && (
                                <Basket key={new Date().getTime()} user={user} />
                            )}
                        </Group>
                        {user !== null && (
                            <Button bg="primary" h="3.1rem" leftSection={<TbUserFilled />} size="lg" variant="login" onClick={openLoginModal}>
                                <Text fw={600}>{user === "" ? t('login') : user?.name}</Text>
                            </Button>
                        )}
                        <JoinButton>
                            <Button className="play-button" size="lg">
                                <Stack align="center" gap={5}>
                                    <Text mb="-0.2rem" fw={700}><NumberFormatter prefix="" value={onlinePlayers} /> {t('online')}</Text>
                                    <Group gap="0.2rem">
                                        <TbCopy size="0.9rem" />
                                        <Text mb="-2px" size="xs" mt="-0.2rem" fw={700}>{settings.server_ip}</Text>
                                    </Group>
                                </Stack>
                            </Button>
                        </JoinButton>
                    </Stack>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

