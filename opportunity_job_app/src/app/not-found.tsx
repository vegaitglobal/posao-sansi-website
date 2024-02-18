"use client";

import "./not-found.scss";
import { useDictionary } from "@/hooks/useDictionary";

export default function HomePage() {
  const { dict, locale } = useDictionary();

  return (
      <>
        <h1>{ dict.notFound.title }</h1>
        <h2>{ dict.notFound.subtitle }</h2>
      </>
  );
}
