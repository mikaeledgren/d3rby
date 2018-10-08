class Game {

  constructor(id, homeTeam, awayTeam, homeScore, awayScore, overtime, penaltyShots, date, played) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = homeScore;
    this.awayScore = awayScore;
    this.overtime = overtime;
    this.penaltyShots = penaltyShots;
    this.date = date instanceof Date ? date : new Date(date);
    this.played = played;
  }
}

module.exports = Game;