import { Paper, Group, Text, ActionIcon, Avatar } from '@mantine/core';
import { FiUserPlus, FiUserMinus } from 'react-icons/fi';
import type { Friend, Player, HandleFriends } from '../../types';

interface PlayerCardProps {
  playerInfo: Friend | Player;
  friends: Friend[];
  handleFriends: HandleFriends;
}

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const PlayerCard = ({ playerInfo, friends, handleFriends }: PlayerCardProps) => {
  const isFriend = friends.some((f) => f.name === playerInfo.name);

  return (
    <Paper
      data-cy='player-card'
      className='player-card'
      shadow='xs'
      radius='md'
      p='sm'
      style={{
        transition: 'background-color 0.15s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--mantine-color-sand-1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
    >
      <Group justify='space-between' wrap='nowrap'>
        <Group gap='sm' wrap='nowrap'>
          <Avatar size='sm' radius='xl' color='forest' variant='filled'>
            {getInitials(playerInfo.name)}
          </Avatar>
          <Text size='sm' fw={500} truncate>
            {playerInfo.name}
          </Text>
        </Group>
        <ActionIcon
          data-cy='friend-option'
          variant={isFriend ? 'subtle' : 'filled'}
          color={isFriend ? 'red' : 'forest'}
          size='sm'
          radius='xl'
          onClick={() =>
            isFriend
              ? handleFriends.remove(playerInfo as Friend)
              : handleFriends.add(playerInfo as Friend)
          }
          title={isFriend ? 'Remove Friend' : 'Add Friend'}
        >
          {isFriend ? <FiUserMinus size={14} /> : <FiUserPlus size={14} />}
        </ActionIcon>
      </Group>
    </Paper>
  );
};

export default PlayerCard;
