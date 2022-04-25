import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { store } from "../Store";
import { addBlogPost } from "./../Store/actions";
import "@lion/input/define";
import "@lion/button/define";

export class LitElementForm extends LitElement {
	static styles = css`
		lion-input label {
			margin: 6px;
			margin-bottom: 0px;
		}
		lion-input input {
			margin-top: 0px;
			margin: 6px;
			padding: 8px 12px;
			border-radius: 8px;
			border: 2px solid #ccc;
		}
		lion-button {
			margin: 6px;
			text-align: center;
			border-radius: 8px;
			background-color: #666;
			border: 2px #333 solid;
			color: white;
			font-size: 16px;
			font-weight: bold;
			padding: 8px 12px;
			cursor: pointer;
		}
		lion-button:hover {
			background-color: #444;
		}
		.card {
			font-family: Arial, Helvetica, sans-serif;
			width: 400px;
			padding: 16px;
			margin: 8px;
			border: 2px #ccc solid;
			border-radius: 8px;
		}
		h2 {
			font-size: 24px;
			text-align: center;
		}
	`;

	@property({
		type: String,
	})
	title = "";

	@property({
		type: String,
	})
	description = "";

	handleChange(event: any, type: String) {
		if (type === "title") {
			this.title = event?.target?.value;
		} else if (type === "description") {
			this.description = event?.target?.value;
		}
	}

	handleSubmit() {
		if (this.title === "" || this.description === "") {
			alert("Niet alle waardes gevuld...");
			return;
		}

		const blogPost = {
			id: Math.floor(Math.random() * 9999),
			title: this.title,
			description: this.description,
		};

		store.dispatch(addBlogPost(blogPost));

		this.title = "";
		this.description = "";
	}

	render() {
		return html`
			<div class="card">
				<h2>Voeg blog toe</h2>
				<lion-input
					name="titel"
					label="Titel"
					@change="${($event: KeyboardEvent) =>
						this.handleChange($event, "title")}"
					.value="${this.title}"
				></lion-input>
				<lion-input
					name="beschrijving"
					label="Beschrijving"
					@change="${($event: KeyboardEvent) =>
						this.handleChange($event, "description")}"
					.value="${this.description}"
				></lion-input>
				<lion-button @click="${this.handleSubmit}">Send</lion-button>
			</div>
		`;
	}
}
