import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import PlayerList from '../PlayerList/PlayerList';
import Login from '../Login/Login';
import CreateProfile from '../CreateProfile/CreateProfile';
import React, { useState, useEffect, useRef } from 'react';
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

function App() {
  const [events, setEvents] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [allPlayers, setAllPlayers] = useState([]);
  const [hostPlayer, setHostPlayer] = useState('');
  const [friends, setFriends] = useState([]);
  const [courses, setCourses] = useState([]);
  const makeFriendList = useRef(() => {});

  const addFriend = (friend) => {
    postFriendship(hostPlayer, friend.id).then((data) =>
      setFriends([
        ...friends,
        {
          id: data.data.attributes.followee.id,
          name: data.data.attributes.followee.name,
        },
      ])
    );
  };

  const removeFriend = (unFriend) => {
    deleteFriendship(hostPlayer, parseInt(unFriend.id)).then(
      (data) => {
        setFriends([
          ...friends.filter((f) => parseInt(f.id) !== parseInt(unFriend.id)),
        ]);
      }
    );
  };

  makeFriendList.current = () => {
    const friends = allPlayers.filter((p) =>
      hostPlayer?.attributes?.friends?.includes(parseInt(p.id))
    );
    return friends.map((f) => ({ name: f.name, id: f.id }));
  };

  const updateInvite = (eventId, status) => {
    postInviteAction(hostPlayer, eventId, status).then((events) =>
      setEvents(events.data)
    );
  };

  const validateLogin = (email, password) => {
    validateStandardLogin(email, password)
      .then(data => {
        setHostPlayer(parseInt(data.data.id))
        setFriends(data.data.attributes.friends)
        setEvents(data.data.attributes.events)
      })
  }

  useEffect(() => {
    if (hostPlayer && friends && events) {
      return(
        <Route
          exact path='/dashboard'
          render={() => <Dashboard />}
        />
      )
    }
  }, [hostPlayer, friends, events])

  const cancelCommitment = (event) => {
    if (event.attributes.host_id === hostPlayer.id) {
      deleteEvent(event.id, hostPlayer).then((events) =>
        setEvents(events.data)
      );
    } else {
      postInviteAction(hostPlayer, event.id, 'declined').then((events) =>
        setEvents(events.data)
      );
    }
  };

  const refreshEvents = () => {
    getAllEvents(hostPlayer).then((events) => setEvents(events.data));
  };

  const handleResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    getAllPlayers().then((players) => {
      setAllPlayers(
        players.data.map((p) => ({ name: p.attributes.name, id: p.id }))
      );
    });
    getAllCourses().then((courses) => setCourses(courses.data));
  }, []);

  useEffect(() => {
    setFriends(makeFriendList.current());

    if (hostPlayer) {
      getAllEvents(parseInt(hostPlayer)).then((events) => {
        console.log(events)
        setEvents(events.data)
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
