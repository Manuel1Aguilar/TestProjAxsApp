import TotalMatches from './total-matches.js';

class MatchHistory {
    constructor() {
        this.draws = [];
        this.losses = 0;
        this.wins = [];
     }

    addDraw(totalSlp){
        this.draws.push(totalSlp);
        return this.draws;
    }
    
    addWin(totalSlp){
        this.wins.push(totalSlp);
        return this.wins;
    }
    addLoss(){
        this.losses ++;
        return this.losses;
    }

    calcTotalMatches(){
        return new TotalMatches(
            this.draws.length + this.losses + this.wins.length,
                this.calcCurrSlp());
    }
    calcCurrSlp() {
        return this.draws.reduce((a, b) => a + b, 0) 
            + this.wins.reduce((a, b) => a + b, 0);
    }
}

export default MatchHistory;