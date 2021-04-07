import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContexts';
import { CountdownContext } from '../contexts/CountdownContexts';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){

    const { activeChallenge, resetChallenge, completeChallenge }  = useContext(challengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();

    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();

    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Earn { activeChallenge.amount } xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>New Challenge</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>
                    <footer>
                        <button type="button" onClick={handleChallengeFailed} className={styles.challengeFailedButton}>Falhei</button>
                        <button type="button" onClick={handleChallengeSucceeded} className={styles.challengeSucceededButton}>Completo</button>
                    </footer>
                </div>):(
                <div className={styles.challengesNotActive}>
                    <strong>Finish a cycle to receive a new challenge</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="level-up"/>
                        Reach new levels finishing challenges
                    </p>
                </div>
            )}
        </div>
    )
}