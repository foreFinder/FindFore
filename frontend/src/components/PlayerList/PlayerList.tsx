import { useState } from 'react';
import { SegmentedControl, Text } from '@mantine/core';
import PlayerCard from '../PlayerCard/PlayerCard';
import type { Friend, Player, HandleFriends } from '../../types';

interface PlayerListProps {
  screenWidth: number;
  players: Player[];
  friends: Friend[];
  handleFriends: HandleFriends;
  userId: number;
}

const PlayerList = ({ screenWidth, players, friends, handleFriends, userId }: PlayerListProps) => {
  const [playerType, setPlayerType] = useState('friends');

  const mapPlayers = (type: (Friend | Player)[]) => {
    return type
      .filter((t) => parseInt(String(t.id)) !== userId)
      .map((p) => (
        <PlayerCard
          key={p.id}
          playerInfo={p}
          friends={friends}
          handleFriends={handleFriends}
        />
      ));
  };

  const isDesktop = screenWidth > 1023;

  return (
    <aside
      data-cy='player-list'
      style={{
        padding: isDesktop ? 30 : 40,
        height: isDesktop ? '100%' : '100vh',
        width: isDesktop ? 320 : '100%',
        backgroundColor: '#368552',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <SegmentedControl
        value={playerType}
        onChange={setPlayerType}
        mb='xl'
        data={[
          { label: 'Friends', value: 'friends' },
          { label: 'Community', value: 'community' },
        ]}
        data-cy='player-type'
      />
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        {!friends.length && playerType === 'friends' && (
          <Text fs='italic' c='white'>
            You don't have any friends...
            <br />
            Add some from the community!
          </Text>
        )}
        {playerType === 'friends' ? mapPlayers(friends) : mapPlayers(players)}
      </ul>
    </aside>
  );
};

export default PlayerList;
