import { useRouter } from 'next/router';
import head from 'next/head';
import React, { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
const NewMeetUp = () => {
  const router = useRouter();
  const addMeetupHandler = async (data) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await response.json();
    console.log(res);
    router.push('/');
  };
  return (
    <Fragment>
      <head>
        <title>Add Meetup</title>
        <meta name='discription' content='Next js project for meetups'></meta>
      </head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetUp;
