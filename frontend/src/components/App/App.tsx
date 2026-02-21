import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import PlayerList from '../PlayerList/PlayerList';
import Login from '../Login/Login';
import CreateProfile from '../CreateProfile/CreateProfile';
import { useState, useEffect, useRef } from 'react';
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
  const makeFriendList = useRef<() => Friend[]>(() => []);

  const addFriend = (friend: Friend) => {
    postFriendship(hostPlayer, friend.id).then((data) => {
      const attrs = data.data as Record<string, Record<string, { id: number; name: string }>>;
      setFriends([
        ...friends,
        {
          id: attrs.attributes.followee.id,
          name: attrs.attributes.followee.name,
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

  makeFriendList.current = () => {
    const friendList = allPlayers.filter((p) =>
      (hostPlayer as unknown as Record<string, Record<string, number[]>>)?.attributes?.friends?.includes(parseInt(p.id))
    );
    return friendList.map((f) => ({ name: f.name, id: parseInt(f.id) }));
  };

  const updateInvite = (eventId: string, status: string) => {
    postInviteAction(hostPlayer, eventId, status).then((events) =>
      setEvents(events.data as unknown as Event[])
    );
  };

  const validateLogin = (email: string, password: string) => {
    validateStandardLogin(email, password)
      .then(data => {
        if (!data) return;
        const player = data.data as Record<string, unknown>;
        const attrs = player.attributes as Record<string, unknown>;
        setHostPlayer(parseInt(player.id as string));
        setFriends(attrs.friends as Friend[]);
        setEvents(attrs.events as Event[]);
      });
  };

  useEffect(() => {
    // Intentionally empty — previously held dead code
  }, [hostPlayer, friends, events]);

  const cancelCommitment = (event: Event) => {
    if (event.attributes.host_id === hostPlayer) {
      deleteEvent(event.id, hostPlayer).then((events) =>
        setEvents(events.data as unknown as Event[])
      );
    } else {
      postInviteAction(hostPlayer, event.id, 'declined').then((events) =>
        setEvents(events.data as unknown as Event[])
      );
    }
  };

  const refreshEvents = () => {
    getAllEvents(hostPlayer).then((events) => setEvents(events.data as unknown as Event[]));
  };

  const handleResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    getAllPlayers().then((players) => {
      setAllPlayers(
        players.data.map((p) => {
          const attrs = p as Record<string, unknown>;
          const attributes = attrs.attributes as Record<string, string>;
          return { name: attributes.name, id: attrs.id as string };
        })
      );
    });
    getAllCourses().then((courses) => setCourses(courses.data as unknown as Course[]));
  }, []);

  useEffect(() => {
    setFriends(makeFriendList.current());

    if (hostPlayer) {
      getAllEvents(hostPlayer).then((events) => {
        console.log(events);
        setEvents(events.data as unknown as Event[]);
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
