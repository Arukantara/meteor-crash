using UnityEngine;
using System.Collections;

public class initializeScore : MonoBehaviour {

	// Use this for initialization
	void Start () {
		// If max score is not defined, these prefs must be initialized
		if(!PlayerPrefs.HasKey("Max score")) {
			PlayerPrefs.SetInt("Max score", 0);
			PlayerPrefs.SetInt("Last score", 0);
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
