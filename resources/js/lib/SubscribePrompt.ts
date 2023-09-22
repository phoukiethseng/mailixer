import React from "react";

export type SubscribePromptProps = {
    name: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

// Return a type of SubscribePropmpt component base on  given template name
const getSubscribePromptComponent = (
    template?: string
): React.FunctionComponent<SubscribePromptProps> => {
    const templateName = template ?? "Default";
    const SubscribePrompt = React.lazy(
        () => import(resolveTemplate(templateName))
    );
    return SubscribePrompt;
};

const resolveTemplate = (template: string) =>
    `../Components/Templates/SubscribePrompt/${template}`;

export { getSubscribePromptComponent };
