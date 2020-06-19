let node_size = 100; //initial
let hash_radius = 50;
let text_size = 12;
let spacing_distance = 0;

let nodes = [];
let global_hashtags = [];

let font = "";
let hover_font = "";

class Hashtag {
  constructor(p5_, name_) {
		this.p5 = p5_;
    this.name = name_;
		this.textSize = text_size;
		// TO DO: Fix overlapping
		this.position = this.p5.createVector(  this.p5.random(spacing_distance * 1.5, this.p5.width - spacing_distance * 1.5), this.p5.random(spacing_distance * 1.5, this.p5.height - spacing_distance * 1.5)  );
		this.isDragged = false;
  }
  
  getName() { return this.name; }
  getPosition() { return this.position; }
	getDragged() {return this.isDragged; }
	
  setPosition(p) { this.position = p; }
	setDragged(b) {this.isDragged = b; }
  
  display() {
		this.p5.fill(211, 103, 60);
		this.p5.noStroke();
		this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
		this.p5.textFont(font, this.textSize);
    this.p5.text(this.name, this.position.x, this.position.y, hash_radius * 2, hash_radius * 2);
  }
  
  checkPositions() {
    if (this.p5.mouseX >= this.position.x - 50 && 
				this.p5.mouseX <= this.position.x + 50 && 
				this.p5.mouseY >= this.position.y - (this.textSize * 2) && 
				this.p5.mouseY <= this.position.y) 
    {
      this.isDragged = true;
    }
	}
	
}

class Node {
	constructor(p5_, coverImage_, title_, authors_, hashtags_, date_, project_description_, slug_) {
		this.p5 = p5_;

		this.coverImage = coverImage_;
		//this.coverImage = this.p5.loadImage(coverImage_); //image object
		this.title = title_; //string
		this.authors = [];
		this.authors.push(authors_); //array of strings
		this.date = date_; //string
		//this.shortDescription = shortDescription_; //string
		this.project_description = project_description_; //string
		//this.medium = medium_; //array
		//this.category = category_; //string
		this.hashtags = []; //array
		for(var i = 0; i < hashtags_.length; i++){
			var found = false;
			this.hashtags.push(hashtags_[i]["name"]);
			//set the global hashtag array
			for (var j = 0; j < global_hashtags.length; j++) {
				if (global_hashtags[j].getName().includes(hashtags_[i]["name"])) {
					found = true;
				}
			}
			if (!found) {
				//console.log("new hashtag added");
				global_hashtags.push(new Hashtag(this.p5, hashtags_[i]["name"]));
			}
		}

		this.slug = slug_; //string

		// this.lab_affiliation = lab_affiliation_;

		// set random initial positions
		this.position = this.p5.createVector(  this.p5.random(spacing_distance, this.p5.windowWidth-400 - spacing_distance), this.p5.random(spacing_distance, this.p5.height - spacing_distance)  );
		this.final_position = this.p5.createVector(0, 0);
		this.random_spread = this.p5.createVector(this.p5.random(-spacing_distance, spacing_distance), this.p5.random(-spacing_distance, spacing_distance));
		this.size = node_size * 2;
		this.alpha = 255;
		this.line_alpha = 50;
		this.color = [50, 124, 155];
		this.is_clicked = false; //are we in project mode or homepage mode?
		this.has_reached_final_pos = false;

		this.speed = node_size * 0.5;
	}

	//getters
	getPosition() { return this.position; }
	getFinalPosition() { return this.final_position; }
	getRandomSpread() { return this.random_spread; }
	getHashtags() { return this.hashtags; }
	getLineAlpha() { return this.line_alpha; }
	//getLabAffiliation() { return this.lab_affiliation; }
	getTitle() { return this.title; }
	getAuthors() { return this.authors; }
	getSize() { return this.size; }
	getFinalBoolean() { return this.has_reached_final_pos; }
	getSpeed() { return this.speed; }

	//setters
	setLineAlpha(l_a) { this.line_alpha = l_a; }
	setClick() { this.is_clicked = !this.is_clicked; }
	setPosition(p) { this.position = p }
	setFinalPosition(p) { this.final_position = p; }
	setFinalBoolean() { this.has_reached_final_pos = !this.has_reached_final_pos;}
	setSpeed(s) { this.speed = s; }

