const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const endpoints = {
  players: `${API_BASE}/api/v1/players`,
  courses: `${API_BASE}/api/v1/courses`,
  playerEvent: `${API_BASE}/api/v1/player-event`,
  singleEvent: `${API_BASE}/api/v1/event`,
  friendship: `${API_BASE}/api/v1/friendship`,
  sessions: `${API_BASE}/api/v1/sessions`,
};

interface ApiResponse {
  data: Record<string, unknown>;
}

interface ApiListResponse {
  data: Record<string, unknown>[];
}

export const getAllPlayers = (): Promise<ApiListResponse> => {
  return fetch(endpoints.players)
    .then(resp => {
      if (!resp.ok) {
        throw new Error("Can't fetch any players, please try again!");
      } else {
        return resp.json();
      }
    });
};

export const getAllCourses = (): Promise<ApiListResponse> => {
  return fetch(endpoints.courses)
    .then(resp => {
      if (!resp.ok) {
        throw new Error("Can't fetch any courses, please try again!");
      } else {
        return resp.json();
      }
    });
};

export const getAllEvents = (playerId: number): Promise<ApiListResponse> => {
  return fetch(`${endpoints.players}/${playerId}/events`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Can\'t fetch any events, please try again!');
      } else {
        return resp.json();
      }
    });
};

export const postEvent = (
  courseId: string,
  date: string,
  teeTime: string,
  openSpots: string,
  numHoles: string,
  isPrivate: boolean,
  hostId: number,
  selectedFriends: number[]
): Promise<ApiResponse> | undefined => {
  if (!courseId || !teeTime) {
    return;
  }
  return fetch(`${endpoints.singleEvent}`, {
    method: 'POST',
    body: JSON.stringify({
      course_id: courseId,
      date: date,
      tee_time: teeTime,
      open_spots: openSpots,
      number_of_holes: numHoles,
      private: isPrivate,
      host_id: hostId,
      invitees: selectedFriends,
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error();
    }
  });
};

export const postInviteAction = (playerId: number, eventId: string, inviteStatus: string): Promise<ApiListResponse> => {
  return fetch(endpoints.playerEvent, {
    method: 'PATCH',
    body: JSON.stringify({
      player_id: playerId,
      event_id: eventId,
      invite_status: inviteStatus
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(() => getAllEvents(playerId));
};

export const deleteEvent = (eventId: string, playerId: number): Promise<ApiListResponse> => {
  return fetch(`${endpoints.singleEvent}/${eventId}`, {
    method: 'DELETE'
  })
  .then(() => getAllEvents(playerId));
};

export const postFriendship = (followerId: number, followeeId: number): Promise<ApiResponse> => {
  return fetch(`${endpoints.friendship}`, {
    method: 'POST',
    body: JSON.stringify({
      follower_id: followerId,
      followee_id: followeeId
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error('Unable to update friendship, please try again!');
    }
  });
};

export const deleteFriendship = (followerId: number, followeeId: number): Promise<Response> => {
  return fetch(`${endpoints.friendship}`, {
    method: 'DELETE',
    body: JSON.stringify({
      follower_id: followerId,
      followee_id: followeeId
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(resp => {
    if (resp.ok) {
      return resp;
    } else {
      throw new Error('Unable to update friendship, please try again!');
    }
  });
};

export const createNewProfile = (
  name: string,
  phone: string,
  email: string,
  userName: string,
  password: string,
  passwordConfir: string
): Promise<ApiResponse> => {
  return fetch(`${endpoints.players}`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      username: userName,
      password: password,
      password_confirmation: passwordConfir
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error('Unable to create new profile, please try again!');
    }
  });
};

export const validateStandardLogin = (email: string, password: string): Promise<ApiResponse | undefined> => {
  return fetch(`${endpoints.sessions}`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    }
  });
};
