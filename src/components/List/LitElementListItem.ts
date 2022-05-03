import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { store } from "../../store/index";
import { deleteBlogPost, setEditId } from "../../store/actions";
import { BlogPost } from "../App/LitElementApp";

@customElement("lit-element-list-item")
export class LitElementListItem extends LitElement {
	static styles = css`
		li {
			width: 80%;
			border: 1px #ccc solid;
			padding: 16px;
		}
		li:hover {
			background-color: #eee;
		}
		span {
			float: right;
			font-size: 18px;
			width: 20px;
			height: 20px;
			padding: 4px;
			border-radius: 25%;
			text-align: center;
			cursor: pointer;
		}
		span:hover {
			background-color: #ccc;
		}
	`;

	@property({
		type: Object,
		attribute: "blog",
	})
	blog: BlogPost | null = null;

	connectedCallback(): void {
		super.connectedCallback();
		console.log(`Blog with id ${this.blog?.id} rendered`);
	}

	async deleteBlog(id: number): Promise<void> {
		store.dispatch(await deleteBlogPost(id));
	}

	setEditId(id: number): void {
		store.dispatch(setEditId(id));
	}

	render() {
		return html`<li name="list-item">
			<b>${this.blog?.title}</b>
			<span
				name="list-item-delete"
				@click="${() => this.deleteBlog(this.blog?.id || 0)}"
			>
				❌
			</span>
			<span
				name="list-item-edit"
				@click="${() => this.setEditId(this.blog?.id || 0)}"
			>
				✏️
			</span>
			<p>${this.blog?.description}</p>
		</li>`;
	}
}
