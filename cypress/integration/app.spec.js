const MOCK_BLOGS = [
	{
		id: 3,
		title: 'Test bericht',
		description: 'Dit is het eerste test bericht...'
	},
	{
		id: 2,
		title: 'Test bericht 2',
		description: 'Dit is het tweede test bericht'
	},
	{
		id: 3,
		title: 'Test bericht 3',
		description: 'Dit is het derde test bericht.'
	}
];

describe('Blog app', () => {
	beforeEach(() => {
		cy.intercept(
			{
				method: 'GET',
				url: 'http://localhost:3000/api/blogs'
			},
			{
				statusCode: 200,
				body: MOCK_BLOGS
			}
		).as('getBlogs');

		cy.visit('http://localhost:8000');
	});

	it('Shows application', () => {
		cy.get('#app-title').should('contain', 'Super coole blog app');
	});

	describe('Gets blogs', () => {
		it('and succeeds', () => {
			cy.wait('@getBlogs');

			cy.get('li[name="list-item"]').should('have.length', 3);
		});

		it('with error', () => {
			cy.intercept(
				{
					method: 'GET',
					url: 'http://localhost:3000/api/blogs'
				},
				{
					statusCode: 500,
					body: MOCK_BLOGS
				}
			).as('getBlogs');

			cy.visit('http://localhost:8000');

			cy.get('#error-message').should(
				'contain',
				'Er ging iets fout bij het ophalen'
			);
		});
	});

	describe('Adds blog', () => {
		it('and succeeds', () => {
			cy.intercept(
				{
					method: 'POST',
					url: 'http://localhost:3000/api/blogs'
				},
				{
					statusCode: 200,
					body: {}
				}
			).as('postBlog');

			const TITLE = '[Cypress] test blog';
			cy.get('#title-input').type(TITLE).should('have.value', TITLE);

			const DESCRIPTION = 'Deze tekst is getypt door cypress';
			cy.get('#desc-input')
				.type(DESCRIPTION)
				.should('have.value', DESCRIPTION);

			cy.get('#form-submit').click();

			cy.wait('@postBlog').its('request.body').should('deep.equal', {
				title: TITLE,
				description: DESCRIPTION
			});
		});

		it('with no values', () => {
			cy.get('#form-submit').click();

			cy.get('#error-message').should(
				'contain',
				'Niet alle waardes gevuld'
			);
		});

		it('with error', () => {
			cy.intercept(
				{
					method: 'POST',
					url: 'http://localhost:3000/api/blogs'
				},
				{
					statusCode: 500,
					body: {}
				}
			).as('postBlog');

			const TITLE = '[Cypress] test blog';
			cy.get('#title-input').type(TITLE).should('have.value', TITLE);

			const DESCRIPTION = 'Deze tekst is getypt door cypress';
			cy.get('#desc-input')
				.type(DESCRIPTION)
				.should('have.value', DESCRIPTION);

			cy.get('#form-submit').click();

			cy.wait('@postBlog');

			cy.get('#error-message').should(
				'contain',
				'Er ging iets fout bij het toevoegen'
			);
		});
	});

	describe('Edits blog', () => {
		it('and succeeds', () => {
			cy.intercept(
				{
					method: 'PUT',
					url: 'http://localhost:3000/api/blogs/**'
				},
				{
					statusCode: 200,
					body: {}
				}
			).as('putBlog');

			cy.get('span[name="list-item-edit"]').first().click();

			const EDIT = ' (edit)';

			const TITLE = `${MOCK_BLOGS[0].title}${EDIT}`;
			cy.get('#title-input')
				.should('have.value', MOCK_BLOGS[0].title)
				.type(' (edit)')
				.should('have.value', TITLE);

			const DESCRIPTION = `${MOCK_BLOGS[0].description}${EDIT}`;
			cy.get('#desc-input')
				.should('have.value', MOCK_BLOGS[0].description)
				.type(' (edit)')
				.should('have.value', DESCRIPTION);

			cy.get('#form-submit').click();

			cy.wait('@putBlog').its('request.body').should('deep.equal', {
				id: MOCK_BLOGS[0].id,
				title: TITLE,
				description: DESCRIPTION
			});
		});

		it('with error', () => {
			cy.intercept(
				{
					method: 'PUT',
					url: 'http://localhost:3000/api/blogs/**'
				},
				{
					statusCode: 500,
					body: {}
				}
			).as('putBlog');

			cy.get('span[name="list-item-edit"]').first().click();

			const EDIT = ' (edit)';

			const TITLE = `${MOCK_BLOGS[0].title}${EDIT}`;
			cy.get('#title-input')
				.should('have.value', MOCK_BLOGS[0].title)
				.type(' (edit)')
				.should('have.value', TITLE);

			const DESCRIPTION = `${MOCK_BLOGS[0].description}${EDIT}`;
			cy.get('#desc-input')
				.should('have.value', MOCK_BLOGS[0].description)
				.type(' (edit)')
				.should('have.value', DESCRIPTION);

			cy.get('#form-submit').click();

			cy.get('#error-message').should(
				'contain',
				'Er ging iets fout bij het aanpassen'
			);
		});
	});

	describe('Deletes blog', () => {
		it('and succeeds', () => {
			cy.intercept(
				{
					method: 'DELETE',
					url: 'http://localhost:3000/api/blogs/**'
				},
				{
					statusCode: 200,
					body: {}
				}
			).as('deleteBlog');

			cy.get('span[name="list-item-delete"]').first().click();

			cy.wait('@deleteBlog');
		});

		it('with error', () => {
			cy.intercept(
				{
					method: 'DELETE',
					url: 'http://localhost:3000/api/blogs/**'
				},
				{
					statusCode: 500,
					body: {}
				}
			).as('deleteBlog');

			cy.get('span[name="list-item-delete"]').first().click();

			cy.wait('@deleteBlog');

			cy.get('#error-message').should(
				'contain',
				'Er ging iets fout bij het verwijderen'
			);
		});
	});
});
