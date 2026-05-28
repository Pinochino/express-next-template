import { routing } from '@/src/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react'

interface ILocalProvider {
    children: React.ReactNode;
    params: Promise<{ locale: string }>
}

const LocaleProvider = async ({ children, params }: ILocalProvider) => {

    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <div>LocaleProvider</div>
    )
}

export default LocaleProvider