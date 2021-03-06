import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { connect } from "pwa-helpers";

import { store } from "../../store/index";
import { addBlogPost, editBlogPost } from "../../store/actions";
import { LogMixin } from "../../mixins/LogMixin";
import { BlogPost } from "../App/LitElementApp";

import "@lion/input/define";
import "@lion/button/define";
import "@lion/form/define";
import "@lion/dialog/define";
import "@lion/textarea/define";

@customElement("lit-element-form")
export class LitElementForm extends LogMixin(connect(store)(LitElement)) {
	static styles = css`
		.card {
			display: flex;
			align-items: center;
			font-family: Arial, Helvetica, sans-serif;
			width: 400px;
			padding: 16px;
			margin: 8px;
			border: 2px #333 solid;
			border-radius: 8px;
			height: 400px;
		}
		.card > div {
			width: 100%;
		}
		h2 {
			font-size: 24px;
			text-align: center;
		}
		lion-input label,
		lion-textarea label {
			margin: 6px;
			margin-bottom: 0px;
			font-weight: bold;
		}
		lion-input input,
		lion-textarea textarea {
			margin-top: 0px;
			margin: 6px;
			padding: 8px 12px;
			border-radius: 8px;
			border: 2px solid #ccc;
			font-family: Arial, Helvetica, sans-serif;
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
		div.error-message {
			color: red;
			text-align: center;
			font-weight: bold;
			width: 100%;
		}
	`;

	static properties = {
		title: { type: String },
		description: { type: String },
		errorMessage: { type: String },
		editId: { type: Number },
	};

	constructor() {
		super();
		this.title = "";
		this.description = "";
		this.errorMessage = "";
		this.editId = 0;
	}

	handleChange(target: any, type: string): void {
		if (type === "title") {
			this.title = target?.value;
		} else if (type === "description") {
			this.description = target?.value;
		}
		this.requestUpdate();
	}

	async handleSubmit(): Promise<void> {
		if (this.title === "" || this.description === "") {
			this.errorMessage = "Niet alle waardes gevuld";
			return;
		}

		if (this.editId) {
			const id = this.editId;
			const blogPost = {
				id,
				title: this.title,
				description: this.description,
			};
			store.dispatch(await editBlogPost(id, blogPost));
		} else {
			const blogPost = {
				title: this.title,
				description: this.description,
			};

			store.dispatch(await addBlogPost(blogPost));
		}

		this.title = "";
		this.description = "";
		this.editId = 0;
	}

	stateChanged({
		error,
		editId,
		blogs,
	}: {
		blogs: BlogPost[];
		error: string;
		editId: number | undefined;
	}): void {
		this.errorMessage = error;

		if (editId) {
			this.editId = editId;
			const blog = blogs.find((blog) => blog.id === editId);
			this.title = blog?.title || "";
			this.description = blog?.description || "";
		}
	}

	render() {
		return html`
			<div id="lit-element-form-card" class="card">
				<div>
					<h2>Voeg blog toe</h2>
					${this.errorMessage
						? html`<div id="error-message" class="error-message">
								${this.errorMessage}
						  </div>`
						: null}
					<lion-form>
						<form>
							<lion-input
								id="title-input"
								name="titel"
								.modelValue=${this.title}
								@model-value-changed=${({ target }: any) =>
									this.handleChange(target, "title")}
								help-text="De titel van de blog"
							>
								<label slot="label"> Titel </label>
							</lion-input>
							<lion-textarea
								id="desc-input"
								name="beschrijving"
								rows="${6}"
								.modelValue=${this.description}
								@model-value-changed=${({ target }: any) =>
									this.handleChange(target, "description")}
								help-text="De Beschrijving van de blog"
							>
								<label slot="label"> Beschrijving </label>
							</lion-textarea>
						</form>
					</lion-form>
					<lion-button id="form-submit" @click="${this.handleSubmit}">
						Send
					</lion-button>
				</div>
			</div>
		`;
	}
}
