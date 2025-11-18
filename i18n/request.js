import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '../helpers/localManager';
import { settings } from '../settings';

export default getRequestConfig(async () => {
    const locale = settings.translation_system.enabled ? await getUserLocale() : settings.translation_system.default_language;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});