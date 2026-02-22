import { useState, useEffect, useCallback, useRef } from 'react';
import { Paper, Title, Stack, Badge, Group } from '@mantine/core';
import { FiCalendar, FiMail } from 'react-icons/fi';

import TeeTime from '../TeeTime/TeeTime';
import EmptyState from '../EmptyState/EmptyState';
import InviteTypeSelect from './InviteTypeSelect/InviteTypeSelect';
import type { Event, HandleInviteAction } from '../../types';

interface TeeTimeContainerProps {
  title: string;
  events: Event[];
  handleInviteAction: HandleInviteAction;
}

const TeeTimeContainer = ({
  title,
  events,
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

  const isAvailable = title === 'Available Tee Times';
  const displayCount = isAvailable
    ? (invitesToDisplay === 'private' ? privateInvites.length : publicInvites.length)
    : committedTeeTimes.length;

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
    <Paper
      className='tee-time-container'
      shadow='sm'
      style={{
        maxHeight: 'calc(100vh - 280px)',
        minHeight: 300,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--mantine-color-sand-2)',
      }}
    >
      <Group
        justify='space-between'
        align='center'
        px='md'
        py='sm'
        style={{
          borderBottom: '1px solid var(--mantine-color-sand-2)',
        }}
      >
        <Group gap='sm'>
          <Title order={4} fw={600} c='forest.9'>
            {title}
          </Title>
          <Badge size='sm' variant='light' color='forest'>
            {displayCount}
          </Badge>
        </Group>

        {isAvailable && (
          <InviteTypeSelect handleClick={setInvitesToDisplay} />
        )}
      </Group>

      <Stack gap='xs' p='md' style={{ overflowY: 'auto', flex: 1 }}>
        {title === 'Committed Tee Times' && getTeeTimes(committedTeeTimes)}
        {invitesToDisplay === 'private'
          ? getTeeTimes(privateInvites)
          : getTeeTimes(publicInvites)}
        {invitesToDisplay === '' && !events.length && (
          <EmptyState
            icon={<FiCalendar size={20} />}
            title='No committed tee times'
            description='Accept an invite to join a round.'
          />
        )}
        {invitesToDisplay === 'private' && !privateInvites.length && (
          <EmptyState
            icon={<FiMail size={20} />}
            title='No friend invitations'
            description='No tee time invitations from your friends yet.'
            actionLabel='Create One'
          />
        )}
        {invitesToDisplay === 'public' && !publicInvites.length && (
          <EmptyState
            icon={<FiMail size={20} />}
            title='No community invitations'
            description='No tee time invitations from the community yet.'
            actionLabel='Create One'
          />
        )}
      </Stack>
    </Paper>
  );
};

export default TeeTimeContainer;
