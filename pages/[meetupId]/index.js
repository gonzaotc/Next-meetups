import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = props => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        description={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://gonzadev:selfmade2021@cluster0.wbt3r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  // _id: 1  // Significa que solo incluimos el id, pero no otros valores.

  return {
    // Aca especificamos los paths que deben ser pre-renderizados.
    // Normalmente se obtendra de una database el listado de los paths que deben estar disponibles.
    fallback: 'blocking', // Significa que mi prop paths contiene todos los paths disponibles
    // Si activamos fallback en true, next intenta generar dinamicamente esas rutas on-the-fly
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  // fetch data form an API o from disk

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://gonzadev:selfmade2021@cluster0.wbt3r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
