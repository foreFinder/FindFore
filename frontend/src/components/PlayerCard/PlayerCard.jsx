import React from 'react';
import { Group, Text, Button } from '@mantine/core';

const PlayerCard = ({ playerInfo, friends, handleFriends }) => {
  const isFriend = friends.some((f) => f.name === playerInfo.name);

  return (
    <li data-cy='player-card' className='player-card' style={{ listStyle: 'none' }}>
      <Group justify='space-between' mb='md'>
        <Text>{playerInfo.name}</Text>
        <Button
          data-cy='friend-option'
          variant={isFriend ? 'outline' : 'filled'}
          color={isFriend ? 'red' : 'green'}
          size='xs'
          onClick={() =>
            isFriend
              ? handleFriends.remove(playerInfo)
              : handleFriends.add(playerInfo)
          }
        >
          {isFriend ? 'Remove Friend' : 'Add Friend'}
        </Button>
      </Group>
    </li>
  );
};

export default PlayerCard;
