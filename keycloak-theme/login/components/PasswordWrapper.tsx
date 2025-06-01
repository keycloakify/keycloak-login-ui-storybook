import type { JSX } from "@keycloakify/keycloak-login-ui/tools/JSX";
import { useIsPasswordRevealed } from "@keycloakify/keycloak-login-ui/tools/useIsPasswordRevealed";
import { useKcClsx } from "@keycloakify/keycloak-login-ui/useKcClsx";
import { useI18n } from "../i18n";

export function PasswordWrapper(props: { passwordInputId: string; children: JSX.Element }) {
    const { passwordInputId, children } = props;

    const { msgStr } = useI18n();

    const { kcClsx } = useKcClsx();

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i
                    className={kcClsx(
                        isPasswordRevealed
                            ? "kcFormPasswordVisibilityIconHide"
                            : "kcFormPasswordVisibilityIconShow"
                    )}
                    aria-hidden
                />
            </button>
        </div>
    );
}
