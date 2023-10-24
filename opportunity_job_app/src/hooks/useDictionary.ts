import { useState } from "react";
import { usePathname } from "next/navigation";
import { getLangSlugFromPath } from "@/utils";
import { Dictionary, getDictionary } from "@/app/[lang]/dictionaries";
import { SERBIAN_LOCALE } from "@/appData/locales";

export function useLanguage() {
  const pathname = usePathname();
  const slug = getLangSlugFromPath(pathname);
  const [ dict ] = useState<Dictionary>(() => getDictionary(slug || SERBIAN_LOCALE));

  return { dict, slug };
}
