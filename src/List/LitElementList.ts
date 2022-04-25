import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { store } from "../Store";
import { deleteBlogPost } from "../Store/actions";
import { BlogPost } from "../App/LitElementApp";
import { connect } from "pwa-helpers";

export class LitElementList extends connect(store)(LitElement) {
	static styles = css`
		.card {
			font-family: Arial, Helvetica, sans-serif;
			margin: 8px;
			padding: 16px;
			border: 2px solid #ccc;
			border-radius: 8px;
			width: 400px;
		}
		h3 {
			font-size: 24px;
			text-align: center;
		}
		ul {
			list-style-type: none;
		}
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
			width: 24px;
			height: 24px;
			border-radius: 25%;
			text-align: center;
			cursor: pointer;
		}
		span:hover {
			background-color: #ccc;
		}
	`;

	stateChanged(state: any) {
		this.blogs = state.blogs;
	}

	@property({
		type: Array,
	})
	blogs: BlogPost[] = [];

	deleteBlog(id: Number): void {
		store.dispatch(deleteBlogPost(id));
	}

	render() {
		return html`<div class="card">
			<h3>Lijst met blogs</h3>
			<ul>
				${this.blogs.map(
					(blog) =>
						html`<li>
							<b>${blog.title}</b
							><span @click="${() => this.deleteBlog(blog.id)}"
								>x</span
							>
							<p>${blog.description}</p>
						</li>`
				)}
			</ul>
		</div>`;
	}
}
