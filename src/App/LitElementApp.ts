import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import "../Form/lit-element-form";
import "../List/lit-element-list";

export type BlogPost = {
	id: Number;
	title: String;
	description: String;
};

export class LitElementApp extends LitElement {
	static styles = css`
		h1 {
			margin: 8px;
			text-decoration: underline;
			font-size: 36px;
			font-family: Arial, Helvetica, sans-serif;
			text-align: center;
		}
		.container {
			width: calc(100% - 32px);
			padding: 16px;
		}
		.flex-box {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			height: 80vh;
		}
	`;

	render() {
		return html`<div class="container">
			<h1>Super coole blog app</h1>
			<div class="flex-box">
				<lit-element-form></lit-element-form>
				<lit-element-list></lit-element-list>
			</div>
		</div>`;
	}
}
