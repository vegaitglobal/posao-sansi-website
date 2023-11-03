import { useState } from "react";
import { usePathname } from "next/navigation";
import { getPathnameLocale } from "@/utils";
import { SERBIAN_LOCALE } from "@/data/locales";
import { Dictionary } from "@/dictionaries/Dictionary";
import { getDictionary } from "@/dictionaries";

export function useDictionary() {
    const pathname = usePathname();
    const locale = getPathnameLocale(pathname);
    const [dict] = useState<Dictionary>(() => getDictionary(locale || SERBIAN_LOCALE));

    return { dict, locale };
}
