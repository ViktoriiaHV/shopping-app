import { Dispatch } from "redux";

export type ActionsCreators<Type> = {
  [key: string]: (payload?: any) => { type: Type; payload?: any } | ((dispatch: Dispatch) => { type: Type; payload?: any });
};
