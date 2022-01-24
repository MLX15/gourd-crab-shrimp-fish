export interface Card {
  photo: string;
  score: number;
  label: string;
}
export interface Message {
  player: Player;
  msg: string;
  createdAt: string;
}

export interface Player {
  readonly id: string;
  name: string;
  score: number;
}
