#pragma strict

function Start () {
}

function Update () {
}

function OnTriggerEnter (collisionInfo : Collider) {
	if(collisionInfo.name != "meteorClone(Clone)")
		Destroy(gameObject);
	Debug.Log("Choca con " + collisionInfo.name);
	
}
/*
function OnCollisionEnter(col: Collision) {
	if(col.gameObject.name == "playerCollider")
		col.gameObject.SendMessage("hitByMeteor");
}*/