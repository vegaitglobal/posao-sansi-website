import getConfig from "next/config";
import { PublicRuntimeConfig } from "@/types";
import { mapPublicRuntimeConfigToENV } from "@/utils";

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();

/**
 * This ENV variable is only available on the server side
 */
export const ENV = mapPublicRuntimeConfigToENV(publicRuntimeConfig);
