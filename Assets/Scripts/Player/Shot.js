#pragma strict

var explosion : AudioClip;
var scope : float;

function Start () {
	explosion.LoadAudioData();
	GetComponent.<AudioSource>().enabled=true;
	GetComponent.<AudioSource>().volume=0.1;

}

function Update () {
	if(transform.position.y < -scope)
		Destroy(gameObject);
}

function OnTriggerEnter (collisionInfo : Collider) {
	if(collisionInfo.name == "meteorClone(Clone)") {
		GetComponent.<AudioSource>().PlayOneShot(explosion);
		GameObject.Find("playerStar").SendMessage("meteorShot");
		Destroy(gameObject);
	}
	else if(collisionInfo.name == "Bottom")
		Destroy(gameObject);
}