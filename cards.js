/* Card dimensions */
var radius = 8;
var width = 100;
var height = 140;

var last_state = 'back';
var last_suit = 'spades';
var last_rank = 'A';

var my_canvas;
var context;
/*******************/

window.onload = function () {
	my_canvas = document.getElementById("cardsDisplay");
	context = my_canvas.getContext("2d");

	context.clearRect(0, 0, my_canvas.width, my_canvas.height);

	document.getElementById("flip").addEventListener("click", function () { flip(context); });
	document.getElementById("deal").addEventListener("click", function () { deal(context); });
	document.getElementById("suit").addEventListener("change", function () { last_suit = this.value; if (last_state == 'front') {drawCard(context, last_suit, last_rank, 20, 20);} });
	document.getElementById("rank").addEventListener("change", function () { last_rank = this.value; if (last_state == 'front') {drawCard(context, last_suit, last_rank, 20, 20);} });
	var rank_option = document.getElementById("rank");
	rank_option.addEventListener("change", function () { last_rank = rank_option.value; });
};

function spade(context, x, y, pip_width, pip_height) {
	context.save();
	var bottom_width = pip_width * 0.7;
	var top_height = pip_height * 0.7;
	var bottom_height = pip_height * 0.3;

	context.beginPath();
	context.moveTo(x, y);
	context.bezierCurveTo(x, y + top_height / 2, x - pip_width / 2, y + top_height / 2, x - pip_width / 2, y + top_height);
	context.bezierCurveTo(x - pip_width / 2, y + top_height * 1.3, x, y + top_height * 1.3, x, y + top_height);
	context.bezierCurveTo(x, y + top_height * 1.3, x + pip_width / 2, y + top_height * 1.3, x + pip_width / 2, y + top_height);
	context.bezierCurveTo(x + pip_width / 2, y + top_height / 2, x, y + top_height / 2, x, y);

	context.closePath();
	context.fill();

	context.beginPath();
	context.moveTo(x, y + top_height);
	context.quadraticCurveTo(x, y + top_height + bottom_height, x - bottom_width / 2, y + top_height + bottom_height);
	context.lineTo(x + bottom_width / 2, y + top_height + bottom_height);
	context.quadraticCurveTo(x, y + top_height + bottom_height, x, y + top_height);
	context.closePath();
	context.fillStyle = "black";
	context.fill();
	context.restore();
}

function club(context, x, y, pip_width, pip_height) {
	context.save();
	var circle_radius_club = pip_width * 0.3;
	var bottom_width = pip_width * 0.5;
	context.fillStyle = "black";

	context.beginPath();
	context.arc(x, y + circle_radius_club + (pip_height * 0.05), circle_radius_club, 0, 2 * Math.PI, false);
	context.fill();

	context.beginPath();
	context.arc(x + circle_radius_club, y + (pip_height * 0.6), circle_radius_club, 0, 2 * Math.PI, false);
	context.fill();

	context.beginPath();
	context.arc(x - circle_radius_club, y + (pip_height * 0.6), circle_radius_club, 0, 2 * Math.PI, false);
	context.fill();

	context.beginPath();
	context.arc(x, y + (pip_height * 0.5), circle_radius_club / 2, 0, 2 * Math.PI, false);
	context.fill();

	context.moveTo(x, y + (pip_height * 0.6));
	context.quadraticCurveTo(x, y + pip_height, x - bottom_width / 2, y + pip_height);
	context.lineTo(x + bottom_width / 2, y + pip_height);
	context.quadraticCurveTo(x, y + pip_height, x, y + (pip_height * 0.6));
	context.closePath();
	context.fill();
	context.restore();
}

function heart(context, x, y, pip_width, pip_height) {
	context.save();
	context.beginPath();
	var top_curve_height = pip_height * 0.3;
	context.moveTo(x, y + top_curve_height);
	context.bezierCurveTo(x, y, x - pip_width / 2, y, x - pip_width / 2, y + top_curve_height);
	context.bezierCurveTo(x - pip_width / 2, y + (pip_height + top_curve_height) / 2, x, y + (pip_height + top_curve_height) / 2, x, y + pip_height);
	context.bezierCurveTo(x, y + (pip_height + top_curve_height) / 2, x + pip_width / 2, y + (pip_height + top_curve_height) / 2, x + pip_width / 2, y + top_curve_height);
	context.bezierCurveTo(x + pip_width / 2, y, x, y, x, y + top_curve_height);
	context.closePath();
	context.fillStyle = "red";
	context.fill();
	context.restore();
}

