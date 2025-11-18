'use client';

import { Box, Image, lighten, Modal, NumberFormatter, ScrollArea, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import parse from "html-react-parser";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

export default function RankPopup({ rank, children }) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Box w="auto" onClick={(e) => {
                setOpened(!opened)
            }}>
                {children}
            </Box>

            {rank.description &&
                <Modal styles={{ header: { display: "none" } }} padding="0" size="60rem" opened={opened} onClose={() => setOpened(false)}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} c="bright">
                        <Box p="2rem">
                            <Stack>
                                <Image fit="contain" src={rank.image} alt={rank.name} mah="18rem" w="auto" />
                                <AddToCartButton onComplete={() => setOpened(false)} package_id={rank.id} category_id={rank.category_id} />
                            </Stack>
                        </Box>
                        <Box pl="2rem" bg={lighten('var(--mantine-color-primary-5)', 0.8)}>
                            <ScrollArea c="#000" type="always" pt="1rem" offsetScrollbars h="26rem">
                                <Title c="#000" fz="2rem" order={2}>{rank.name}</Title>
                                <Text c="#000" fz="1.4rem"><NumberFormatter value={rank.total_price} /></Text>
                                <Box c="auto">
                                    {parse(rank.description)}
                                </Box>
                            </ScrollArea>
                        </Box>
                    </SimpleGrid>
                </Modal>}
        </>
    )
}