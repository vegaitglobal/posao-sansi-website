import { usePathname } from "next/navigation";
import { getPathnameLocale } from "@/utils";


interface UseTranslatableURLReturnValue {
  makeURLPath(path: string): string;
}

export function useTranslatableURL(): UseTranslatableURLReturnValue {
  const pathname = usePathname();
  const locale = getPathnameLocale(pathname);

  function makeURLPath(path: string): string {
    if (path.startsWith("/")) {
      path = path.slice(1);
    }
    return `/${ locale }/${ path }`;
  }

  return { makeURLPath };

}
