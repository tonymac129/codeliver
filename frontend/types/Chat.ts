export interface MessageType {
  id: string;
  from: string;
  message: string;
  createdAt: Date;
  reactions?: ReactionType[];
}

export interface ReactionType {
  emoji: string;
  reacted: string[];
}
