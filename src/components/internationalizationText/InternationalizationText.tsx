import { useTranslations } from 'next-intl';

type InternationalizationProps = {
  path: string;
};

export default function InternationalizationText({
  path,
}: InternationalizationProps) {
  const [namespace, message] = (path || '').split('.');
  const translate = useTranslations(namespace);
  return translate(message);
}
