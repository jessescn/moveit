import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContexts';
import styles from '../styles/components/Countdown.module.css';


export function Countdown(){

    const { minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            { hasFinished ? (
                <button type="button"
                    className={styles.countdownButton}
                    disabled>
                        Cycle Closed
                </button>
            ): (
                <>
                {
                    isActive ? (
                        <button type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}>
                                Abandon Cycle
                        </button>
                    ) : (
                        <button type="button"
                            className={styles.countdownButton}
                            onClick={startCountdown}>
                                Start new Cycle
                        </button>
                    )
                }  
                </>
            )}
        </div>
    )
}