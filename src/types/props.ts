export type Props = {
    name?: string;
    className?: string;
    body?: string;
    text?: string;
    label?: string;
    type?: string;
    id?: string
    validationType?: string;
    required?: boolean;
    value?: string;
    disabled?: boolean;
    errorMessage?: string;
    novalidate?: true;
    events?: {
        [key: string]: (event: Event) => void;
    };
    settings?: {
        withInternalID: boolean;
    };
    attr?: Record<string, string>;
} & Record<string, unknown>;
