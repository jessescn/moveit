import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/client";
import { useState } from "react";

import ReactLoading from 'react-loading'
import { FaGithub } from 'react-icons/fa'
import styles from '../../styles/pages/Login.module.css'

export default function Login(){

  const [loading, setLoading] = useState(false)

  return(
    <main className={styles.container}>
      <div>
        <img src="/logo-full.svg" alt="move it"/>
        <img className={styles.workout} src="/workout.svg" alt="workout image"/>
      </div>
      <div className={styles.btnContainer}>
        { loading ? (<ReactLoading type="spin" color="#F05829" />) : (
          <button onClick={() => {
            setLoading(true)
            signIn('github')
          }
          }><FaGithub /> Login</button>
        )}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, params }) => {

  const session = await getSession({ req })

  if(session){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return{
    props: {}
  }
} 