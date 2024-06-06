'use client';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type InternationalizationProps = {
  path: string;
};

export default function I18nText({ path }: InternationalizationProps) {
  const [namespace, message] = (path || '').split('.');
  const translate = useTranslations(namespace);

  return useMemo(() => translate(message), [message, translate]);
}