function diamond(context, x, y, pip_width, pip_height) {
	context.save();
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x - pip_width / 2, y + pip_height / 2);
	context.lineTo(x, y + pip_height);
	context.lineTo(x + pip_width / 2, y + pip_height / 2);
	context.closePath();
	context.fillStyle = "red";
	context.fill();
	context.restore();
}

function drawBack(context, x, y) {
	context.clearRect(x, y, width, height);
	var img = new Image();
	img.src = "images/theeye.png";
	img.onload = function () {
		context.save();
		context.beginPath();
		context.moveTo(x + radius, y);
		context.lineTo(x + width - radius, y);
		context.quadraticCurveTo(x + width, y, x + width, y + radius);
		context.lineTo(x + width, y + height - radius);
		context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		context.lineTo(x + radius, y + height);
		context.quadraticCurveTo(x, y + height, x, y + height - radius);
		context.lineTo(x, y + radius);
		context.quadraticCurveTo(x, y, x + radius, y);
		context.closePath();
		context.strokeStyle = 'white';
		context.stroke();
		context.clip();
		context.drawImage(img, x, y, width, height);
		context.restore();
	};
}

/* Object Constructor */
function Card(suit, rank) {
	this.suit = suit;
	this.rank = rank;
}

var deck = [new Card('spades', "A"),
			new Card('spades', "2"),
			new Card('spades', "3"),
			new Card('spades', "4"),
			new Card('spades', "5"),
			new Card('spades', "6"),
			new Card('spades', "7"),
			new Card('spades', "8"),
			new Card('spades', "9"),
			new Card('spades', "10"),
			new Card('spades', "J"),
			new Card('spades', "Q"),
			new Card('spades', "K"),
			new Card('clubs', "A"),
			new Card('clubs', "2"),
			new Card('clubs', "3"),
			new Card('clubs', "4"),
			new Card('clubs', "5"),
			new Card('clubs', "6"),
			new Card('clubs', "7"),
			new Card('clubs', "8"),
			new Card('clubs', "9"),
			new Card('clubs', "10"),
			new Card('clubs', "J"),
			new Card('clubs', "Q"),
			new Card('clubs', "K"),
			new Card('hearts', "A"),
			new Card('hearts', "2"),
			new Card('hearts', "3"),
			new Card('hearts', "4"),
			new Card('hearts', "5"),
			new Card('hearts', "6"),
			new Card('hearts', "7"),
			new Card('hearts', "8"),
			new Card('hearts', "9"),
			new Card('hearts', "10"),
			new Card('hearts', "J"),
			new Card('hearts', "Q"),
			new Card('hearts', "K"),
			new Card('diamonds', "A"),
			new Card('diamonds', "2"),
			new Card('diamonds', "3"),
			new Card('diamonds', "4"),
			new Card('diamonds', "5"),
			new Card('diamonds', "6"),
			new Card('diamonds', "7"),
			new Card('diamonds', "8"),
			new Card('diamonds', "9"),
			new Card('diamonds', "10"),
			new Card('diamonds', "J"),
			new Card('diamonds', "Q"),
			new Card('diamonds', "K")];

