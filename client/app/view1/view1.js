'use strict';

angular.module('app.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'Users', 'Cards', function($scope, Users, Cards) {
  $scope.user = 'UserCard';
  var players = [];

  for(var i = 0; i < 5; i++) {
  	players.push(Users.addUser());
  }

  var player = Users.addUser();

  // add cards
  $scope.MyCard = Cards.valueSuitFromCard(21);
  console.log($scope.MyCard);

  // var div = document.getElementById('myCards');

  // div.innerHTML = div.innerHTML + 'Extra stuff';

  var roundString = {
	"round": 5,
	"cards": ["qh","kh","ah","2c","3s"],
	"minstake": 200,
	"turn": 27694,
	"users": [
	  {
	    "uid": 27694,
	    "name": "Bumble the Brave",
	    "money": 13,
	    "stake": 0,
	    "active": true,
	    "hand": ["4s","4c"]
	  },

	  {
	    "uid": 33285,
	    "name": "Trevor the True",
	    "money": 13,
	    "stake": 0,
	    "active": true,
	    "hand": ["2c","8h"]
	  },

	  {
	    "uid": 91137,
	    "name": "Hagar the Horrible",
	    "money": 13,
	    "stake": 0,
	    "active": true,
	    "hand": ["ad","js"]
	  },

	  {
	    "uid": 73921,
	    "name": "Rambo the Resourceful",
	    "money": 13,
	    "stake": 0,
	    "active": true,
	    "hand": ["6h","9d"]
	  }
	],

	"table": [
	  27694,
	  33285,
	  91137,
	  73921,
	  null,
	  null
	]
  };

  // display upper player cards
  // for (var i = 0; i < 3; i++) {
  // 	if(roundString.table[i] !== null) {
  //     for(var j = 0; j < roundString.users.length; j++) {
  //     	if(roundString.table[i] === roundString.users[j].uid) {
  //     	  for(var k = 0; k < roundString.users[j].hand.length; k++) {
	 //      	var elem = document.createElement("img");
		//     var cardString = '../image/cards/';
		//     cardString += Cards.imageFromValueSuit(roundString.users[j].hand[k][0],roundString.users[j].hand[k][1]);
		//     elem.src = cardString; //communityCards[i]
		//     elem.className = "card";
		//     document.getElementById("playersUpper").appendChild(elem);
  //     	  }
  //     	}
  //     }
  // 	}
  // }

  if(roundString.users.length === 4) {

	for(var i = 0; i < roundString.users[0].hand.length; i++) {
      var elem = document.createElement("img");
      var cardString = '../image/cards/';
      cardString += Cards.imageFromValueSuit(roundString.users[0].hand[i][0],roundString.users[0].hand[i][1]);
      elem.src = cardString; //communityCards[i]
      elem.className = "card";
      document.getElementById("playersUpper").getElementsByTagName('div')[0].appendChild(elem);
	}

	for(var i = 0; i < roundString.users[1].hand.length; i++) {
      var elem = document.createElement("img");
      var cardString = '../image/cards/';
      cardString += Cards.imageFromValueSuit(roundString.users[1].hand[i][0],roundString.users[1].hand[i][1]);
      elem.src = cardString; //communityCards[i]
      elem.className = "card";
      document.getElementById("playersUpper").getElementsByTagName('div')[2].appendChild(elem);
	}

	for(var i = 0; i < roundString.users[2].hand.length; i++) {
      var elem = document.createElement("img");
      var cardString = '../image/cards/';
      cardString += Cards.imageFromValueSuit(roundString.users[2].hand[i][0],roundString.users[2].hand[i][1]);
      elem.src = cardString; //communityCards[i]
      elem.className = "card";
      document.getElementById("playersLower").getElementsByTagName('div')[0].appendChild(elem);
	}

	for(var i = 0; i < roundString.users[3].hand.length; i++) {
	  var elem1 = document.createElement("p");
	  elem1.innerHTML = "test";
      var elem2 = document.createElement("img");
      var cardString = '../image/cards/';
      cardString += Cards.imageFromValueSuit(roundString.users[3].hand[i][0],roundString.users[3].hand[i][1]);
      elem2.src = cardString; //communityCards[i]
      elem2.className = "card";
      // document.getElementById("playersLower").children[2].appendChild(elem1);
      document.getElementById("playersLower").children[2].appendChild(elem2);
	}  	

  }

  // display community cards
  // var flopCards = ['9h', '9s', '9d', '9c']
  var endSlice = 0;
  if(roundString.round === 2) {
    endSlice = 3;
  }
  else if(roundString.round === 3) {
  	endSlice = 4;
  }
  else if(roundString.round === 4 || roundString.round === 5) {
  	endSlice = 5;
  }

  var communityCards = roundString.cards.slice(0,endSlice);

  for(var i = 0; i < communityCards.length; i++) {
    var elem = document.createElement("img");
    var cardString = '../image/cards/';
    cardString += Cards.imageFromValueSuit(communityCards[i][0],communityCards[i][1]);
    elem.src = cardString; //communityCards[i]
    elem.className="card";
    document.getElementById("communityCards").appendChild(elem);

    // img class='card' ng-src=cardString;

    // var elem = document.createElement("img");

    // document.getElementById("communityCards").appendChild(img class='card' ng-src=cardString);

  	//imageFromValueSuit
  }

  // var elem = document.createElement("img");
  // elem.setAttribute("src", "../image/cards/10-clubs.png");
  // elem.src = '../image/cards/10-clubs.png';
  // document.getElementById("myCards").appendChild(elem);

  // var cardString = '../image/cards/';
  // console.log(cardString);
  // cardString += '10-clubs.png';
  // console.log(cardString);

  
	
}])