	update() {
		if (this.p5.round(this.position.mag()) != this.p5.round(this.final_position.mag())) {
			var pos_difference = this.p5.createVector((this.final_position.x - this.position.x), (this.final_position.y - this.position.y));
			pos_difference.normalize();
			this.position.add(pos_difference);
		} 
		//if we want random jittering enabled
		else {
			//add probability of movement
			var prob = this.p5.random(0, 1);
			if (prob >= 0.9) {
				this.random_spread = this.p5.createVector(this.p5.int(this.p5.random(-2, 2)), this.p5.int(this.p5.random(-2, 2)));
				this.random_spread.mult(this.speed);
				this.final_position.add(this.random_spread);
			}
		}

		if (this.is_clicked) {
			window.open("/projects/" + this.slug);
			this.is_clicked = false;
    } 
	}

	display() {
		this.p5.noStroke();
    this.p5.fill(this.color[0], this.color[1], this.color[2], this.alpha);
		this.p5.rectMode(this.p5.CENTER);
		this.p5.rect(this.getPosition().x, this.getPosition().y, this.size, this.size);
	}
}

function repositionHashtags(p5) {
	console.log(spacing_distance);
	var count = global_hashtags.length;
	var numRows = p5.ceil(count / 2);
	var numCols = p5.ceil(count / numRows);
	if (numRows - numCols > 1) {
		if (numRows > numCols) {
			numRows -= 1;
			numCols += 1;
		} else {
			numRos += 1;
			numCols -= 1;
		}
	}
	console.log(numRows);
	console.log(numCols);
	var xAmount = p5.floor((p5.windowWidth - 400 - count * spacing_distance - hash_radius * numRows) / numRows);
	var yAmount = p5.floor((555 - count * spacing_distance - hash_radius * numCols) / numCols);
	console.log(xAmount);
	console.log(yAmount);
	var xP = spacing_distance * 2 + hash_radius;
	var yP = spacing_distance * 2;

	let index = 0;
	for (var i = 0; i < numRows; i++) {
		yP = spacing_distance * 4;
		console.log("first x: ", xP, " second x: ", xP + xAmount - spacing_distance);
		//var x = (xP + xP + xAmount) / 2;
		var x = p5.random(xP, xP + xAmount);
		xP += xAmount + spacing_distance + hash_radius;
		for (var j = 0; j < numCols; j++) {
			console.log("first y: ", yP, " second y: ", yP + yAmount - spacing_distance);
			//var y = (yP + yP + yAmount)/2;
			var y = p5.random(yP, yP + yAmount);
			yP += yAmount + spacing_distance + hash_radius;
			console.log(index);
			if (index < count) {
				global_hashtags[index].setPosition(p5.createVector(x, y));
			}
			index += 1;
		}
	}
}

const setup = (p5, canvasParentRef, props) => {
  p5.createCanvas(p5.windowWidth-400, 555).parent(canvasParentRef);
  p5.background(255);
	p5.noStroke();
	//font = p5.loadFont("https://fonts.google.com/specimen/Press+Start+2P");
	font = p5.loadFont('/fonts/PressStart2P-Regular.ttf');
	hover_font = p5.loadFont('/fonts/Barlow-Regular.ttf');

	node_size = node_size/props.p.length; // the more projects we add, the smaller the nodes will become
	spacing_distance = node_size/2 + 20;
	for(var i = 0; i < props.p.length; i++){
		// switched props.p[i].tags with props.p[i].category
		var n = new Node(p5, props.p[i].coverImage, props.p[i].title, props.p[i].author["name"], props.p[i].category, props.p[i].date, props.p[i].excerpt, props.p[i].slug);
		nodes.push(n);
	}
	repositionHashtags(p5);
	for(var i = 0; i < nodes.length; i++){
		gravitationalPull(p5, nodes[i]);
	}
 }

const draw = p5 => {
	p5.background(255);
	p5.background(234, 227, 148, 100);
	for (var i = 0; i < nodes.length; i++) {
    for (var j = i; j < nodes.length; j++) {
      assignRelatedness(p5, nodes[i], nodes[j]);
    }
	}

	displayHashtags();
	
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].update();
		nodes[i].display();
		hover(p5, nodes[i]);
	}

	boundaryCheck(p5);
}

const windowResized = p5 => {
	var amount_changed = p5.width;
	p5.resizeCanvas(p5.windowWidth-400, 555);
	amount_changed -= p5.width;
	for(var i = 0; i < nodes.length; i++){
		//console.log(nodes[i].getPosition().x, amount_changed);
		var reset_position = p5.createVector(nodes[i].getPosition().x-amount_changed, nodes[i].getPosition().y);
		nodes[i].setPosition(reset_position);
	}
}

