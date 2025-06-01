import { assert } from "tsafe/assert";
import { useKcContext } from "../../KcContext";
import { Template } from "../../components/Template";
import { useI18n } from "../../i18n";
import { Form } from "./Form";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");

    const { msg, advancedMsg } = useI18n();

    return (
        <Template
            headerNode={
                kcContext.messageHeader !== undefined
                    ? advancedMsg(kcContext.messageHeader)
                    : msg("registerTitle")
            }
            displayMessage={kcContext.messagesPerField.exists("global")}
            displayRequiredFields
        >
            <Form />
        </Template>
    );
}
