import dayjs from 'dayjs';
import { Card, Grid, Text, Button, Group } from '@mantine/core';

const TeeTime = ({ type, event, handleInviteAction }) => {
  const formatTime = (time) => {
    let hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    const period = parseInt(hours) > 11 ? 'PM' : 'AM';

    if (hours < 10) {
      hours = hours.slice(1, 2);
    } else if (hours > 12) {
      hours = hours - 12;
    }

    return `${hours}:${minutes} ${period}`;
  };

  return (
    <Card className='tee-time' shadow='sm' mb='md' withBorder>
      <Card.Section bg='gray.0' p='sm'>
        <Text fw={500} ta='center'>
          {event.attributes.course_name}
        </Text>
      </Card.Section>

      <Grid p='sm' gutter='xs'>
        <Grid.Col span={4}>
          <Text fw={500} size='sm'>Date</Text>
          <Text size='sm' c='dimmed'>{dayjs(event.attributes.date).format('MMM D')}</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text fw={500} size='sm'>Time slot</Text>
          <Text size='sm' c='dimmed'>{formatTime(event.attributes.tee_time)}</Text>
        </Grid.Col>
        <Grid.Col span={4} ta='right'>
          <Text fw={500} size='sm'>Holes</Text>
          <Text size='sm' c='dimmed'>{event.attributes.number_of_holes}</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text fw={500} size='sm'>Host</Text>
          <Text size='sm' c='dimmed'>{event.attributes.host_name}</Text>
        </Grid.Col>
        <Grid.Col span={4} ta='right'>
          <Text fw={500} size='sm'>Spots filled</Text>
          <Text size='sm' c='dimmed'>
            {event.attributes.open_spots - event.attributes.remaining_spots} of{' '}
            {event.attributes.open_spots}
          </Text>
        </Grid.Col>
      </Grid>

      <Group justify='flex-end' p='sm' pt={0} style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
        {type === 'committed' && (
          <Button
            className='cancel'
            color='red'
            size='xs'
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
              size='xs'
              onClick={() => handleInviteAction.update(event.id, 'declined')}
            >
              Decline
            </Button>
            <Button
              className='accept'
              color='green'
              size='xs'
              onClick={() => handleInviteAction.update(event.id, 'accepted')}
            >
              Accept
            </Button>
          </>
        )}
      </Group>
    </Card>
  );
};

export default TeeTime;
