export interface Event {
  id: string;
  name: string;
  icon: string;
}

export interface PsychsheetPerson {
  id: number;
  name: string;
  wcaId: string;
  country: string;
  result: string;
  worldRank: number;
  notResult: boolean;
}
