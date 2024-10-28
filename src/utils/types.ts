import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type BasicObject = {
  source: string;
  objectId: number;
};