function draw_face(context, suit, x, y, pip_width, pip_height) {
	switch (suit) {
		case 'spades':
			spade(context, x, y, pip_width, pip_height);
			break;
		case 'clubs':
			club(context, x, y, pip_width, pip_height);
			break;
		case 'hearts':
			heart(context, x, y, pip_width, pip_height);
			break;
		case 'diamonds':
			diamond(context, x, y, pip_width, pip_height);
			break;
	}
}
function drawPipRankPair(context, suit, rank, x, y) {
	// Draws the pair of Pip+Rank on each card
	var tl_pip_x = x + 12;
	var tl_pip_y = y + 18;
	var tl_txt_x = x + 7;
	var tl_txt_y = y + 16;

	//var br_pip_x = x + 88;
	//var br_pip_y = y + 120;
	//var br_txt_x = x + 83;
	//var br_txt_y = y + 116;

	context.save();
	context.font = "15px Verdana";
	context.fillText(rank, tl_txt_x, tl_txt_y);
	draw_face(context, suit, tl_pip_x, tl_pip_y, 10, 15);
	context.restore();
	//transform:
	context.save();
	context.translate(x + width / 2, y + height / 2);
	context.rotate(Math.PI);
	context.font = "15px Verdana";
	context.fillText(rank, width / 2 * (-1) + 7, height / 2 * (-1) + 16);
	draw_face(context, suit, width / 2 * (-1) + 12, height / 2 * (-1) + 18, 10, 15);
	context.restore();
}
function draw_face_inverted(context, suit, x, y, pip_width, pip_height) {
	context.save();
	context.translate(x, y + pip_height);
	context.rotate(Math.PI);
	draw_face(context, suit, 0, 0, pip_width, pip_height);
	context.restore();
}
function draw2(context, suit, x, y) {
	var pip_x = x + (width / 2);
	var top_y = y + 12;
	var low_y = y + (3 * (height / 4) - 7);

	draw_face(context, suit, pip_x, top_y, 20, 25);
	draw_face(context, suit, pip_x, low_y, 20, 25);
}
function draw3(context, suit, x, y) {
	var pip_x = x + (width / 2);
	var top_y = y + 12;
	var mid_y = y + (height / 2) - 15;
	var low_y = y + (3 * (height / 4) - 7);

	draw_face(context, suit, pip_x, top_y, 20, 25);
	draw_face(context, suit, pip_x, mid_y, 20, 25);
	draw_face_inverted(context, suit, pip_x, low_y, 20, 25);
}
function draw4(context, suit, x, y) {
	var left_x = x + (width / 3);
	var right_x = x + (2 * (width / 3));

	var top_y = y + 12;
	var low_y = y + ((3 * (height / 4) - 7));

	draw_face(context, suit, left_x, top_y,  20, 25);
	draw_face(context, suit, right_x, top_y, 20, 25);
	draw_face_inverted(context, suit, left_x, low_y,  20, 25);
	draw_face_inverted(context, suit, right_x, low_y, 20, 25);
}
function draw5(context, suit, x, y) {
	draw4(context, suit, x, y);

	var mid_x = x + (width / 2);
	var mid_y = y + (height / 2) - 13;

	draw_face(context, suit, mid_x, mid_y, 20, 25);
}
function draw6(context, suit, x, y) {
	var left_x = x + (width / 3);
	var right_x = x + (2 * (width / 3));

	var top_y = y + 12;
	var mid_y = y + (height / 2) - 14;
	var low_y = y + (3 * (height / 4) - 5);

	draw_face(context, suit, left_x, top_y, 15, 22);
	draw_face(context, suit, right_x, top_y, 15, 22);
	draw_face(context, suit, left_x, mid_y, 15, 22);
	draw_face(context, suit, right_x, mid_y, 15, 22);
	draw_face_inverted(context, suit, left_x, low_y, 15, 22);
	draw_face_inverted(context, suit, right_x, low_y, 15, 22);
}
function draw7(context, suit, x, y) {
	draw6(context, suit, x, y);
	var _x = x + (width / 2);
	var _y = y + (height / 3) - 12;

	draw_face(context, suit, _x, _y, 15, 22);
}
function draw8(context, suit, x, y) {
	draw6(context, suit, x, y);
	var _x = x + (width / 2);
	var top_y = y + (height / 3) - 12;
	var low_y = y + (2 * height / 3) - 12;

	draw_face(context, suit, _x, top_y, 15, 22);
	draw_face_inverted(context, suit, _x, low_y, 15, 22);
}
function draw9(context, suit, x, y) {
	var left_x = x + (width / 3);
	var right_x = x + (2 * (width / 3));

	var y1 = y + 12;
	var y2 = y + (height / 4) + 7;
	var y3 = y + (height / 2) + 7;
	var y4 = y + (4 * (height / 5) - 5);

	var mid_x = x + (width / 2);
	var mid_y = y + (height / 2) - 13;

	draw_face(context, suit, left_x, y1,  15, 22);
	draw_face(context, suit, right_x, y1, 15, 22);
	draw_face(context, suit, left_x, y2,  15, 22);
	draw_face(context, suit, right_x, y2, 15, 22);
	draw_face_inverted(context, suit, left_x, y3,  15, 22);
	draw_face_inverted(context, suit, right_x, y3, 15, 22);
	draw_face_inverted(context, suit, left_x, y4,  15, 22);
	draw_face_inverted(context, suit, right_x, y4, 15, 22);
	draw_face(context, suit, mid_x, mid_y, 15, 22);
}
function draw10(context, suit, x, y) {
	var left_x = x + (width / 3);
	var right_x = x + (2 * (width / 3));

	var y1 = y + 12;
	var y2 = y + (height / 4) + 7;
	var y3 = y + (height / 2) + 7;
	var y4 = y + (4 * (height / 5) - 5);

	var mid_x = x + (width / 2);
	var top_mid_y = y + (height / 3) - 18;
	var low_mid_y = y + (2 * height / 3);

	draw_face(context, suit, left_x, y1,  15, 22);
	draw_face(context, suit, right_x, y1, 15, 22);
	draw_face(context, suit, left_x, y2,  15, 22);
	draw_face(context, suit, right_x, y2, 15, 22);
	draw_face_inverted(context, suit, left_x, y3,  15, 22);
	draw_face_inverted(context, suit, right_x, y3, 15, 22);
	draw_face_inverted(context, suit, left_x, y4,  15, 22);
	draw_face_inverted(context, suit, right_x, y4, 15, 22);
	draw_face(context, suit, mid_x, top_mid_y, 15, 22);
	draw_face_inverted(context, suit, mid_x, low_mid_y, 15, 22);
}
function drawF(context, suit, rank, x, y) {
	// Function which draws all (F)ace cards
	context.save();
	context.rect(x + 26, y + 10, width - 50, height - 20);
	context.stroke();
	context.restore();
	context.save();
	context.translate(x + width, y);
	context.rotate(Math.PI / 2);
	context.textAlign = "center";
	context.font = "36px Algerian";
	switch (rank) {
		case 'J':
			context.fillText("JACK", height / 2, width / 2 + 10);
			break;
		case 'Q':
			context.fillText("QUEEN", height / 2, width / 2 + 10);
			break;
		case 'K':
			context.fillText("KING", height / 2, width / 2 + 10);
			break;
		case 'A':
			context.fillText("ACE", height / 2, width / 2 + 10);
			break;
	}
	context.restore();
}

