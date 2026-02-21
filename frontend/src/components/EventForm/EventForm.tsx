import { useState } from 'react';
import { postEvent } from '../../APICalls/APICalls';
import PostResultMessage from './PostResultMessage';
import {
  Paper,
  Select,
  Button,
  Title,
  Stack,
  Radio,
  Checkbox,
  Group,
  Text,
  SimpleGrid,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import type { Course, Friend } from '../../types';

interface EventFormProps {
  courses: Course[];
  friends: Friend[];
  hostId: number;
  refreshEvents: () => void;
}

function EventForm({ courses, friends, hostId, refreshEvents }: EventFormProps) {
  const tomorrow = dayjs().add(1, 'day').toDate();

  const [date, setDate] = useState<Date | null>(tomorrow);
  const [teeTime, setTeeTime] = useState('');
  const [openSpots, setOpenSpots] = useState<string | null>('2');
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [numHoles, setNumHoles] = useState('18');
  const [golfCourse, setGolfCourse] = useState<string | null>('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [allFriends, setAllFriends] = useState(false);
  const [postError, setPostError] = useState(false);
  const [postAttempt, setPostAttempt] = useState(false);

  const addFriendToInvite = (friendId: number, checked: boolean) => {
    if (checked) {
      setSelectedFriends([...selectedFriends, friendId]);
    } else {
      setSelectedFriends(selectedFriends.filter((f) => f !== friendId));
    }
  };

  const inviteAllFriends = (checked: boolean) => {
    const friendIds = friends.map((f) => f.id);
    if (checked) {
      setSelectedFriends([...friendIds]);
      setAllFriends(true);
    } else {
      setSelectedFriends([]);
      setAllFriends(false);
    }
  };

  const submitForm = () => {
    setPostAttempt(true);
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    if (golfCourse && teeTime) {
      postEvent(
        golfCourse,
        formattedDate,
        teeTime,
        openSpots || '2',
        numHoles,
        isPrivate,
        hostId,
        selectedFriends
      )?.catch(() => setPostError(true));
    }
  };

  const teeTimeHour = teeTime ? parseInt(teeTime.split(':')[0]) : null;
  const isValidTime = teeTime && teeTimeHour !== null && teeTimeHour >= 7 && teeTimeHour <= 17;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3em' }}>
        <Paper shadow='md' style={{ width: '90%', maxWidth: '50rem', overflow: 'hidden' }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ background: 'rgb(221, 218, 218)', padding: '1rem', textAlign: 'center' }}>
              <Title order={2} size='1.25rem' fw={600}>
                Create a New Tee Time
              </Title>
            </div>

            <Stack gap='md' p='xl'>
              <Select
                label='Golf Course'
                placeholder='Please Select a Course'
                value={golfCourse}
                onChange={setGolfCourse}
                data={courses.map((course) => ({
                  value: String(course.id),
                  label: course.attributes.name,
                }))}
                required
              />

              <DateInput
                label='Date'
                value={date}
                onChange={setDate}
                minDate={tomorrow}
                required
              />

              <TimeInput
                label='Tee Time (7am to 5pm)'
                value={teeTime}
                onChange={(e) => setTeeTime(e.target.value)}
                required
              />

              <Select
                label='Total Players (including you)'
                value={openSpots}
                onChange={setOpenSpots}
                data={[
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                ]}
              />

              <Radio.Group
                label='Number of Holes'
                value={numHoles}
                onChange={setNumHoles}
              >
                <Group mt='xs'>
                  <Radio value='18' label='18' />
                  <Radio value='9' label='9' />
                </Group>
              </Radio.Group>

              <Radio.Group
                label='Public or Private'
                value={isPrivate ? 'private' : 'public'}
                onChange={(val) => setIsPrivate(val === 'private')}
              >
                <Group mt='xs'>
                  <Radio value='public' label='Public' />
                  <Radio value='private' label='Private' />
                </Group>
              </Radio.Group>

              {isPrivate && (
                <Stack gap='sm'>
                  <Text fw={500} className='friends-title'>
                    Friends to Invite:
                  </Text>
                  {!friends.length && (
                    <Text fs='italic' c='dimmed'>
                      You don't have any friends...
                      <br />
                      Make some by creating a public event!
                    </Text>
                  )}
                  <SimpleGrid cols={2}>
                    {friends.map((friend, i) => (
                      <Checkbox
                        key={i}
                        label={friend.name}
                        value={String(friend.id)}
                        checked={selectedFriends.includes(friend.id)}
                        onChange={(e) =>
                          addFriendToInvite(friend.id, e.currentTarget.checked)
                        }
                        disabled={allFriends}
                      />
                    ))}
                  </SimpleGrid>
                  <Checkbox
                    label='Invite All Friends'
                    checked={allFriends}
                    onChange={(e) =>
                      inviteAllFriends(e.currentTarget.checked)
                    }
                  />
                </Stack>
              )}
            </Stack>

            <div style={{ background: 'rgb(221, 218, 218)', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Button
                color='green'
                disabled={!golfCourse || !isValidTime}
                onClick={submitForm}
                className='form-submit'
              >
                Create Tee Time
              </Button>
            </div>
          </form>
        </Paper>
      </div>
      {postAttempt && (
        <PostResultMessage
          postError={postError}
          refreshEvents={refreshEvents}
        />
      )}
    </>
  );
}

export default EventForm;
