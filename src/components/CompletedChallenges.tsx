import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges(){
  
    const { challengesCompleted }  = useContext(challengesContext);

    return(
        <div className={styles.completedChallengesContainer}>
            <span>Challenges Completed</span>
            <span>{ challengesCompleted }</span>
        </div>
    )
}