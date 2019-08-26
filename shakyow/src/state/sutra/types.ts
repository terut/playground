export interface Sutra {
  url: string,
  description: string;
};

export interface SutraState {
  sutras: Sutra[],
};

export const ADD_SUTRA = "ADD_SUTRA";

interface AddSutraAction {
  type: typeof ADD_SUTRA
  payload: Sutra
}

export type SutraActionTypes = AddSutraAction;