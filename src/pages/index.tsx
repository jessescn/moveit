import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';

import { GetServerSideProps } from 'next';

import Head from 'next/head';
import { CountdownProvider } from "../contexts/CountdownContexts";
import { ChallengesProvider } from "../contexts/ChallengesContexts";
import { getSession } from "next-auth/client";

type User = {
  name: string,
  email: string,
  image: string,
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

interface HomeProps {
  user: User
}

export default function Home({ user }: HomeProps) {  

  return (
    <ChallengesProvider
        email={user.email}
        level={user.level} 
        currentExperience={user.currentExperience}
        challengesCompleted={user.challengesCompleted}
        >
      <div className={styles.container}>
        <Head>
          <title>Home | MoveIt </title>
        </Head>
        <ExperienceBar  />

        <CountdownProvider>
          <section>
            <div>
              <Profile name={user.name} image={user.image} />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

  const session = await getSession({ req })

  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      },
      
    }
  }

  return {
    props: {
      user: session.user
    }
  }
}