import type {
    IProps,
    IStateSchema,
    IWidget,
    IWidgetElements
} from "./index";

export type IDataValue = string | number | object | boolean | null | undefined;

export type ISupportableValue = IDataValue | IWidget<IProps, IStateSchema, IWidgetElements>

export type IOnOff = 'on' | 'off';

export type IYesNo = 'yes' | 'no';

export type IBoolean = 'true' | 'false';

export type ILoading = 'eager' | 'lazy';

export type ISandbox = 'allow-forms' | 'allow-pointer-lock' | 'allow-popups' | 'allow-same-origin' | 'allow-scripts' | 'allow-top-navigation';

export type IReferrerPolicy = 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | ' origin-when-cross-origin'
    | 'unsafe-url';

export type ITarget =
    '_blank'
    | '_self'
    | '_parent'
    | '_top'
    | string;


export type IFormRelationship = 'external'

    | 'license'

    | 'next'

    | 'nofollow'

    | 'noopener'

    | 'noreferrer'

    | 'opener'

    | 'prev'

    | 'search'

    | 'help';