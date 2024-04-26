export interface Values {
  [index: string]: string | number
}

export interface MWTResponse {
  success: boolean
  date: string
  url: string
  week: string
  mw: string
  mwTitle: string
  wt: string
  wtTitle: string
}
