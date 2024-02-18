

export type IStyleExtended = {

    marginVertical?: string | number;

    marginHorizontal?: string | number;


    paddingVertical?: string | number;

    paddingHorizontal?: string | number;


    borderVertical?: string | number;

    borderHorizontal?: string | number;

}

export type IStyle = IStyleExtended | {

    [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K];

}

export type IStyles = IStyle[]

export type IClassName = string;