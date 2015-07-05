using UnityEngine;
using System.Collections;

public class MenuButtons : MonoBehaviour {
	/// <summary>
	/// Goes to the main menu.
	/// </summary>
	public void GoToMainMenu() {
		Application.LoadLevel("main_menu");
	}

	/// <summary>
	/// Opens the free fall mode.
	/// </summary>
	public void Play() {
		Application.LoadLevel("free_fall1");
	}

	/// <summary>
	/// Closes the game.
	/// </summary>
	public void Exit() {
		Application.Quit();
	}
}
