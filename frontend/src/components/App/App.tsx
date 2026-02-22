import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import PlayerList from '../PlayerList/PlayerList';
import Login from '../Login/Login';
import CreateProfile from '../CreateProfile/CreateProfile';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import EventForm from '../EventForm/EventForm';
import {
  getAllCourses,
  getAllPlayers,
  getAllEvents,
  postInviteAction,
  deleteEvent,
  postFriendship,
  deleteFriendship,
  validateStandardLogin,
} from '../../APICalls/APICalls';
import type { Event, Friend, Course, Player } from '../../types';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [hostPlayer, setHostPlayer] = useState<number>(0);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const addFriend = (friend: Friend) => {
    postFriendship(hostPlayer, friend.id).then((data) => {
      setFriends([
        ...friends,
        {
          id: data.followee.id,
          name: data.followee.name,
        },
      ]);
    });
  };

  const removeFriend = (unFriend: Friend) => {
    deleteFriendship(hostPlayer, unFriend.id).then(
      () => {
        setFriends([
          ...friends.filter((f) => f.id !== unFriend.id),
        ]);
      }
    );
  };

  const updateInvite = (eventId: number, status: string) => {
    postInviteAction(hostPlayer, eventId, status).then((events) =>
      setEvents(events)
    );
  };

  const validateLogin = (email: string, password: string) => {
    validateStandardLogin(email, password)
      .then(data => {
        if (!data) return;
        setHostPlayer(data.id);
        if (data.token) {
          localStorage.setItem('jwt_token', data.token);
        }
        // Friends will be populated from allPlayers once hostPlayer is set
      });
  };

  useEffect(() => {
    // Intentionally empty — previously held dead code
  }, [hostPlayer, friends, events]);

  const cancelCommitment = (event: Event) => {
    if (event.host_id === hostPlayer) {
      deleteEvent(event.id, hostPlayer).then((events) =>
        setEvents(events)
      );
    } else {
      postInviteAction(hostPlayer, event.id, 'declined').then((events) =>
        setEvents(events)
      );
    }
  };

  const refreshEvents = () => {
    getAllEvents(hostPlayer).then((events) => setEvents(events));
  };

  const handleResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    getAllPlayers().then((players) => {
      setAllPlayers(players);
    });
    getAllCourses().then((courses) => setCourses(courses));
  }, []);

  useEffect(() => {
    if (hostPlayer) {
      // Build friend list from allPlayers + the logged-in player's friends array
      const currentPlayer = allPlayers.find((p) => p.id === hostPlayer);
      if (currentPlayer && currentPlayer.friends) {
        const friendList = allPlayers
          .filter((p) => currentPlayer.friends.includes(p.id))
          .map((f) => ({ name: f.name, id: f.id }));
        setFriends(friendList);
      }

      getAllEvents(hostPlayer).then((events) => {
        setEvents(events);
      });
    }
  }, [allPlayers, hostPlayer]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <Header screenWidth={screenWidth} />
      <Routes>
        <Route
          path='/login'
          element={<Login validateLogin={validateLogin} />}
        />
        <Route
          path='/create-profile'
          element={<CreateProfile />}
        />
        <Route
          path='/dashboard'
          element={
            <Dashboard
              events={events}
              currentUserId={hostPlayer}
              currentUserName={allPlayers.find((p) => p.id === hostPlayer)?.name || ''}
              screenWidth={screenWidth}
              handleInviteAction={{
                update: updateInvite,
                cancel: cancelCommitment,
              }}
              players={allPlayers}
              friends={friends}
              handleFriends={{ add: addFriend, remove: removeFriend }}
            />
          }
        />
        <Route
          path='/community'
          element={
            screenWidth > 480 ? (
              <Navigate to='/dashboard' />
            ) : (
              <PlayerList
                screenWidth={screenWidth}
                userId={hostPlayer}
                players={allPlayers}
                friends={friends}
                handleFriends={{ add: addFriend, remove: removeFriend }}
              />
            )
          }
        />
        <Route
          path='/event-form'
          element={
            <EventForm
              courses={courses}
              friends={friends}
              hostId={hostPlayer}
              refreshEvents={refreshEvents}
            />
          }
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;
