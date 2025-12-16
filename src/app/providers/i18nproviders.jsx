"use client"

import { I18nextProvider } from 'react-i18next'; // 導入 Provider
import { initI18n } from "./../../i18n";
import { useParams } from 'next/navigation';

const I18nProviders = ({ children }) => {

    const param = useParams();
    const lng = param.lng || "zh-TW";
    
    const i18n = initI18n( lng );

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    )
}

export default I18nProviders;