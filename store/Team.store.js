const logger = require('../lib/Logger').getLogger('TeamStore');
const Team = require('../model/Team');

class TeamStore {

  constructor(){
    this.teams = [
      new Team('FBK', 'Färjestad', 'Karlstad', 'Michelle'),
      new Team('LHC', 'Linköping', 'Linköping', 'Anna'),
      new Team('LHF', 'Luleå', 'Luleå', 'Annelie'),
      new Team('VLH', 'Växjö Lakers', 'Växjö', 'Oscar'),
    ];
  }

  get codes(){
    return this.teams.map(team => team.code);
  }

  getByTeamCode(code){
    return this.teams.filter(team => team.code === code)[0];
  }

  get isInitalized() {
    return this.teams.filter(team => team.id).length;
  }

}

const store = new TeamStore();
module.exports = store;