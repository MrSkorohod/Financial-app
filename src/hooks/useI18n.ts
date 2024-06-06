'use client';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export default function useI18n(path = '', options?: Record<string, string>) {
  const [namespace, message] = (path || '').split('.');
  const translate = useTranslations(namespace);

  return useMemo(
    () => translate(message, options),
    [translate, message, options]
  );
}
