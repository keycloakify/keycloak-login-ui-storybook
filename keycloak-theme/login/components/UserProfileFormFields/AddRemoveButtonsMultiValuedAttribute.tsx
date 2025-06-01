import {
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction
} from "@keycloakify/keycloak-login-ui/useUserProfileForm";
import type { Attribute } from "@keycloakify/keycloak-login-ui/KcContext";
import { useI18n } from "../../i18n";

export function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction } = props;

    const { msg } = useI18n();

    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({
        attribute,
        values,
        fieldIndex
    });

    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    return (
        <>
            {hasRemove && (
                <>
                    <button
                        id={`kc-remove${idPostfix}`}
                        type="button"
                        className="pf-c-button pf-m-inline pf-m-link"
                        onClick={() =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: values.filter((_, i) => i !== fieldIndex)
                            })
                        }
                    >
                        {msg("remove")}
                    </button>
                    {hasAdd ? <>&nbsp;|&nbsp;</> : null}
                </>
            )}
            {hasAdd && (
                <button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    className="pf-c-button pf-m-inline pf-m-link"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
                >
                    {msg("addValue")}
                </button>
            )}
        </>
    );
}
