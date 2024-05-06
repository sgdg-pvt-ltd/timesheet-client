import { useTranslation } from 'react-i18next';

import { Paths } from '~/interfaces/util-types';
import translations from '../../public/locales/en/translation.json';

type TranslationKeys = Paths<typeof translations>;

interface DateTranslationType {
	time?: Date;
	date?: Date;
}

export const useTypeSafeTranslation = () => {
	const { t } = useTranslation();

	return {
		t: (s: TranslationKeys, f?: DateTranslationType | any) => t(s, f),
	};
};