const mousePressed = p5 => {
  for (var i = 0; i < nodes.length; i++) {
    if (p5.mouseX > nodes[i].getPosition().x - nodes[i].size / 2 &&
      p5.mouseX < nodes[i].getPosition().x + nodes[i].size / 2 &&
      p5.mouseY > nodes[i].getPosition().y - nodes[i].size / 2 &&
      p5.mouseY < nodes[i].getPosition().y + nodes[i].size / 2) {
      nodes[i].setClick();
    }
	}
	
	for (var i = 0; i < global_hashtags.length; i++) {
    global_hashtags[i].checkPositions();
  }
}

const mouseDragged = p5 => {
  for (var i = 0; i < global_hashtags.length; i++) {
    if (global_hashtags[i].getDragged() == true) { // if its being dragged
      global_hashtags[i].setPosition(p5.createVector(p5.mouseX, p5.mouseY));
    }
  }
}

const mouseReleased = p5 => {
  for (var i = 0; i < global_hashtags.length; i++) {
    if (global_hashtags[i].getDragged() == true) {
      global_hashtags[i].setDragged(false);
    }
	}
	
	for (var i = 0; i < nodes.length; i++) {
		gravitationalPull(p5, nodes[i]);
	}
}

function displayHashtags() {
	for (var i = 0; i < global_hashtags.length; i++) {
		//grab their positions and visualize their names at that coordinate
		global_hashtags[i].display();
	}
}

function hover(p5, p) {
  if (p5.mouseX > p.getPosition().x - p.getSize() / 2 &&
    p5.mouseX < p.getPosition().x + p.getSize() / 2 &&
    p5.mouseY > p.getPosition().y - p.getSize() / 2 &&
		p5.mouseY < p.getPosition().y + p.getSize() / 2) 
	{
		//p5.background(255);
		//p5.background(234, 227, 148, 100);
		p5.fill(0);
		p5.textAlign(p5.CENTER, p5.CENTER);
		p5.textFont(hover_font, text_size);
		p5.text(p.getTitle(), p.getPosition().x, p.getPosition().y - (text_size + 3));
		
		p.setLineAlpha(255);
  } else {
		p.setLineAlpha(20);
	}
}

function assignRelatedness(p5, p1, p2) { //takes in two projects and checks their relation
	var hashtagCounter = 0;
	for (var i = 0; i < p2.getHashtags().length; i++) {
		// console.log(p2.getAuthors(), p2.getHashtags()[i])
		if (p1.getHashtags().includes(p2.getHashtags()[i])) {
			hashtagCounter++;
		}
	}
	if (hashtagCounter > 0) {
		p5.strokeWeight(hashtagCounter);
		var alpha = 50;
		if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
			alpha = 255;
		}
		p5.stroke(211, 103, 60, alpha)
		p5.line(p1.getPosition().x, p1.getPosition().y, p2.getPosition().x, p2.getPosition().y);
	}

	// if (p1.getLabAffiliation() == p2.getLabAffiliation()) {
	// 	strokeWeight(1);
	// 	var alpha = 20;
	// 	if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
	// 		alpha = 255;
	// 	}s
	// 	this.p5.stroke(96, 99, 134, alpha);
	// 	this.p5.line(p1.getPosition().x + 5, p1.getPosition().y, p2.getPosition().x + 5, p2.getPosition().y);
	// }

	var nameCounter = 0;
	for (var i = 0; i < p2.getAuthors().length; i++) {
		if (p1.getAuthors().includes(p2.getAuthors()[i])) {
			nameCounter++;
		}
	}
	
	if (nameCounter > 0) {
		p5.strokeWeight(nameCounter);
		var alpha = 50;
		if(p1.getLineAlpha() == 255 || p2.getLineAlpha() == 255){
			alpha = 255;
		}
		p5.stroke(96, 99, 134, alpha);
		p5.line(p1.getPosition().x + 5, p1.getPosition().y + 5, p2.getPosition().x +5, p2.getPosition().y + 5);
	}
}

