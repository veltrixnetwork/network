import { Accordion, AccordionControl, AccordionItem, AccordionPanel, Button, Container, Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { TbCopy } from "react-icons/tb";
import JoinButton from "../../../components/JoinButton";
import { discordRules,  serverRules, settings } from "../../../settings";
import { useTranslations } from 'next-intl';

export const metadata = {
    title: "Rules | " + settings.server_name,
    description: "Please read and follow all rules to ensure a safe and enjoyable experience for everyone."
}

export default function RulesPage() {
    const t = useTranslations('Rules');
    return (
        <Container size={1400} mb="6rem" pos="relative" style={{ zIndex: 1 }}>
            <Paper p={{ base: "1rem", md: "2rem" }} bg="primary" mb="1rem">
                <Title order={2} fz="2.6rem" ta="center" mb="0.6rem" c="#000">{t('title')}</Title>
                <Text ta="center" size="lg" c="#000">{t('description')}</Text>
            </Paper>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Paper p="2rem" className="hover-card">
                    <Title order={3} fz="1.6rem" mb="1.2rem">{t('serverRules')}</Title>
                    <Accordion variant="separated">
                        {serverRules.map((rule, idx) => (
                            <AccordionItem value={t(rule.label)} key={idx}>
                                <AccordionControl c="bright">{t(rule.label)}</AccordionControl>
                                <AccordionPanel>
                                    <Text size="lg">{t(rule.description)}</Text>
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Paper>
                <Paper p="2rem" className="hover-card">
                    <Title order={3} fz="1.6rem" mb="1.2rem" c="bright">{t('discordRules')}</Title>
                    <Accordion variant="separated">
                        {discordRules.map((rule, idx) => (
                            <AccordionItem value={t(rule.label)} key={idx}>
                                <AccordionControl c="bright">{t(rule.label)}</AccordionControl>
                                <AccordionPanel>
                                    <Text size="lg">{t(rule.description)}</Text>
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Paper>
            </SimpleGrid>
            <Paper bg="primary" p={{ base: "1rem", sm: "2rem" }} mt="1rem">
                <Group justify="space-between">
                    <div>
                        <Title order={2} c="#000" mb="0.4rem">{t('joinServer')}</Title>
                        <Text c="#000">
                            {t('joinToGetRewards')}
                        </Text>
                    </div>
                    <JoinButton>
                        <Button size="lg" variant="white" color="white" leftSection={<TbCopy />}>
                            <Text size="lg">{t('joinServer')}</Text>
                        </Button>
                    </JoinButton>
                </Group>
            </Paper>
        </Container>
    );
} 