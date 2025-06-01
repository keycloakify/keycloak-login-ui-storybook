import { i18nBuilder } from "@keycloakify/keycloak-login-ui/i18n";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { I18nProvider, useI18n } = i18nBuilder.withThemeName<ThemeName>().build();

export { useI18n, I18nProvider };
