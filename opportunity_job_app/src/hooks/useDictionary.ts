import { useState } from "react";
import { usePathname } from "next/navigation";
import { getLangSlugFromPath } from "@/utils";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { SERBIAN_LOCALE } from "@/appData/locales";
import { Dictionary } from "@/app/[lang]/dictionaries/Dictionary";

export function useLanguage() {
  const pathname = usePathname();
  const slug = getLangSlugFromPath(pathname);
  const [ dict ] = useState<Dictionary>(() => getDictionary(slug || SERBIAN_LOCALE));

  return { dict, slug };
}