function drawCard(context, suit, rank, x, y) {
	// Draw the outline of the card:
	context.save();
	context.beginPath();
	context.moveTo(x + radius, y);
	context.lineTo(x + width - radius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius);
	context.lineTo(x + width, y + height - radius);
	context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	context.lineTo(x + radius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
	context.fillStyle = 'white';
	context.strokeStyle = 'black';
	context.fill();
	context.stroke();
	context.restore();

	// Selector to choose which pip/rank variation to draw:
	switch (rank) {
		case '2':
			drawPipRankPair(context, suit, rank, x, y);
			draw2(context, suit, x, y);
			break;
		case '3':
			drawPipRankPair(context, suit, rank, x, y);
			draw3(context, suit, x, y);
			break;
		case '4':
			drawPipRankPair(context, suit, rank, x, y);
			draw4(context, suit, x, y);
			break;
		case '5':
			drawPipRankPair(context, suit, rank, x, y);
			draw5(context, suit, x, y);
			break;
		case '6':
			drawPipRankPair(context, suit, rank, x, y);
			draw6(context, suit, x, y);
			break;
		case '7':
			drawPipRankPair(context, suit, rank, x, y);
			draw7(context, suit, x, y);
			break;
		case '8':
			drawPipRankPair(context, suit, rank, x, y);
			draw8(context, suit, x, y);
			break;
		case '9':
			drawPipRankPair(context, suit, rank, x, y);
			draw9(context, suit, x, y);
			break;
		case '10':
			drawPipRankPair(context, suit, rank, x, y);
			draw10(context, suit, x, y);
			break;
		case 'J':
		case 'Q':
		case 'K':
		case 'A':
			drawPipRankPair(context, suit, rank, x, y);
			drawF(context, suit, rank, x, y);
			break;
	}
}

function drawDeck(context) {
	context.save();
	drawBack(context, 20, 20);
	context.restore();
}

function flip(context) {
	if (last_state == 'back') {
		context.save();
		drawCard(context, last_suit, last_rank, 20, 20);
		context.restore();
		last_state = 'front';
	} else if (last_state == 'front') {
		context.save();
		drawBack(context, 20, 20);
		context.restore();
		last_state = 'back';
	}
}


var card = [];
var rand;
var indices = new Array(5);
var all_unique = false;

rand = Math.floor(Math.random() * 52);
indices[iter] = rand;

for (var iter = 0; iter < 5; iter += 1) {
	rand = Math.floor(Math.random() * 52);
	for (var ind = 0; ind < indices.length; ind += 1) {
		if (rand === ind) {
			iter -= 1;
			all_unique = false;
		} else {
			all_unique = true;
		}
	}
	if (all_unique) indices[iter] = rand;
}

for (var index = 0; index < 5; index += 1) {
	card.push(deck[indices[index]]);
}

function deal(context) {
	var startTime = (new Date()).getTime();
	animate(context, startTime);

	drawDeck(context);
	drawDeck(context);
	
	//context.save();
	//context.translate(x1, y1);
	//context.rotate(-30 * Math.PI / 180);
	//drawCard(context, card[0].suit, card[0].rank, 0, 0);
	//context.restore();
	//context.save();
	//context.translate(x2, y2);
	//context.rotate(-15 * Math.PI / 180);
	//drawCard(context, card[1].suit, card[1].rank, 0, 0);
	//context.restore();
	//context.save();
	//context.translate(x3, y3);
	//drawCard(context, card[2].suit, card[2].rank, 0, 0);
	//context.restore();
	//context.save();
	//context.translate(x4, y4);
	//context.rotate(15 * Math.PI / 180);
	//drawCard(context, card[3].suit, card[3].rank, 0, 0);
	//context.restore();
	//context.save();
	//context.translate(x5, y5);
	//context.rotate(30 * Math.PI / 180);
	//drawCard(context, card[4].suit, card[4].rank, 0, 0);
	//context.restore();
	//context.save();

	//context.restore();
}

var card1 = {
	x: 20,
	y: 20,
	x_end: 300,
	y_end: 200 + ((Math.sin(30 * Math.PI / 180) * width) / 2),
	suit: card[0].suit,
	rank: card[0].rank
};
var card2 = {
	x: 20,
	y: 20,
	x_end: 400,//350,
	y_end: 250,//200,
	suit: card[1].suit,
	rank: card[1].rank
};
var card3 = {
	x: 20,
	y: 20,
	x_end: 500,//400,
	y_end: 300,//200 - ((Math.sin(15 * Math.PI / 180) * width) / 2),
	suit: card[2].suit,
	rank: card[2].rank
};
var card4 = {
	x: 20,
	y: 20,
	x_end: 600,//450,
	y_end: 250,//200 - ((Math.sin(15 * Math.PI / 180) * width) / 2),
	suit: card[3].suit,
	rank: card[3].rank
};
var card5 = {
	x: 20,
	y: 20,
	x_end: 700,//500,
	y_end: 200,//200,
	suit: card[4].suit,
	rank: card[4].rank
};

window.requestAnimFrame = (function (callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, 1000 / 30);
	};
})();

