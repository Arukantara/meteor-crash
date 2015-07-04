#pragma strict

// Player stats:
static var life: float;
static var maxLife: float = 200;
static var score: int = 0;
static var special: int = 0;
static var maxSpecial: int = 10;
// Game Over transition:
static var deathTime = 0.0f;
static var deathTimeLimit = 1f;

// GUI and visual effects:
var barBorderTexture : Texture;
var barFillTexture : Texture;
var specialBorderTexture : Texture;
var specialFillTexture : Texture;
var explosion : AudioClip;
var shot : GameObject;
var specialAnimation : ParticleSystem;
var deathAnimation : ParticleSystem;

// Initiates the game screen
function Start () {
	life = maxLife;
	deathTime = 0;
	special = 0;
	score = 0;
	explosion.LoadAudioData();
	GetComponent.<AudioSource>().enabled = true;
	GetComponent.<AudioSource>().volume = 0.1;
	specialAnimation.enableEmission = true;
	deathAnimation.enableEmission = true;
}


// On each iteration
function Update () {
	// If the player just died
	if(life <= 0 && deathTime == 0) {
		Debug.Log("no life: " + deathTime);
		var gameOverAnimation = Instantiate(deathAnimation, transform.position, transform.rotation) as ParticleSystem;
		gameOverAnimation.Play();
		deathTime += 0.1;
		// Updating scores:0
		PlayerPrefs.SetInt("Last score", score);
		if(PlayerPrefs.GetInt("Max score") < score) {
			PlayerPrefs.SetInt("Max score", score);
		}
		PlayerPrefs.Save();
	}
	
	// If life is 0 and transition has started
	if(deathTime > 0) {
		Debug.Log("no life: " + deathTime);
		deathTime += Time.deltaTime * 0.8;
		// If transition is finished
		if(deathTime >= deathTimeLimit) {
			Debug.Log("Game over.");
			Application.LoadLevel("game_over");	
		}
	} else { // During normal play
		// Left Click: Fire
		if(Input.GetButtonDown("Fire1")) {
			Instantiate(shot, new Vector3(transform.position.x, transform.position.y-0.1, transform.position.z), transform.rotation);
		}
		
		// Right Click: Special attack
		if(Input.GetButtonDown("Fire2") && special == maxSpecial) {
			special = 0;
			var animation = Instantiate(specialAnimation, transform.position, transform.rotation);
			animation.Play();
			var clones = GameObject.FindGameObjectsWithTag("Enemy");
	    	for (var clone in clones){
	        	Destroy(clone);
	    	}
		}
	}
}


// Detects if the player collides a meteor
function OnTriggerEnter (collisionInfo : Collider) {
	if(collisionInfo.name == "meteorClone(Clone)")
		hitByMeteor(collisionInfo);
	else if(collisionInfo.name == "Star(Clone)")
		hitByStar(collisionInfo);
}

// Reduces player life if hit by a meteor
function hitByMeteor (collisionInfo : Collider) {
	GetComponent.<AudioSource>().PlayOneShot(explosion);
	life -= 15;
}

// Reduces player life if hit by a star
function hitByStar (collisionInfo : Collider) {
	life = 0;
}

// Scores up if meteor is hit by a shot
function meteorShot () {
	score++;
	if(special < maxSpecial)
		special++;
}

// Loads GUI components
function OnGUI () {
	GUI.Label (Rect (Screen.width-200,10,300,100), "Score: " + (score).ToString());
    // Imprimir relleno de la barra segun la cantidad de vida:
    GUI.DrawTexture(Rect (0,1,348*life/maxLife,50), barFillTexture, ScaleMode.ScaleAndCrop, true, 0);
    // Imprimir borde de la barra:
    GUI.DrawTexture(Rect (0,1,350,50), barBorderTexture, ScaleMode.ScaleToFit, true, 0);
    // Imprimir relleno de la barra especial:
    GUI.DrawTexture(Rect (0,40,198*special/maxSpecial,25), specialFillTexture, ScaleMode.ScaleAndCrop, true, 0);
    // Imprimir borde de la barra especial:
    GUI.DrawTexture(Rect (0,40,200,25), barBorderTexture, ScaleMode.ScaleToFit, true, 0);
}