'use strict'

angular.module('app.service', [])
.factory('ViewService', [function() {

}])

.factory('Users', function() {
  // for every user model
  var g_uid = 0;
  var User = function(uid, name) {
  	this.uid = uid;
  	this.name = name;
  	this.money = 500;
  }

  var addUser = function() {
  	var userName = 'user';
  	var uid = g_uid++;
  	var newUser = new User(uid, userName + uid);
  	return newUser;
  }

  return{
  	addUser:addUser
  }
})

.factory('Cards', function() {
  var allCards = ['','2h','3h','4h','5h','6h','7h','8h','9h','th','jh','qh','kh','ah',
                     '2d','3d','4d','5d','6d','7d','8d','9d','td','jd','qd','kd','ad',
                     '2c','3c','4c','5c','6c','7c','8c','9c','tc','jc','qc','kc','ac',
                     '2s','3s','4s','5s','6s','7s','8s','9s','ts','js','qs','ks','as'
                 ];

  // cards
  var SUIT = {
  	'h': -1,
  	'd': 12,
  	'c': 25,
  	's': 38
  };

  var IMAGE_SUIT = {
  	'h': 'hearts',
  	'd': 'diamonds',
  	'c': 'clubs',
  	's': 'spades'
  };

    var IMAGE_VALUE = {
  	'j': 'jack',
  	'a': 'ace',
  	'q': 'queen',
  	'k': 'king'
  };

  var imageFromValueSuit = function(value, suit) {

  	if(IMAGE_VALUE[value] !== undefined) {
  	  value = IMAGE_VALUE[value];
  	}
    
    return '' + value + '-' + IMAGE_SUIT[suit] + '.png';
  };

  var cardFromValueSuit = function(value, suit) {
  	return SUIT[suit] + value;
  };

  var valueSuitFromCard = function(card) {

  	if(card < 0 || card > 52) {
  	  return '';
  	}

  	return allCards[card];
  };

  return {
  	imageFromValueSuit: imageFromValueSuit,
  	cardFromValueSuit: cardFromValueSuit,
  	valueSuitFromCard: valueSuitFromCard
  }
})