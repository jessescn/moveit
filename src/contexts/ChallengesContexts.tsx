import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { updateUser } from '../services/api';

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number, 
    currentExperience: number, 
    experienceToNextLevel: number,
    challengesCompleted: number,
    activeChallenge:Challenge,
    startNewChallenge: () => void,
    levelUp: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    email: string,
    currentExperience: number,
    challengesCompleted: number
}

export const challengesContext = createContext({} as ChallengesContextData );

export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] =  useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        updateUser(
            rest.email, 
            {   level, 
                currentExperience, 
                challenges: challengesCompleted 
            })
            .then(resp => { console.log(resp) })

    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio!',  {
                body: `Valendo ${challenge.amount}`
            })
        }

    }

    function completeChallenge(){
        if(!activeChallenge){
            return
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        if(finalExperience >= experienceToNextLevel){
            levelUp()
            finalExperience = finalExperience - experienceToNextLevel;
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    return (
        <challengesContext.Provider value={{ 
            level, 
            currentExperience, 
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            startNewChallenge,
            resetChallenge,
            levelUp,
            completeChallenge,
            closeLevelUpModal
            }}>
            { children }
            { isLevelUpModalOpen &&  <LevelUpModal /> }
        </challengesContext.Provider>
    )
}
