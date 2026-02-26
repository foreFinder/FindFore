import dayjs from 'dayjs';
import { Card, Text, Button, Group } from '@mantine/core';
import { FiCalendar, FiClock, FiUser, FiUsers } from 'react-icons/fi';
import type { Event, HandleInviteAction } from '../../types';

interface TeeTimeProps {
  type: string | undefined;
  event: Event;
  handleInviteAction: HandleInviteAction;
}

const TeeTime = ({ type, event, handleInviteAction }: TeeTimeProps) => {
  const formatTime = (time: string) => {
    let hours: string | number = time.split(':')[0];
    const minutes = time.split(':')[1];
    const period = parseInt(hours) > 11 ? 'PM' : 'AM';

    if (parseInt(hours) < 10) {
      hours = hours.slice(1, 2);
    } else if (parseInt(hours) > 12) {
      hours = parseInt(hours) - 12;
    }

    return `${hours}:${minutes} ${period}`;
  };

  const filledSpots = event.open_spots - event.remaining_spots;

  return (
    <Card
      className='tee-time ff-card-hover'
      shadow='xs'
      withBorder
      style={{ borderColor: 'var(--mantine-color-sand-2)' }}
      p='md'
    >
      <Text fw={700} c='forest.9' size='md' mb='xs'>
        {event.course_name}
      </Text>

      <Group gap='lg' mb='xs'>
        <Group gap={6}>
          <FiCalendar size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
          <Text size='sm' c='dimmed'>{dayjs(event.date).format('MMM D')}</Text>
        </Group>
        <Group gap={6}>
          <FiClock size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
          <Text size='sm' c='dimmed'>{formatTime(event.tee_time)}</Text>
        </Group>
      </Group>

      <Group gap='lg' mb='sm'>
        <Group gap={6}>
          <FiUser size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
          <Text size='sm' c='dimmed'>{event.host_name}</Text>
        </Group>
        <Group gap={6}>
          <FiUsers size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
          <Text size='sm' c='dimmed'>
            {filledSpots}/{event.open_spots} spots filled
          </Text>
        </Group>
      </Group>

      <Group justify='flex-end' gap='xs'>
        {type === 'committed' && (
          <Button
            className='cancel'
            color='red'
            variant='subtle'
            size='sm'
            onClick={() => handleInviteAction.cancel(event)}
          >
            Cancel
          </Button>
        )}
        {type === 'available' && (
          <>
            <Button
              className='decline'
              color='red'
              variant='subtle'
              size='sm'
              onClick={() => handleInviteAction.update(event.id, 'declined')}
            >
              Decline
            </Button>
            <Button
              className='accept'
              color='forest'
              variant='filled'
              size='sm'
              onClick={() => handleInviteAction.update(event.id, 'accepted')}
            >
              Accept
            </Button>
          </>
        )}
        {type === 'joinable' && (
          <Button
            className='join'
            color='forest'
            variant='filled'
            size='sm'
            onClick={() => handleInviteAction.join(event.id)}
          >
            Join
          </Button>
        )}
      </Group>
    </Card>
  );
};

export default TeeTime;
