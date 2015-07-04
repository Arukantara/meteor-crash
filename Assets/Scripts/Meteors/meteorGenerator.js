#pragma strict

var meteor : GameObject;
var star : GameObject;
var seconds : float;
var level: float;

function Start () {
	Generate();
}

function Generate() {
	while(true) {
		do {
			Instantiate(meteor, new Vector3((Random.value-Random.value)*1.2, -50, (Random.value-Random.value)*1.05), transform.rotation);
		} while(Random.value < level/10);
		
		var genStar = Random.value;
		if(genStar < 0.008)
			Instantiate(star, new Vector3(-(1-genStar)*4.8, -200, (Random.value-Random.value)*1.05), transform.rotation);
		else if(genStar > 0.992)			
			Instantiate(star, new Vector3(genStar*4.8, -200, (Random.value-Random.value)*1.05), transform.rotation);
		
		yield WaitForSeconds(seconds);
	}
} 