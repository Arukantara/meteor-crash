#pragma strict

static var life: float;
static var maxLife: float = 200;
static var score: int = 0;
static var special: int = 0;
static var maxSpecial: int = 10;
var barBorderTexture : Texture;
var barFillTexture : Texture;
var specialBorderTexture : Texture;
var specialFillTexture : Texture;
var explosion : AudioClip;
var shot : GameObject;
var specialAnimation : ParticleSystem;

function Start () {
	life = maxLife;
	explosion.LoadAudioData();
	GetComponent.<AudioSource>().enabled = true;
	GetComponent.<AudioSource>().volume = 0.1;
	specialAnimation.enableEmission = true;
}

function Update () {
	if(Input.GetButtonDown("Fire1")) {
		Instantiate(shot, new Vector3(transform.position.x, transform.position.y-0.1, transform.position.z), transform.rotation);
	}
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

function OnTriggerEnter (collisionInfo : Collider) {
	if(collisionInfo.name == "meteorClone(Clone)")
		hitByMeteor(collisionInfo);
}

function hitByMeteor (collisionInfo : Collider) {
	GetComponent.<AudioSource>().PlayOneShot(explosion);
	life -= 15;
}

function meteorShot () {
	score++;
	if(special < maxSpecial)
		special++;
}

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