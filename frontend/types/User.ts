export interface UserType {
  email: string;
  password: string;
  name: string;
}

export interface EmojiType {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

export interface FeedbackType {
  title: string;
  description: string;
  type?: string;
  anonymous: boolean;
}
