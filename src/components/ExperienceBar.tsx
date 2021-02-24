import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){

    const { currenExperience, experienceToNextLevel } = useContext(challengesContext);

    const percentToNextLevel = Math.round(currenExperience * 100)/experienceToNextLevel;

    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%`}}></div>
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%`}}>{currenExperience}px</span>
            </div>
            <span>{ experienceToNextLevel } xp</span>
        </header>
    );
}