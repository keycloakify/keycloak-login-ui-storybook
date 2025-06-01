import { createGetKcContextMock } from "@keycloakify/keycloak-login-ui/KcContext/getKcContextMock";
import type { KcContextExtension, KcContextExtensionPerPage } from "../KcContext";
import { themeNames, kcEnvDefaults } from "../../kc.gen";

const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    properties: {
        ...kcEnvDefaults
    }
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {},
    overridesPerPage: {}
});
