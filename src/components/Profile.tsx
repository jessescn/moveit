import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

export function Profile(){

    const { level } = useContext(challengesContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/jessescn.png" alt="Jessé Souza"/>
            <div>
                <strong>Jessé Souza</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level { level }
                </p>
            </div>
        </div>
    )
}