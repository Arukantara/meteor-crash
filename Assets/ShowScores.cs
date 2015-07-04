using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class ShowScores : MonoBehaviour {

	// Use this for initialization
	void Start () {
		Text txt = GetComponent<Text>();
	
		txt.text = "Last score: " + PlayerPrefs.GetInt("Last score")
			+ "\nMax. score: " + PlayerPrefs.GetInt("Max score");
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
