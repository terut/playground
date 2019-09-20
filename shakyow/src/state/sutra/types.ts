export interface Sutra {
  id?: string,
  url: string,
  description: string;
}

export interface Context {
  isRedirect?: boolean
  error?: {}
}

export interface SutraState {
  sutras: Sutra[]
  context: Context
}