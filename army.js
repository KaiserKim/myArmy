function Army() {
  this.ranks = ['private', 'sergeant', 'lieutenant', 'captain', 'general'];
  this.soldiers = {
    'private': [],
    'sergeant': [],
    'lieutenant': [],
    'captain': [],
    'general': []
  };
  this.general;
};

Army.prototype.add = function(soldier) {
  this.soldiers[soldier.rank].push(soldier);
};

Army.prototype.promote = function(soldier) {
  if ( soldier.rank != 'general' ) {
    currRank = soldier.rank;
    soldier.rank = this.ranks[this.ranks.indexOf(soldier.rank) + 1];
    this.soldiers[currRank].splice(this.soldiers[currRank].indexOf(soldier), 1);
    this.soldiers[this.ranks.indexOf(soldier.rank)].push(soldier);
  }
};

function Soldier(name, army, rank) {
  this.name = name;
  this.army = army;
  this.rank = this.army.ranks[rank];

  if (this.rank == undefined) {
    this.rank = ranking[0];
  }
};

Soldier.prototype.battleCry = function() {
  console.log("FREEDOM!");
};

Soldier.prototype.promote = function(soldier) {
  if (this.rank > soldier.rank) {
    this.army.promote(soldier);
  }
};

Soldier.prototype.fight = function(soldier) {
  if ( this.rank == soldier.rank ) {
    if ( Math.random() > 0.5 ) {
      this.die();
      this.army.add(soldier);
    }
    else {
      soldier.die();
      this.army.add(this);
    }
  }
  else if ( this.rank > soldier.rank ) {
    if ( Math.random() > 0.65 ) {
      this.die();
      this.army.add(soldier);
    }
    else {
      soldier.die();
      this.army.add(this);
    }
  }
  else if ( this.rank != 'general' && soldier.rank == 'general' ) {
    if ( Math.random() > 0.2 ) {
      this.die();
      this.army.add(soldier);
    }
    else {
      soldier.die();
      this.army.add(this);
    }
  }
  else if ( this.rank < soldier.rank ) {
    if ( Math.random() > 0.35 ) {
      this.die();
      this.army.add(soldier);
    }
    else {
      soldier.die();
      this.army.add(this);
    }
  }
};

Soldier.prototype.die = function() {
  var temp = this.army.soldiers[this.rank];
  temp.splice(temp.indexOf(this), 1);
};

var ppl = ["John McDonald", "Blaise Thomas", "Meredith Bryan", "Kyle King",
  "Steve Judd", "Greg Pynes", "Jeff Lipp", "Adam Flaxman", "Alex Chan",
  "Eyol Benmoshe", "Julie Heidt", "Leslie Pegue", "Andre Soschinski",
  "Kayle Moore", "Paul Cochrane", "Percival Loyal", "Taylor Higgins",
  "Noah Mangubat", "Thomas Sullivan", "Alfani Line", "Bur Berry", "Gucci Mane",
  "Lil Wayne", "Jounrey Time", "OMI Cheeleader", "Into TheWild", "Slack Bot",
  "Major Payne", "Lil Timmy", "Glenn Harris", "Tony David", "Sarah C"
];
var squad = new Army();
var x = 0;

var build = function() {
  for ( var i = 0; i < 25; i++ ) {
    if ( i == 0 ) {
      x = 4;
    }
    else if ( i == 1 ) {
      x = 3;
    }
    else if ( i == 2 ) {
      x = 2;
    }
    else if ( i > 2 && i < 7 ) {
      x = 1;
    }
    else if ( i > 8 && i < 25 ) {
      x = 0;
    }

    guy = new Soldier(ppl[i], squad, x);
    squad.add(guy);
  }
};

build();
squad.soldiers['captain'].pop().fight(squad.soldiers['general'].pop());
console.log(squad.soldiers);
