import { useState, useEffect, useCallback, useRef } from 'react';
import { Paper, Title, Stack, Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

import TeeTime from '../TeeTime/TeeTime';
import InviteTypeSelect from './InviteTypeSelect/InviteTypeSelect';
import type { Event, HandleInviteAction } from '../../types';

interface TeeTimeContainerProps {
  title: string;
  events: Event[];
  windowWidth: number;
  handleInviteAction: HandleInviteAction;
}

const TeeTimeContainer = ({
  title,
  events,
  windowWidth,
  handleInviteAction,
}: TeeTimeContainerProps) => {
  const [publicInvites, setPublicInvites] = useState<Event[]>([]);
  const [privateInvites, setPrivateInvites] = useState<Event[]>([]);
  const [committedTeeTimes, setCommittedTeeTimes] = useState<Event[]>([]);
  const [invitesToDisplay, setInvitesToDisplay] = useState(
    title === 'Committed Tee Times' ? '' : 'private'
  );
  const getEventType = useRef<() => string | undefined>(() => undefined);

  getEventType.current = useCallback(() => {
    if (title === 'Committed Tee Times') {
      return 'committed';
    } else if (title === 'Available Tee Times') {
      return 'available';
    }
  }, [title]);

  const displayNoInviteMessage = () => {
    return (
      <Text className='no-invites-card' c='dimmed' ta='center' py='xl'>
        There are currently no tee time invitations from{' '}
        {invitesToDisplay === 'private'
          ? 'your friends'
          : 'the ForeFinder community'}
        . Would you like to{' '}
        <Anchor className='no-invites-link' component={Link} to='/event-form' fw={700} c='green.6'>
          create an event
        </Anchor>
        ?
      </Text>
    );
  };

  const getTeeTimes = (eventsType: Event[]) => {
    return eventsType.map((event) => {
      return (
        <TeeTime
          key={event.id}
          type={getEventType.current()}
          event={event}
          handleInviteAction={handleInviteAction}
        />
      );
    });
  };

  useEffect(() => {
    if (getEventType.current() === 'available') {
      setPublicInvites(events.filter((event) => !event.private));
      setPrivateInvites(events.filter((event) => event.private));
    } else {
      setCommittedTeeTimes(events);
    }
  }, [events]);

  return (
    <Paper className='tee-time-container' shadow='sm' style={{ maxHeight: '80vh', minHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'rgb(221, 218, 218)', padding: '1rem', textAlign: 'center', position: 'sticky', top: 0, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        <Title order={3} fw={600} size='1.25rem'>
          {title}
        </Title>
      </div>

      {title === 'Available Tee Times' && windowWidth < 768 && (
        <div style={{ padding: '0.75rem' }}>
          <InviteTypeSelect handleClick={setInvitesToDisplay} />
        </div>
      )}

      <Stack gap='xs' p='md' style={{ overflowY: 'auto', flex: 1 }}>
        {title === 'Committed Tee Times' && getTeeTimes(committedTeeTimes)}
        {invitesToDisplay === 'private'
          ? getTeeTimes(privateInvites)
          : getTeeTimes(publicInvites)}
        {invitesToDisplay === '' && !events.length && (
          <Text c='dimmed' ta='center' py='xl'>
            You are not currently committed to any tee times. Hit accept on a tee time invitation to join.
          </Text>
        )}
        {invitesToDisplay === 'private' &&
          !privateInvites.length &&
          displayNoInviteMessage()}
        {invitesToDisplay === 'public' &&
          !publicInvites.length &&
          displayNoInviteMessage()}
      </Stack>

      {title === 'Available Tee Times' && windowWidth >= 768 && (
        <div style={{ background: 'rgb(221, 218, 218)', padding: '1rem', display: 'flex', justifyContent: 'center', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, position: 'sticky', bottom: 0 }}>
          <InviteTypeSelect handleClick={setInvitesToDisplay} />
        </div>
      )}
    </Paper>
  );
};

export default TeeTimeContainer;
