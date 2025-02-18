import type {Sizer} from "../enums";
import type {IChildrenSupported, IWidgetDeclaration} from "./widget";
import type {IChildren} from "./children";
import type {ICommonAttributes} from "./attributes";
import type {IStyleSheetDeclarations} from "./style";

export interface IContainerProps {
    size?: number | string | Sizer;
    style?: IStyleSheetDeclarations;
    contentAttributes?: Omit<IWidgetDeclaration<HTMLElement, ICommonAttributes>, 'children'>;
    children: IChildren<IChildrenSupported>;
}
