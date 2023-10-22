import { useState } from "react";
import { usePathname } from "next/navigation";
import { getLangSlugFromPath } from "@/utils";
import { getDictionary } from "@/app/[lang]/dictionaries";

export function useLanguage() {
    const pathname = usePathname();
    const slug = getLangSlugFromPath(pathname);
    const [dict] = useState<any>(() => getDictionary(slug));

    return { dict, slug };
}
