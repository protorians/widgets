import {TextAligning} from "../enums";

export type ITypographySettings = {
  family?: string;
  size?: string;
  weight?: string;
  line?: string;
  spacing?: string;
  align?: TextAligning;
}