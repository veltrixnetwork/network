'use client'

import { Button, Image, NumberInput, Paper, SegmentedControl, Text, TextInput, Title } from '@mantine/core'
import { getHotkeyHandler } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { useState } from 'react'
import { FaDiscord } from 'react-icons/fa'
import { TbUser } from 'react-icons/tb'
import { useBasket } from '../contexts/BasketContext'
import { useUser } from '../contexts/UserContext'
import { settings } from '../settings'
import { useTranslations } from 'next-intl';

export default function LoginForm({ onLogin }) {
    const t = useTranslations('Login');
    const [username, setUsername] = useState('')
    const [discordId, setDiscordId] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useUser()
    const { updateBasket } = useBasket()
    const [platform, setPlatform] = useState('java')

    const handleLogin = async () => {
        if (username === '') {
            notifications.show({
                title: t('usernameRequired'),
                message: t('pleaseEnterUsername'),
                color: 'red',
            })
            return
        }
        setLoading(true)

        try {
            const userResponse = await axios.get('/api/fetchUser?username=' + username + '&platform=' + platform)
            const userData = { ...userResponse.data.userData, discordId }

            const basketResponse = await fetch(`https://headless.tebex.io/api/accounts/${process.env.NEXT_PUBLIC_TEBEX_TOKEN}/baskets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    cancel_url: window.location.origin,
                    complete_url: `${window.location.origin}/completed`,
                })
            }).then(res => res.json())

            login(userData)
            updateBasket(basketResponse)
            modals.closeAll()

            if (discordId) {
                localStorage.setItem('discordId', discordId)
            }

            onLogin?.(userData)
        } catch (err) {
            console.log(err)
            setLoading(false)
            notifications.show({
                title: t('error'),
                message: err.response?.data?.error || t('errorOccurred'),
                styles: {
                    root: {
                        backgroundColor: '#eb525c',
                        boxShadow: '0px 2px 0px 1px #6e252a'
                    },
                    title: {
                        color: '#fff',
                        fontWeight: 700,
                    },
                    closeButton: {
                        color: '#fff',
                    },
                    description: {
                        color: '#fff',
                    }
                }
            })
        }
    }

    return (
        <>
            <Title order={2} c='bright' mb='xl' ta='center'>{t('loginToShop')}</Title>
            {settings?.bedrock_support && (
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    <Paper radius={12}
                        p={20}
                        bg={platform === 'java' ? '#1c2333' : '#11131c'}
                        bd={platform === 'java' ? '2px solid #228be6' : '2px solid #202330'}
                        onClick={() => setPlatform('java')}
                        className="pointer"
                        style={{
                            flex: 1,
                            userSelect: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'border 0.2s, background 0.2s',
                        }}
                    >
                        <Text mb="0.4rem" fw={600} size="lg" c={platform === 'java' ? '#228be6' : '#fff'}>{t('javaEdition')}</Text>
                        <Image src="/java.webp" alt={t('javaEdition')} h={52} w={52} fit="contain" />
                    </Paper>
                    <Paper radius={12}
                        p={20}
                        bg={platform === 'bedrock' ? '#1c2333' : '#11131c'}
                        bd={platform === 'bedrock' ? '2px solid #228be6' : '2px solid #202330'}
                        onClick={() => setPlatform('bedrock')}
                        className="pointer"
                        style={{
                            flex: 1,
                            userSelect: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'border 0.2s, background 0.2s',
                        }}
                    >
                        <Text mb="0.4rem" fw={600} size="lg" c={platform === 'bedrock' ? '#228be6' : '#fff'}>{t('bedrockEdition')}</Text>
                        <Image src="/bedrock.webp" alt={t('bedrockEdition')} h={52} w={52} fit="contain" />
                    </Paper>
                </div>
            )}
            <TextInput
                mb='md'
                size='lg'
                leftSection={<TbUser />}
                placeholder={t('enterUsername')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={getHotkeyHandler([["Enter", handleLogin]])}
            />
            <NumberInput
                mb='xl'
                rightSection={<div />}
                size='md'
                leftSection={<FaDiscord />}
                placeholder={t('discordIdOptional')}
                value={discordId}
                onChange={(e) => setDiscordId(e)}
                onKeyDown={getHotkeyHandler([["Enter", handleLogin]])}
            />
            <Button loading={loading} onClick={handleLogin} color='primary' fullWidth size='lg'>{t('login')}</Button>
        </>
    )
}