//this organizes the node position based on hashtag location
function gravitationalPull(p5, p) {
	//console.log("pulling!");
  var ht_array = p.getHashtags();
  var directionVector = p5.createVector(0);
	var count = 0;

  for (var i = 0; i < ht_array.length; i++) {
    for (var j = 0; j < global_hashtags.length; j++) {
      var finalPos = p5.createVector(global_hashtags[j].getPosition().x, global_hashtags[j].getPosition().y);
      if (p5.match(global_hashtags[j].getName(), ht_array[i])) {
				count++;
        directionVector.add(finalPos);
      }
    }
	}
	directionVector.div(count); // MAY NOT BE NEEDED???
	directionVector.add(p.getRandomSpread()); //this ensures that the projects won't go on top of one another
	p.setFinalPosition(directionVector);
}

function boundaryCheck(p5) {
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].getPosition().x <= spacing_distance) {
			nodes[i].setFinalPosition(nodes[i].getFinalPosition().add(p5.createVector(p5.random(1,5), p5.random(-2, 2))));
		}
		if (nodes[i].getPosition().x >= p5.width - spacing_distance) {
			nodes[i].setFinalPosition(nodes[i].getFinalPosition().add(p5.createVector(p5.random(-1,-5), p5.random(-2, 2))));
		}
		if (nodes[i].getPosition().y <= spacing_distance) {
			nodes[i].setFinalPosition(nodes[i].getFinalPosition().add(p5.createVector(p5.random(-2, 2), p5.random(1,5))));
		}
		if (nodes[i].getPosition().y >= 555 - spacing_distance) {
			nodes[i].setFinalPosition(nodes[i].getFinalPosition().add(p5.createVector(p5.random(-2, 2), p5.random(-1,-5))));
		}
	}

	// add bouncing off of each other here

	var collision_radius = node_size * 2; 
	for (var i = 0; i < nodes.length; i++) {
		for (var j = i; j < nodes.length; j++) {
			let nRightEdge = nodes[i].getPosition().x + collision_radius/2;
			let nLeftEdge = nodes[i].getPosition().x - collision_radius/2;
			let nDownEdge = nodes[i].getPosition().y + collision_radius/2;
			let nUpEdge = nodes[i].getPosition().y - collision_radius/2; 
			let nodeRightEdge = nodes[j].getPosition().x + collision_radius/2;
			let nodeLeftEdge = nodes[j].getPosition().x - collision_radius/2;
			let nodeDownEdge = nodes[j].getPosition().y + collision_radius/2;
			let nodeUpEdge = nodes[j].getPosition().y - collision_radius/2; 
			if (nRightEdge > nodeLeftEdge) {
				if ( (nUpEdge > nodeUpEdge && nUpEdge < nodeDownEdge) || (nDownEdge < nodeDownEdge && nDownEdge > nodeUpEdge) ) {
					//I also tried changing final_direction here, didn't work either
					//nodes[i].random_spread = p5.createVector(nodes[j].random_spread.mult(-1));
					//nodes[i].setPosition(nodes[i].getPosition().add(p5.createVector(p5.random(-2, 2), p5.random(-2, 2))));
				}
			} 
			if (nLeftEdge < nodeRightEdge) {
				if ( (nUpEdge > nodeUpEdge && nUpEdge < nodeDownEdge) || (nDownEdge < nodeDownEdge && nDownEdge > nodeUpEdge) ) {
					//nodes[i].random_spread = p5.createVector(nodes[j].random_spread.mult(-1));
					//nodes[i].setPosition(nodes[i].getPosition().add(p5.createVector(p5.random(-2, 2), p5.random(-2, 2))));
				}
			} 
			if (nUpEdge < nodeUpEdge) {
				if ( (nLeftEdge < nodeRightEdge && nLeftEdge > nodeLeftEdge) || (nRightEdge < nodeRightEdge && nRightEdge > nodeLeftEdge) ) {
					//nodes[i].random_spread = p5.createVector(nodes[j].random_spread.mult(-1));
					//nodes[i].setPosition(nodes[i].getPosition().add(p5.createVector(p5.random(-2, 2), p5.random(-2, 2))));
				}
			} 
			if (nDownEdge > nodeDownEdge) {
				if ( (nLeftEdge <= nodeRightEdge && nLeftEdge > nodeLeftEdge) || (nRightEdge < nodeRightEdge && nRightEdge > nodeLeftEdge) ) {
					//nodes[i].random_spread = p5.createVector(nodes[j].random_spread.mult(-1));
					//nodes[i].setPosition(nodes[i].getPosition().add(p5.createVector(p5.random(-2, 2), p5.random(-2, 2))));
				}
			}
		}
	}

	//larger node collision areas
}

export { setup, draw, mousePressed, mouseDragged, mouseReleased, windowResized };