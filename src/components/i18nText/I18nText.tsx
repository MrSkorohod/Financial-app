'use client';
import useI18n from '@/hooks/useI18n';

type InternationalizationProps = {
  path: string;
  option?: Record<string, string>;
};

export default function I18nText({ path, option }: InternationalizationProps) {
  return useI18n(path, option);
}
