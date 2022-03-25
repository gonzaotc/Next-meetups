// domain.com/new-meetup
import React from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async enteredMeetupData => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.replace("/");
  };
  return (
    <>
      <Head><title>Add a New Meetup</title>
      <meta name="description" content="Add a new crazy meetup!"/></Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    </>
  );
};

export default NewMeetup;
