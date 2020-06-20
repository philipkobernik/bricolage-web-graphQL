let node_size = 100; //initial
let hash_radius = 50;
let text_size = 12;
let spacing_distance = 0;

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
    this.nodes = [];
    this.tags = [];
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
			for (var j = 0; j < this.tags.length; j++) {
				if (this.tags[j].getName().includes(hashtags_[i]["name"])) {
					found = true;
				}
			}
			if (!found) {
				//console.log("new hashtag added");
				this.tags.push(new Hashtag(this.p5, hashtags_[i]["name"]));
			}
		}

		this.slug = slug_; //string

		// this.lab_affiliation = lab_affiliation_;

		// set random initial positions
    this.size = node_size*2;
		this.position = this.p5.createVector(  this.p5.random(spacing_distance, this.p5.windowWidth-400 - spacing_distance), this.p5.random(spacing_distance, this.p5.height - spacing_distance)  );
    this.position.x = this.p5.int(this.position.x/this.size)*this.size;
    this.position.y = this.p5.int(this.position.y/this.size)*this.size;
		this.final_position = this.p5.createVector(0, 0);
    this.oscillating_position = this.p5.createVector(0, 0);
    this.oscillating = false;
		this.random_spread;// = this.p5.createVector(this.p5.random(-spacing_distance, spacing_distance), this.p5.random(-spacing_distance, spacing_distance));
		this.alpha = 255;
		this.line_alpha = 50;
		this.color = [50, 124, 155];
		this.is_clicked = false; //are we in project mode or homepage mode?
		this.has_reached_final_pos = false;
    this.backToFinal = false;

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

  boundaryCheckIndividual(posx, posy) {
    //console.log(posx);
    let inside = true;
  		if (posx <= spacing_distance || posx >= this.p5.width - spacing_distance || posy <= spacing_distance || posy >= 555 - spacing_distance) {
        inside = false;
        //console.log(p.x);
        //console.log(p.y);
      }
    return inside;
  }

	update(nodes, index) {
		if (this.p5.round(this.position.mag()) != this.p5.round(this.final_position.mag()) && !this.oscillating) {
			var pos_difference = this.p5.createVector((this.final_position.x - this.position.x), (this.final_position.y - this.position.y));

      // make sure the node moves on a grid
      pos_difference.normalize();
      pos_difference.x = this.p5.round(pos_difference.x);
      pos_difference.y = this.p5.round(pos_difference.y);


      var prob = this.p5.random();
			if (prob >= 0.95) {
			     //this.position.add(pos_difference.mult(this.size));
           let canMove = true;

           for (let i = 0; i < this.nodes.length; i++){
             let pv = this.p5.createVector(this.position.x, this.position.y);
             let pd = this.p5.createVector(pos_difference.x, pos_difference.y);
             pv.add(pd.mult(this.size));
             //console.log(p.sub(nodes[i].position).mag());
             //console.log("px "+ p.x)
             var a = this.boundaryCheckIndividual(pv.x, pv.y);
             //console.log(a);
             if (pv.sub(this.nodes[i].position).mag()<1 || !a){
               canMove = false;
               //console.log("onTop");
             }
           }

           if (canMove){
               this.position.add(pos_difference.mult(this.size));
           }
           //console.log(this.position);
      }
      this.backToFinal = false;
		}
		//if we want random jittering enabled
		else {
      this.oscillating = true;

      if (!this.backToFinal){
  			//add probability of movement
  			var prob = this.p5.random();
        var probMax = 0.99;
  			if (prob >= probMax) {
  				this.random_spread = this.p5.createVector(this.p5.int(this.p5.random(-2, 2)), this.p5.int(this.p5.random(-2, 2)));
  				this.random_spread.mult(this.size);

          let canMove = true;
          for (let i = 0; i < this.nodes.length; i++){
            let pv2 = this.p5.createVector(this.position.x, this.position.y);
            pv2.add(this.random_spread);
            //console.log("osc: " + p.sub(this.nodes[i].position).mag());
            var a2 = this.boundaryCheckIndividual(pv2.x, pv2.y);
            if (pv2.sub(this.nodes[i].position).mag()<1 || !a2){
              canMove = false;
              //console.log("ON TOP");
            }
          }

          if (canMove){
              this.position.add(this.random_spread);
          }

  			} else if (prob <= 0.001){
          this.backToFinal = true;
          this.oscillating = false;
        }
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
	//console.log(spacing_distance);
	var count = this.tags.length;
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
	//console.log(numRows);
	//console.log(numCols);
	var xAmount = p5.floor((p5.windowWidth - 400 - count * spacing_distance - hash_radius * numRows) / numRows);
	var yAmount = p5.floor((555 - count * spacing_distance - hash_radius * numCols) / numCols);
	//console.log(xAmount);
	//console.log(yAmount);
	var xP = spacing_distance * 2 + hash_radius;
	var yP = spacing_distance * 2;

	let index = 0;
	for (var i = 0; i < numRows; i++) {
		yP = spacing_distance * 4;
		//console.log("first x: ", xP, " second x: ", xP + xAmount - spacing_distance);
		//var x = (xP + xP + xAmount) / 2;
		var x = p5.random(xP, xP + xAmount);
		xP += xAmount + spacing_distance + hash_radius;
		for (var j = 0; j < numCols; j++) {
		//	console.log("first y: ", yP, " second y: ", yP + yAmount - spacing_distance);
			//var y = (yP + yP + yAmount)/2;
			var y = p5.random(yP, yP + yAmount);
			yP += yAmount + spacing_distance + hash_radius;
		//	console.log(index);
			if (index < count) {
				this.tags[index].setPosition(p5.createVector(x, y));
			}
			index += 1;
		}
	}
}

const setup = (p5, canvasParentRef, props) => {
  p5.createCanvas(p5.windowWidth-400, 555).parent(canvasParentRef);
  p5.background(255);
  this.nodes = [];
  this.tags = [];
	p5.noStroke();
	//font = p5.loadFont("https://fonts.google.com/specimen/Press+Start+2P");
	font = p5.loadFont('/fonts/PressStart2P-Regular.ttf');
	hover_font = p5.loadFont('/fonts/Barlow-Regular.ttf');

	node_size = p5.int(node_size/props.p.length); // the more projects we add, the smaller the this.nodes will become
	spacing_distance = node_size/2 + 20;
	for(var i = 0; i < props.p.length; i++){
		// switched props.p[i].tags with props.p[i].category
		var n = new Node(p5, props.p[i].coverImage, props.p[i].title, props.p[i].author["name"], props.p[i].category, props.p[i].date, props.p[i].excerpt, props.p[i].slug);
		this.nodes.push(n);
	}
	repositionHashtags(p5);
	for(var i = 0; i < this.nodes.length; i++){
		gravitationalPull(p5, this.nodes[i],this.nodes);
	}
 }

const draw = p5 => {
	p5.background(255);
	//p5.background(234, 227, 148, 100);
  //p5.background(234, 227, 148);
  p5.noFill();
  p5.stroke(234, 227, 148);
  p5.strokeWeight(7);
  p5.rect(p5.width/2,p5.height/2, p5.width-7,p5.height-7);

	for (var i = 0; i < this.nodes.length; i++) {
    for (var j = i; j < this.nodes.length; j++) {
      assignRelatedness(p5, this.nodes[i], this.nodes[j]);
    }
	}

	displayHashtags();

	for (var i = 0; i < this.nodes.length; i++) {
		this.nodes[i].update(this.nodes,i);
		this.nodes[i].display();
		hover(p5, this.nodes[i]);
	}

	boundaryCheck(p5);
}

const windowResized = p5 => {
	var amount_changed = p5.width;
	p5.resizeCanvas(p5.windowWidth-400, 555);
	amount_changed -= p5.width;
	for(var i = 0; i < this.nodes.length; i++){
		//console.log(this.nodes[i].getPosition().x, amount_changed);
		var reset_position = p5.createVector(this.nodes[i].getPosition().x-amount_changed, this.nodes[i].getPosition().y);
		this.nodes[i].setPosition(reset_position);
	}
}

const mousePressed = p5 => {
  for (var i = 0; i < this.nodes.length; i++) {
    if (p5.mouseX > this.nodes[i].getPosition().x - this.nodes[i].size / 2 &&
      p5.mouseX < this.nodes[i].getPosition().x + this.nodes[i].size / 2 &&
      p5.mouseY > this.nodes[i].getPosition().y - this.nodes[i].size / 2 &&
      p5.mouseY < this.nodes[i].getPosition().y + this.nodes[i].size / 2) {
      this.nodes[i].setClick();
    }
	}

	for (var i = 0; i < this.tags.length; i++) {
    this.tags[i].checkPositions();
  }
}

const mouseDragged = p5 => {
  for (var i = 0; i < this.tags.length; i++) {
    if (this.tags[i].getDragged() == true) { // if its being dragged
      this.tags[i].setPosition(p5.createVector(p5.mouseX, p5.mouseY));
    }
  }
}

const mouseReleased = p5 => {
  for (var i = 0; i < this.tags.length; i++) {
    if (this.tags[i].getDragged() == true) {
      this.tags[i].setDragged(false);
    }
	}

	for (var i = 0; i < this.nodes.length; i++) {
		gravitationalPull(p5, this.nodes[i], this.nodes);
	}
}

function displayHashtags() {
	for (var i = 0; i < this.tags.length; i++) {
		//grab their positions and visualize their names at that coordinate
		this.tags[i].display();
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
function gravitationalPull(p5, p, ps) {
	//console.log("pulling!");
  var ht_array = p.getHashtags();
  var directionVector = p5.createVector(0);
	var count = 0;

  for (var i = 0; i < ht_array.length; i++) {
    for (var j = 0; j < this.tags.length; j++) {
      var finalPos = p5.createVector(this.tags[j].getPosition().x, this.tags[j].getPosition().y);
      if (p5.match(this.tags[j].getName(), ht_array[i])) {
				count++;
        directionVector.add(finalPos);
      }
    }
	}
	directionVector.div(count); // MAY NOT BE NEEDED???
	//directionVector.add(p.getRandomSpread()); //this ensures that the projects won't go on top of one another
  directionVector.x = p5.int(directionVector.x/p.size)*p.size;
  directionVector.y = p5.int(directionVector.y/p.size)*p.size;

  // make sure unique final position for each node
  let asLongAs = true;
  while(asLongAs){
    asLongAs = false;
    for (let i = 0; i < ps.length; i++){
      if (p5.int(ps[i].final_position.x) == directionVector.x && p5.int(ps[i].final_position.y) == directionVector.y ){
          asLongAs = true;
          directionVector.add(p5.createVector(p5.int(p5.random(-2, 2)), p5.int(p5.random(-2, 2))).mult(p.size));
      }
    }
  }
  //console.log(directionVector)
  p.backToFinal = true;
  p.oscillating = false;
	p.setFinalPosition(directionVector);
}

function boundaryCheck(p5) {
	for (var i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i].getPosition().x <= spacing_distance) {
			this.nodes[i].setFinalPosition(this.nodes[i].getFinalPosition().add(p5.createVector(1, p5.random(-2, 2))));
		}
		if (this.nodes[i].getPosition().x >= p5.width - spacing_distance) {
			this.nodes[i].setFinalPosition(this.nodes[i].getFinalPosition().add(p5.createVector(-1, p5.random(-2, 2))));
		}
		if (this.nodes[i].getPosition().y <= spacing_distance) {
			this.nodes[i].setFinalPosition(this.nodes[i].getFinalPosition().add(p5.createVector(p5.random(-2, 2), 1)));
		}
		if (this.nodes[i].getPosition().y >= 555 - spacing_distance) {
			this.nodes[i].setFinalPosition(this.nodes[i].getFinalPosition().add(p5.createVector(p5.random(-2, 2), -1)));
		}
	}

	// add bouncing off of each other here

/*	var collision_radius = node_size * 2;
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
*/
	//larger node collision areas
}


export { setup, draw, mousePressed, mouseDragged, mouseReleased, windowResized };
