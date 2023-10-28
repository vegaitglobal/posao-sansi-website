import { useState } from "react";
import { usePathname } from "next/navigation";
import { getLangSlugFromPath } from "@/utils";
import { SERBIAN_LOCALE } from "@/appData/locales";
import { Dictionary } from "@/dictionaries/Dictionary";
import { getDictionary } from "@/dictionaries";

export function useDictionary() {
    const pathname = usePathname();
    const slug = getLangSlugFromPath(pathname);
    const [dict] = useState<Dictionary>(() => getDictionary(slug || SERBIAN_LOCALE));

    return { dict, slug };
}
