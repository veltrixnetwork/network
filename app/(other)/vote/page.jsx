import { Anchor, Button, Container, Grid, GridCol, Group, Image, List, ListItem, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { TbArrowRight, TbCopy, TbLink } from "react-icons/tb";
import JoinButton from "../../../components/JoinButton";
import { settings } from "../../../settings";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
    title: "Vote | " + settings.server_name,
    description: "Vote for " + settings.server_name + " to earn rewards!",
    openGraph: {
        title: "Vote | " + settings.server_name,
        description: "Vote for " + settings.server_name + " to earn rewards!",
    }
}

export default async function Page() {
    const t = await getTranslations('Vote');
    const tJoin = await getTranslations('Join');
    return (
        <>
            <Container mb="6rem" pos="relative" style={{ zIndex: 1 }}>
                <SimpleGrid mb="1rem" cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="0.6rem">
                    {settings.voting_links.map((item) => (
                        <Paper bg="primary" p="1rem" key={item.name}>
                            <Anchor size="lg" td="none" c="#000" href={item.url} target="_blank">
                                <Group gap="0.4rem">
                                    <TbLink size="1.8rem" />
                                    <Text size="xl" p="0.4rem">{item.name}</Text>
                                </Group>
                            </Anchor>
                        </Paper>
                    ))}
                </SimpleGrid>
                <Paper h="100%" mb="1rem" p="1rem">
                    <Title order={2} mb="1rem">{t('howToVote')}</Title>
                    <Text mb="1rem">
                        {t('toEarnRewards', { server_name: settings.server_name })}
                    </Text>
                    <List type="ordered" spacing="md">
                        <ListItem>
                            {t('step1')}
                        </ListItem>
                        <ListItem>
                            {t('step2')}
                        </ListItem>
                        <ListItem>
                            {t('step3')}
                        </ListItem>
                    </List>
                </Paper>
                <Paper p="1rem">
                    <Title order={2} mb="1rem">{t('thankYou')}</Title>
                    <Text>
                        {t('yourVoteHelps')}
                    </Text>
                </Paper>
                <Paper bg="primary" p="1rem" mt="1rem">
                    <Group justify="space-between">
                        <div>
                            <Title order={2} c="#000" mb="0.4rem">{tJoin('joinServer')}</Title>
                            <Text c="#000">
                                {tJoin('joinToGetRewards')}
                            </Text>
                        </div>
                        <JoinButton>
                            <Button size="lg" variant="white" color="white" leftSection={<TbCopy />}>
                                <Text size="lg">{tJoin('joinServer')}</Text>
                            </Button>
                        </JoinButton>
                    </Group>
                </Paper>
            </Container>
        </>
    );
}
