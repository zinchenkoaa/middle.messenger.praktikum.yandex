export type Props = {
    name?: string;
    className?: string;
    body?: string;
    text?: string;
    label?: string;
    type?: string;
    id?: string;
    time?: string;
    validationType?: string;
    required?: boolean;
    value?: string;
    disabled?: boolean;
    errorMessage?: string;
    novalidate?: true;
    placeholder?: string;
    events?: {
        [key: string]: (event: Event) => void;
    };
    settings?: {
        withInternalID: boolean;
    };
} & Record<string, unknown>;

export interface AllFormData {
    [key: string]: string;
  }
