class ValidateAll {
	constructor() {

	}
}

class ValidateOptions {
	constructor() {
	}

	click(label) {
		if (!label.firstElementChild.checked) {
			label.style.opacity = 1
			label.firstElementChild.checked = true
		}
		this.check(label)
	}

	check(label) {
		let productSizes = document.querySelectorAll(`.${label.classList[0]}`)
		productSizes.forEach(label => {
			if (!label.firstElementChild.checked) {
				label.style.opacity = 0.5
			}
			else {
				label.style.opacity = 1
			}
		})
	}
}

class ValidateForm {
	constructor() {
	}

	process(input) {
		if(input.validity.valid) {
			if (input.parentElement.querySelector('.lbl-error')) {
				input.parentElement.querySelector('.lbl-error').remove()
			}
		}
		else if (!input.parentElement.querySelector('.lbl-error')) {
			let errorHTML = `<label class="lbl-error">Error, ${input.validationMessage}</label>`
			input.insertAdjacentHTML('afterend', errorHTML)
		}
		else {
			if (input.parentElement.querySelector('.lbl-error')) {
				input.parentElement.querySelector('.lbl-error').innerHTML = `Error, ${input.validationMessage}`
			}
		}
	}

	clear(input) {
		if (input.parentElement.querySelector('.lbl-error')) {
			input.parentElement.querySelector('.lbl-error').remove()
		}
	}
}

(() => {
	const productSizes = document.querySelectorAll('.lbl-size')
	const productColors = document.querySelectorAll('.lbl-color')
	let vOpt = new ValidateOptions()

	console.log(productColors)

	productSizes.forEach(label => {
		vOpt.check(label)
		label.addEventListener('click', () => {
			vOpt.click(label)
		})
	})

	productColors.forEach(label => {
		vOpt.check(label)
		label.addEventListener('click', () => {
			vOpt.click(label)
		})
	})


	const productUserInput = document.querySelector('.product-user-info')
	const userInputs = productUserInput.querySelectorAll('input')
	const required = document.querySelectorAll('input[required], select[required]')


	userInputs.forEach(input => {
		input.addEventListener('change', () => {
			new ValidateForm().process(input);
		})
	})

	userInputs.forEach(input => {
		input.addEventListener('input', () => {
			new ValidateForm().clear(input);
		})
	})

	required.forEach(req => {
		req.parentElement.classList.add('required')
	})

})();