import { Link } from 'react-router-dom';
import { Modal, Text, Anchor } from '@mantine/core';

interface PostResultMessageProps {
  postError: boolean;
  refreshEvents: () => void;
}

function PostResultMessage({ postError, refreshEvents }: PostResultMessageProps) {
  return (
    <Modal
      opened
      onClose={!postError ? refreshEvents : () => {}}
      centered
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.3 }}
    >
      <div className='message' style={{ textAlign: 'center', padding: '2rem' }}>
        {postError ? (
          <>
            <Text>
              Sorry, we weren't able to send your event invitation. Please try again later.
            </Text>
            <Anchor component={Link} to='/dashboard' mt='md' fw={700} c='green.6'>
              Back to Dashboard
            </Anchor>
          </>
        ) : (
          <>
            <Text>Congrats, your tee time has been created!</Text>
            <Anchor component={Link} to='/dashboard' mt='md' fw={700} c='green.6'>
              Back to Dashboard
            </Anchor>
          </>
        )}
      </div>
    </Modal>
  );
}

export default PostResultMessage;
