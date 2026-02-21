import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, TextInput, PasswordInput, Button, Title, Stack, Group } from '@mantine/core';

function Login({ validateLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3em' }}>
      <Paper shadow='md' p='xl' style={{ width: '90%', maxWidth: '50rem' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Title order={2} ta='center' mb='lg'>
            Welcome to ForeFinder
          </Title>
          <Stack gap='md' maw={400} mx='auto'>
            <TextInput
              label='Email'
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label='Password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Stack>
          <Group justify='center' mt='xl' gap='md'>
            <Button
              color='green'
              onClick={() => validateLogin(email, password)}
              className='form-submit'
            >
              Login
            </Button>
            <Button
              component={Link}
              to='/create-profile'
              variant='outline'
              color='green'
              className='form-submit'
            >
              Create Profile
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
