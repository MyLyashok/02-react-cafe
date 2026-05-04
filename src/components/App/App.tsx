import { useState } from 'react';
import type { Votes, VoteType } from '../../types/votes';
import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';



const App = () => {
    const [feedback, setFeedback] = useState<Votes>({
        good: 0,
        neutral: 0,
        bad: 0
    });
   
    const totalVotes = feedback.good + feedback.neutral + feedback.bad;
    const positiveRate = totalVotes
    ? Math.round((feedback.good / totalVotes) * 100)
    : 0;

const handleVote = (type: VoteType) => {
  setFeedback({
    ...feedback,
    [type]: feedback[type] + 1,
  });
};

    const resetVotes = () => {
  setFeedback({
    good: 0,
    neutral: 0,
    bad: 0
  });
};
    
    
    
    return (
        <div className={css.app}>
        <CafeInfo />
        <VoteOptions 
            onVote={handleVote} 
            onReset={resetVotes} 
                canReset={totalVotes > 0} 
            />
            {totalVotes > 0 ? (
            <VoteStats 
                votes={feedback} 
                totalVotes={totalVotes} 
                positiveRate={positiveRate} 
            />
        ) : (
            <Notification />
        )}
    </div>
    );
};




export default App;