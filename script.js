const categories = {
	Mobile: {
		subcategories: ['Firm Phone', 'Personal Phone'],
		questions: [...],
		resolutions: [...]
	},
	Printer: {
		subcategories: [...],
		questions: [...],
		resolutions: [...]
	},
	// Add more categories here
};

const select = document.getElementById('category');
const subcategoriesDiv = document.getElementById('subcategories');
const questionsDiv = document.getElementById('questions');
const resolutionDiv = document.getElementById('resolution');

select.addEventListener('change', (e) => {
	const category = categories[e.target.value];
	if (category) {
		const subcategoriesHTML = category.subcategories.map((subcat) => {
			return `<option value="${subcat}">${subcat}</option>`;
		}).join('');
		subcategoriesDiv.innerHTML = `<select id="subcategory">${subcategoriesHTML}</select>`;
	}
});

// Add mobile-specific logic here
if (window.matchMedia("(max-width: 768px)").matches) {
	// Hide navigation menu and use a dropdown instead
	const nav = document.querySelector('nav');
	const dropdown = document.createElement('select');
	nav.replaceWith(dropdown);
}

// Add Decision Tree logic here
const tree = document.getElementById('tree');
const categoriesList = tree.querySelector('ul');
categoriesList.addEventListener('click', (e) => {
	if (e.target.tagName === 'LI') {
		const category = e.target.querySelector('span').textContent;
		const subcategories = categories[category].subcategories;
		const subcategoriesHTML = subcategories.map((subcat) => {
			return `<li><span>${subcat}</span><ul>${getQuestionsHTML(category, subcat)}</ul></li>`;
		}).join('');
		e.target.innerHTML = `<span>${category}</span><ul>${subcategoriesHTML}</ul>`;
	}
});

function getQuestionsHTML(category, subcategory) {
	const questions = categories[category].questions[subcategory];
	return questions.map((question) => {
		return `<li><span>${question}</span><ul>${getResolutionsHTML(category, subcategory, question)}</ul></li>`;
	}).join('');
}

function getResolutionsHTML(category, subcategory, question) {
	const resolutions = categories[category].resolutions[subcategory][question];
	return resolutions.map((resolution) => {
		return `<li><span>${resolution}</span></li>`;
	}).join('');
}
