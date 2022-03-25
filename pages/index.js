import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

const HomePage = props => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
};

export async function getStaticProps() {
  // fetch data form an API o from disk

  const client = await MongoClient.connect(
    "mongodb+srv://gonzadev:selfmade2021@cluster0.wbt3r.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

// export async function getStaticSideProps(context) {

//   const req = context.req;
//   const res = context.res;
//     // fetch data form an API o from disk
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//       },
//     }
// }

export default HomePage;
