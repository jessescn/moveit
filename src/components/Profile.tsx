import { signOut } from 'next-auth/client';
import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
    name: string;
    image: string;
}

export function Profile({ name, image }: ProfileProps){

    const { level } = useContext(challengesContext);
    return(
        <div className={styles.profileContainer}>
            <img src={image} alt="User name"/>
            <div>
                <strong>{name}</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level { level }
                </p>
                <button onClick={() => signOut() }>Sair</button>
            </div>
        </div>
    )
}