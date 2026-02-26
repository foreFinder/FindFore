export interface Player {
  id: number;
  name: string;
  phone: string;
  email: string;
  username: string;
  friends: number[];
  events: number[];
}

export interface Course {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  cost: string;
}

export interface Event {
  id: number;
  course_name: string;
  date: string;
  tee_time: string;
  open_spots: number;
  number_of_holes: string;
  private: boolean;
  host_name: string;
  host_id: number;
  accepted: number[];
  declined: number[];
  pending: number[];
  closed: number[];
  remaining_spots: number;
}

export interface LoginResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  username: string;
  friends: number[];
  events: number[];
  token: string;
}

export interface Friend {
  id: number;
  name: string;
}

export interface Reaction {
  id: number;
  player_id: number;
  player_name: string;
  emoji: string;
}

export interface Reply {
  id: number;
  player_id: number;
  player_name: string;
  body: string;
  created_at: string;
}

export interface Post {
  id: number;
  player_id: number;
  player_name: string;
  body: string;
  created_at: string;
  reactions: Reaction[];
  replies: Reply[];
}

export interface HandleFriends {
  add: (friend: Friend) => void;
  remove: (friend: Friend) => void;
}

export interface HandleInviteAction {
  update: (eventId: number, status: string) => void;
  cancel: (event: Event) => void;
  join: (eventId: number) => void;
}
