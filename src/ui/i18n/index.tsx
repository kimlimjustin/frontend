import { navigatorDetector, queryStringDetector } from "typesafe-i18n/detectors";

export const DETECTORS = [
    navigatorDetector,
];

if(__DEV__) {
    DETECTORS.unshift(queryStringDetector);
}

import type { Locales, Namespaces } from "./i18n-types";
import { loadLocaleAsync, loadNamespaceAsync } from "./i18n-util.async";

// TODO: Figure out how to handle currencies.
export interface Currency extends Intl.NumberFormatOptions {
    compactDisplay?: "short" | "long",
    style: 'currency' | 'decimal' | 'percent' | 'unit',
    currency: string,
    currencyDisplay?: "symbol" | "narrowSymbol" | "code" | "name",
    currencySign?: "accounting" | "standard",
    notation?: "standard" | "scientific" | "engineering" | "compact",
    signDisplay?: "always" | "auto" | "exceptZero" | "negative" | "never",
    numberingSystem?: "arab" | "arabext" | "bali" | "beng" | "deva" | "fullwide" | "gujr" | "guru" | "hanidec" | "khmr" | "knda" | "laoo" | "latn" | "limb" | "mlym" | "mong" | "mymr" | "orya" | "tamldec" | "telu" | "thai" | "tibt"
}

export type ILanguages = {
    [K in Locales]: {
        /// Name of language (in language)
        n: string,
        /// Emoji used to represent it (flag usually)
        e: string,
        rtl?: boolean,
        /// DayJS Locale override
        d?: string,
    }
};

// @stringify
export const LANGUAGES: ILanguages = {
    'en-US': { n: "English (American)", e: "🇺🇸", d: 'en' },
    'en-GB': { n: "English (Traditional)", e: "🇬🇧", d: 'en-gb' },
    es: { n: "Español", e: "🇪🇸" },
    owo: { n: "OwO (English)", e: "😺", d: 'en' }
};