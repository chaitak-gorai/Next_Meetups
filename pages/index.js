import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='discription' content='Next js project for meetups'></meta>
      </Head>
      <MeetupList meetups={props.meetups} />{' '}
    </Fragment>
  );
};
export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://captcha:Ul7C6USV3QRwOU8K@cluster0.q8gsl.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meet) => ({
        title: meet.title,
        address: meet.address,
        image: meet.image,
        id: meet._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
