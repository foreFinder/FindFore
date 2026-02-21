import { useState } from 'react';
import { createNewProfile } from '../../APICalls/APICalls';
import { Paper, TextInput, PasswordInput, Button, Title, Stack } from '@mantine/core';

function CreateProfile() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const submitProfile = () => {
    if (confirmSamePW()) {
      createNewProfile(name, phone, email, userName, password, passwordConfirm)
        .then((resp) => console.log(resp));
    } else {
      alert('Passwords do not match, please try again!');
    }
  };

  const confirmSamePW = () => {
    return password === passwordConfirm;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3em' }}>
      <Paper shadow='md' p='xl' style={{ width: '90%', maxWidth: '50rem' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Title order={2} ta='center' mb='lg'>
            Create a New Profile
          </Title>
          <Stack gap='md' maw={400} mx='auto'>
            <TextInput
              label='Full Name'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='ex: John Doe'
              required
            />
            <TextInput
              label='Phone'
              type='tel'
              id='phone'
              name='phone'
              placeholder='123-456-7890'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <TextInput
              label='Email'
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='ex: john.doe@example.com'
              required
            />
            <TextInput
              label='Username'
              id='userName'
              name='userName'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder='golfer1234'
              required
            />
            <PasswordInput
              label='Password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='new-password'
              required
            />
            <PasswordInput
              label='Confirm Password'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete='new-password'
              required
            />
            <Button
              color='green'
              onClick={submitProfile}
              fullWidth
              mt='md'
              className='form-submit'
            >
              Create Profile
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}

export default CreateProfile;
