export interface Player {
  id: string;
  name: string;
}

export interface PlayerAttributes {
  name: string;
  phone: string;
  email: string;
  username: string;
  friends: Friend[];
  events: Event[];
}

export interface Course {
  id: string;
  type: string;
  attributes: CourseAttributes;
}

export interface CourseAttributes {
  name: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  cost: number;
}

export interface Event {
  id: string;
  type: string;
  attributes: EventAttributes;
}

export interface EventAttributes {
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

export interface Friend {
  id: number;
  name: string;
}

export interface HandleFriends {
  add: (friend: Friend) => void;
  remove: (friend: Friend) => void;
}

export interface HandleInviteAction {
  update: (eventId: string, status: string) => void;
  cancel: (event: Event) => void;
}
