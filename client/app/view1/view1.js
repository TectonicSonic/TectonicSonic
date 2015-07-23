'use strict';

angular.module('app.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'ViewCtrl'
  });
}])

.controller('ViewCtrl', ['$scope', 'Users', 'Cards', 'wsComm', 'httpRequest', 'gameStateEmu',
	function($scope, Users, Cards, wsComm, httpRequest, gameStateEmu) {
	///////////////////////////////////////////////
	// Sim game logic
	var players = [];
	for (var i = 0; i < 5; i++) {
		players.push(Users.addUser());
	};

	var mySelf = Users.addUser();
	var deckCards = Cards.shuffleBySwap();

	// $scope.deckCards
	if (deckCards.length) {
		$scope.cardBack = Cards.imageCardBack();
	};

	mySelf.cards.push(deckCards.pop());
	mySelf.cards.push(deckCards.pop());

	var publicCards = [];
	publicCards.push(deckCards.pop());
	publicCards.push(deckCards.pop());
	publicCards.push(deckCards.pop());
	// Two more rounds
	publicCards.push(deckCards.pop());
	publicCards.push(deckCards.pop());

	// OtherPlayers cards
	for (var i = 0; i < 5; i++) {
		players[i].cards.push(deckCards.pop());
		players[i].cards.push(deckCards.pop());
		players[i].cardsImg.push(Cards.imageCardBack());
	};

	$scope.players = players;
	$scope.publicCardsImg = Cards.renderCards(publicCards);

	// console.log("player status: ",  player);
	mySelf.cards = Cards.renderCards(mySelf.cards);
	$scope.mySelf = mySelf;	
	///////////////////////////////////////////////
	// Global vars
	// wsComm.wsSend(JSON.stringify("Check"));
	var gameState;

	///////////////////////////////////////////////	
	var init = function() {
		$scope.mySelf.myName = "";
		$scope.gameState;
		// init ws communication
		wsComm.wsInit();

		$scope.inputUsername = function() {
			var myName = $scope.mySelf.myName;
			// console.log("myUsername:", myName);
			// httpRequest.identity(myName).then(function(dataResponse, status, headers, config) {
			// 		$scope.mySelf.uid	= dataResponse.data;  
			// });
		};

		$scope.sitBtn = function() {
			var myUid = $scope.mySelf.uid;
			// httpRequest.sit(myUid, seatId).then(function(dataResponse, status, headers, config) {
				
			// };
		};

		$scope.standBtn = function() {
			var myUid = $scope.mySelf.uid;
			// httpRequest.stand(myUid).then(function(dataResponse, status, headers, config) {
				
			// };
		};

		$scope.checkBtn = function() {
			var myUid = $scope.mySelf.uid;
			// httpRequest.check(myUid).then(function(dataResponse, status, headers, config) {
				
			// };
		};

		$scope.foldBtn = function() {
			var myUid = $scope.mySelf.uid;
			// httpRequest.fold(myUid).then(function(dataResponse, status, headers, config) {
				
			// };
		};

		// input how much
		$scope.betBtn = function() {
			var myUid = $scope.mySelf.uid;
			// httpRequest.bet(myUid).then(function(dataResponse, status, headers, config) {
				
			// };
		};

		$scope.callBtn = function() {
			var myUid = $scope.mySelf.uid;
			// httpRequest.call(myUid).then(function(dataResponse, status, headers, config) {
				
			// };
		};

	}

	init();
	// check updated gameState received from WebSocket
	// Required logic for updating front end view here
	var gameStateProc = function (gameState) {
		// required for dynamically change scope
		$scope.$apply(function() {
			// $scope.gameState = gameState;	
			$scope.gameState = JSON.parse(gameStateEmu.gameStateJSON[0]); 				// Test only
			console.log($scope.gameState);
		});
	};
	// update game state through webSocket
	wsComm.wsUpdate(gameStateProc);

}])