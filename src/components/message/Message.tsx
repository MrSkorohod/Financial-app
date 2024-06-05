import { useTranslations } from 'next-intl';

type MessageProps = {
  path: string;
};

export default function Message({ path }: MessageProps) {
  const [namespace, message] = (path || '').split('.');
  const translate = useTranslations(namespace);
  return translate(message);
}
