export interface MessageType {
  id: string;
  userId: string;
  message: string;
  chatId: string;
  createdAt: Date;
  updatedAt: Date;
  reactions?: ReactionType[];
}

export interface ReactionType {
  emoji: string;
  reacted: string[];
}

export interface ChannelType {
  name: string;
  description: string;
  private?: boolean;
}
