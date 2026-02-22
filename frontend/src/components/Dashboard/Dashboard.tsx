import { useCallback, useEffect, useState } from 'react';
import { SegmentedControl, SimpleGrid, Group } from '@mantine/core';
import PlayerList from '../PlayerList/PlayerList';
import TeeTimeContainer from '../TeeTimeContainer/TeeTimeContainer';
import type { Event, Friend, Player, HandleFriends, HandleInviteAction } from '../../types';

interface DashboardProps {
  events: Event[];
  currentUserId: number;
  screenWidth: number;
  handleInviteAction: HandleInviteAction;
  friends: Friend[];
  players: Player[];
  handleFriends: HandleFriends;
}

const Dashboard = ({
  events,
  currentUserId,
  screenWidth,
  handleInviteAction,
  friends,
  players,
  handleFriends,
}: DashboardProps) => {
  const [availableTeeTimes, setAvailableTeeTimes] = useState<Event[]>([]);
  const [committedTeeTimes, setCommittedTeeTimes] = useState<Event[]>([]);
  const [teeTimeType, setTeeTimeType] = useState('committed');

  const getAvailable = useCallback(() => {
    return events.filter((event) => {
      if (
        event.declined.includes(currentUserId) ||
        event.accepted.includes(currentUserId) ||
        event.closed.includes(currentUserId)
      ) {
        return false;
      } else if (
        event.pending.includes(currentUserId) ||
        !event.private
      ) {
        return true;
      }

      return false;
    });
  }, [events, currentUserId]);

  const getCommitted = useCallback(() => {
    return events.filter((event) =>
      event.accepted.includes(currentUserId)
    );
  }, [events, currentUserId]);

  useEffect(() => {
    setAvailableTeeTimes(getAvailable());
    setCommittedTeeTimes(getCommitted());
  }, [events, getAvailable, getCommitted]);

  return (
    <div className='dashboard' style={{ display: 'flex', flexDirection: screenWidth < 768 ? 'column' : 'row', width: '100%' }}>
      {screenWidth >= 1025 && (
        <PlayerList
          userId={currentUserId}
          screenWidth={screenWidth}
          friends={friends}
          players={players}
          handleFriends={handleFriends}
        />
      )}

      {screenWidth < 768 && (
        <Group justify='flex-end' pr='md' mb='md' mt='xl'>
          <SegmentedControl
            value={teeTimeType}
            onChange={setTeeTimeType}
            data={[
              { label: 'Committed', value: 'committed' },
              { label: 'Available', value: 'available' },
            ]}
          />
        </Group>
      )}

      {screenWidth >= 768 && (
        <SimpleGrid cols={2} spacing='md' style={{ width: '100%', maxWidth: '73%', margin: '3em auto', padding: '0 20px' }}>
          <TeeTimeContainer
            title='Committed Tee Times'
            events={committedTeeTimes}
            windowWidth={screenWidth}
            handleInviteAction={handleInviteAction}
          />
          <TeeTimeContainer
            title='Available Tee Times'
            events={availableTeeTimes}
            windowWidth={screenWidth}
            handleInviteAction={handleInviteAction}
          />
        </SimpleGrid>
      )}

      {teeTimeType === 'committed' && screenWidth < 768 && (
        <TeeTimeContainer
          title='Committed Tee Times'
          events={committedTeeTimes}
          windowWidth={screenWidth}
          handleInviteAction={handleInviteAction}
        />
      )}
      {teeTimeType === 'available' && screenWidth < 768 && (
        <TeeTimeContainer
          title='Available Tee Times'
          events={availableTeeTimes}
          windowWidth={screenWidth}
          handleInviteAction={handleInviteAction}
        />
      )}
    </div>
  );
};

export default Dashboard;