function animate(context, startTime) {
	// update
	var time = (new Date()).getTime() - startTime;

	var linearSpeed = 100;
	// pixels / second
	var newX1 = linearSpeed * time / 1000;
	var newX2 = linearSpeed * time / 1000;
	var newX3 = linearSpeed * time / 1000;
	var newX4 = linearSpeed * time / 1000;
	var newX5 = linearSpeed * time / 1000;

	var newY1 = linearSpeed * time / 1000;
	var newY2 = linearSpeed * time / 1000;
	var newY3 = linearSpeed * time / 1000;
	var newY4 = linearSpeed * time / 1000;
	var newY5 = linearSpeed * time / 1000;

	if (newX1 < card1.x_end)	card1.x = newX1;
	if (newY1 < card1.y_end)	card1.y = newY1;
	if (newX2 < card2.x_end)	card2.x = newX2;
	if (newY2 < card2.y_end)	card2.y = newY2;
	if (newX3 < card3.x_end)	card3.x = newX3;
	if (newY3 < card3.y_end)	card3.y = newY3;
	if (newX4 < card4.x_end)	card4.x = newX4;
	if (newY4 < card4.y_end)	card4.y = newY4;
	if (newX5 < card5.x_end)	card5.x = newX5;
	if (newY5 < card5.y_end)	card5.y = newY5;

	// clear
	context.clearRect(0, 0, my_canvas.width, my_canvas.height);
	context.save();
	drawCard(context, card1.suit, card1.rank, card1.x, card1.y);
	context.restore();
	context.save();
	drawCard(context, card2.suit, card2.rank, card2.x, card2.y);
	context.restore();
	context.save();
	drawCard(context, card3.suit, card3.rank, card3.x, card3.y);
	context.restore();
	context.save();
	drawCard(context, card4.suit, card4.rank, card4.x, card4.y);
	context.restore();
	context.save();
	drawCard(context, card5.suit, card5.rank, card5.x, card5.y);
	context.restore();
	drawDeck(context);

	// request new frame
	requestAnimFrame(function () {
		animate(context, startTime);
	});
}