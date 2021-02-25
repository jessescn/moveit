import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number, 
    currenExperience: number, 
    experienceToNextLevel: number,
    challengesCompleted: number,
    activeChallenge:Challenge,
    startNewChallenge: () => void,
    levelUp: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const challengesContext = createContext({} as ChallengesContextData );

export function ChallengesProvider({ children } : ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currenExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] =  useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp(){
        setLevel(level + 1);
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
        let finalExperience = currenExperience + amount;
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
            currenExperience, 
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            startNewChallenge,
            resetChallenge,
            levelUp,
            completeChallenge,
            }}>
            { children }
        </challengesContext.Provider>
    )
}
