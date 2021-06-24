import React, { createContext, useContext, useMemo, lazy } from "react";

import { LangItemProps } from "./createTranslation";
import { Translation } from "./translation";
export { Translation } from "./translation";

type Loader = () => Promise<{ default: React.FunctionComponent<LangItemProps> }>;
type Lazy = React.LazyExoticComponent<React.FunctionComponent<LangItemProps>>;
type LazyLoader = Loader | Lazy;

/** Composite type of all possible languages */
export type Language = "en"; // "en" | "es" | "de" | etc.
export const LANGS: Language[] = ["en"];

export interface ILocaleContext {
    lang: Language,
    setLocale: (locale: Language) => void,
}

/** Context for subtree translations and locales */
export const LocaleContext = createContext<ILocaleContext>({ lang: "en", setLocale: (locale: Language) => { } });
LocaleContext.displayName = "LocaleContext";


const LANG_INIT: Record<Language, LazyLoader> = {
    "en": () => import(/* webpackChunkName: 'i18n.en' */ "./lang/en"),
};


/** Initiates the loading of a language pack and returns a
 *  lazy React component for async rendering */
export function preload(lang: Language): Lazy {
    let loader = LANG_INIT[lang];

    if(loader instanceof Function) {
        let promise = loader(); // start loading now, as the language pack is needed ASAP
        loader = LANG_INIT[lang] = React.lazy(() => promise);
    }

    return loader as Lazy;
}

/**
 * Construct an [[I18N]] element inline.
 *
 * ```jsx
 * import { Translation as T } from "./i18n";
 *
 * <span>
 *     {i18n(T.CHANNEL)}
 * </span>
 * ```
 * */
export function i18n(
    t: Translation,
    count?: number,
    render?: (text: string) => React.ReactNode,
) {
    return <I18N t={t} count={count} render={render} />;
};

/**
 * Memoized component that uses the LocaleContext to select a language,
 * and the props to select which translation string to render.
 * */
export const I18N: React.FunctionComponent<LangItemProps> = function(props: LangItemProps) {
    // https://github.com/facebook/react/issues/15156
    let { lang } = useContext(LocaleContext);
    return useMemo(() => {
        let Lang = preload(lang);
        return <Lang {...props} />
    }, [lang, props]);
};
