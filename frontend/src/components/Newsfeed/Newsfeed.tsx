import { useState, useEffect, useCallback } from 'react';
import { Paper, Title, Stack, Badge, Group, Textarea, Button, Text } from '@mantine/core';
import { FiSend } from 'react-icons/fi';
import PostCard from './PostCard';
import type { Post } from '../../types';
import {
  getPosts,
  createPost,
  deletePost,
  toggleReaction,
  createReply,
  deleteReply,
} from '../../APICalls/APICalls';

interface NewsfeedProps {
  currentUserId: number;
  currentUserName: string;
}

const Newsfeed = ({ currentUserId, currentUserName }: NewsfeedProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostBody, setNewPostBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = useCallback(() => {
    getPosts().then(setPosts);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = () => {
    if (!newPostBody.trim() || submitting) return;
    setSubmitting(true);
    createPost(currentUserId, newPostBody.trim())
      .then((post) => {
        setPosts((prev) => [post, ...prev]);
        setNewPostBody('');
      })
      .finally(() => setSubmitting(false));
  };

  const handleDeletePost = (postId: number) => {
    deletePost(postId, currentUserId).then(() => {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    });
  };

  const handleToggleReaction = (postId: number, emoji: string) => {
    toggleReaction(postId, currentUserId, emoji).then((reactions) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, reactions } : p))
      );
    });
  };

  const handleCreateReply = (postId: number, body: string) => {
    createReply(postId, currentUserId, body).then((reply) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
        )
      );
    });
  };

  const handleDeleteReply = (postId: number, replyId: number) => {
    deleteReply(postId, replyId, currentUserId).then(() => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, replies: p.replies.filter((r) => r.id !== replyId) }
            : p
        )
      );
    });
  };

  return (
    <Paper
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
        style={{ borderBottom: '1px solid var(--mantine-color-sand-2)' }}
      >
        <Group gap='sm'>
          <Title order={4} fw={600} c='forest.9'>
            Community Feed
          </Title>
          <Badge size='sm' variant='light' color='forest'>
            {posts.length}
          </Badge>
        </Group>
      </Group>

      <Stack gap='md' p='md' style={{ overflowY: 'auto', flex: 1 }}>
        <Paper p='sm' withBorder style={{ borderColor: 'var(--mantine-color-sand-2)' }}>
          <Text size='xs' fw={500} c='forest.8' mb={4}>{currentUserName}</Text>
          <Textarea
            placeholder="What's on your mind?"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
            minRows={2}
            maxRows={4}
            autosize
            mb='xs'
          />
          <Group justify='flex-end'>
            <Button
              color='forest'
              size='xs'
              leftSection={<FiSend size={14} />}
              onClick={handleCreatePost}
              disabled={!newPostBody.trim() || submitting}
              loading={submitting}
            >
              Post
            </Button>
          </Group>
        </Paper>

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={currentUserId}
            onToggleReaction={handleToggleReaction}
            onCreateReply={handleCreateReply}
            onDeletePost={handleDeletePost}
            onDeleteReply={handleDeleteReply}
          />
        ))}

        {posts.length === 0 && (
          <Stack align='center' gap='xs' py='xl'>
            <Text size='sm' fw={600}>No posts yet</Text>
            <Text size='sm' c='dimmed'>Be the first to share something with the community!</Text>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default Newsfeed;
