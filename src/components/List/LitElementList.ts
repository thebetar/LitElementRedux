import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { connect } from "pwa-helpers";

import { store } from "../../store/index";
import { BlogPost } from "../App/LitElementApp";

import "./LitElementListItem";

@customElement("lit-element-list")
export class LitElementList extends connect(store)(LitElement) {
	static styles = css`
		.card {
			font-family: Arial, Helvetica, sans-serif;
			margin: 8px;
			padding: 16px;
			border: 2px solid #333;
			border-radius: 8px;
			width: 400px;
			min-height: 400px;
		}
		h3 {
			font-size: 24px;
			text-align: center;
		}
		ul {
			list-style-type: none;
		}
	`;

	@property({
		type: Array,
	})
	blogs: BlogPost[] = [];

	stateChanged(state: any): void {
		this.blogs = state.blogs;
	}

	render() {
		return html`<div class="card">
			<h3>Lijst met blogs</h3>
			<ul>
				${this.blogs.map(
					(blog: BlogPost) =>
						html`<lit-element-list-item
							.blog="${blog as any}"
						></lit-element-list-item>`
				)}
			</ul>
		</div>`;
	}
}
