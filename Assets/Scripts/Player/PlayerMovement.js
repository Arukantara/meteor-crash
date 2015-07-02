#pragma strict

function Start () {
}

function Update () {
	transform.position.x = (Input.mousePosition.x - Screen.width/2)/1024;
	transform.position.z = (Input.mousePosition.y - Screen.height/2)/1024;
}
