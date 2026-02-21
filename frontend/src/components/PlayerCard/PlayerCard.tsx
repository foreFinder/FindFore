import { Group, Text, Button } from '@mantine/core';
import type { Friend, Player, HandleFriends } from '../../types';

interface PlayerCardProps {
  playerInfo: Friend | Player;
  friends: Friend[];
  handleFriends: HandleFriends;
}

const PlayerCard = ({ playerInfo, friends, handleFriends }: PlayerCardProps) => {
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
              ? handleFriends.remove(playerInfo as Friend)
              : handleFriends.add(playerInfo as Friend)
          }
        >
          {isFriend ? 'Remove Friend' : 'Add Friend'}
        </Button>
      </Group>
    </li>
  );
};

export default PlayerCard;
