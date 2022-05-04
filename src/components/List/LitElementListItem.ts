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

	connectedCallback(): string {
		super.connectedCallback();
		const LOG_TEXT = `Blog with id ${this.blog?.id} rendered`;
		console.log(LOG_TEXT);
		return LOG_TEXT;
	}

	async deleteBlog(): Promise<void> {
		store.dispatch(await deleteBlogPost(this.blog?.id || 0));
	}

	setEditId(): void {
		store.dispatch(setEditId(this.blog?.id || 0));
	}

	render() {
		return html`<li name="list-item">
			<b>${this.blog?.title}</b>
			<span name="list-item-delete" @click="${this.deleteBlog}">
				❌
			</span>
			<span name="list-item-edit" @click="${this.setEditId}"> ✏️ </span>
			<p>${this.blog?.description}</p>
		</li>`;
	}
}
