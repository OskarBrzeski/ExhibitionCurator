import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type BasicObject = {
  source: string;
  objectId: number;
};

export type SubmitEvent = FormEvent<HTMLFormElement>;
export type SelectEvent = ChangeEvent<HTMLSelectElement>;
