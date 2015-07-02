#pragma strict

function Start () {

}

function Update () {

}

function OnGUI () {
    GUI.Label (Rect (Screen.width-350,10,300,100), "Distance: " + (Time.fixedTime*1.2).ToString());
}