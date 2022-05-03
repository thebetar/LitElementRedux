import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

import { getBlogPosts } from "../../store/actions";
import { store } from "../../store/index";

import "../Form/LitElementForm";
import "../List/LitElementList";
import ClockController from "../../controllers/ClockController";

export type BlogPost = {
	id?: number;
	title: string;
	description: string;
};

@customElement("lit-element-app")
export class LitElementApp extends LitElement {
	static styles = css`
		h1 {
			margin: 8px;
			text-decoration: underline;
		}
		.container {
			width: calc(100% - 32px);
			padding: 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.container-header {
			font-family: Arial, Helvetica, sans-serif;
			border: 2px solid #666;
			background-color: #ccc;
			border-radius: 15px;
			padding: 8px;
		}
		.flex-box {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			height: 80vh;
			width: 90vw;
		}
	`;

	private clock = new ClockController(this);

	firstUpdated(): void {
		getBlogPosts().then((action) => store.dispatch(action));
	}

	render() {
		return html`<div class="container">
			<div class="container-header">
				<h1 id="app-title">Super coole blog app</h1>
				<h3>Tijd: ${this.clock.value}</h3>
			</div>
			<div class="flex-box">
				<lit-element-form></lit-element-form>
				<lit-element-list></lit-element-list>
			</div>
		</div>`;
	}
}
