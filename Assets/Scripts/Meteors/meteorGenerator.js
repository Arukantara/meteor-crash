#pragma strict

var meteor : GameObject;
var seconds : float;
var level: float;

function Start () {
	Generate();
}

function Generate() {
	while(true) {
		do {
			Instantiate(meteor, new Vector3((Random.value-Random.value)*1.2, -20, (Random.value-Random.value)*1.05), transform.rotation);
		} while(Random.value < level/10);
		
		yield WaitForSeconds(seconds);
	}
} 