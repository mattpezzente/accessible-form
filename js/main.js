let priceItem
let priceTotal 

function buildForm() {
	const overlay = document.querySelector('.overlay')
	if (overlay.style.display == "none") {
		const formInputs = document.querySelectorAll('.product-user-info input')
		const country = document.querySelector('select')
		const sizes = document.querySelectorAll('.lbl-size input')
		const colors = document.querySelectorAll('.lbl-color input')
		const pItem = document.querySelectorAll('.price-item')
		priceTotal = 0
		priceItem = 0

		formInputs.forEach(input => {
			if (input.getAttribute('name') == 'fullname') {
				document.querySelector('.checkout-fname').innerHTML = input.value
			}
			if (input.getAttribute('name') == 'address') {
				document.querySelector('.checkout-faddress').innerHTML = input.value	
			}
			if (input.getAttribute('name') == 'city') {
				document.querySelector('.checkout-fcity').innerHTML = input.value
			}
			if (input.getAttribute('name') == 'state') {
				document.querySelector('.checkout-fstate').innerHTML = input.value
			}
			if (input.getAttribute('name') == 'zip') {
				document.querySelector('.checkout-fzip').innerHTML = input.value
			}		
		})
		if (country.value != 0) {
			document.querySelector('.checkout-fcountry').innerHTML = country.value
		}
//////////
		sizes.forEach(size => {
			if (size.checked) {
				if (size.parentElement.classList.contains('sm')) {
					priceItem += 20.00
				}
				if (size.parentElement.classList.contains('md')) {
					priceItem += 25.00
				}
				if (size.parentElement.classList.contains('lg')) {
					priceItem += 30.00
				}
			}
		})

		colors.forEach(color => {
			if (color.checked) {
				if (color.parentElement.classList.contains('red')) {
					priceItem += 1.5
				}
				if (color.parentElement.classList.contains('green')) {
					priceItem += 2.00
				}
				if (color.parentElement.classList.contains('blue')) {
					priceItem += 2.50
				}
				if (color.parentElement.classList.contains('yellow')) {
					priceItem += 1.75
				}
			}
		})

		pItem.forEach(p => {
			p.innerHTML = `$${priceItem}`
		})

		if (country.value != "US" && country.selectedIndex > 0) {
			priceTotal += 3.75
			document.querySelector('.checkout-price-shipping').innerHTML = "$3.75"
		}
		else {
			document.querySelector('.checkout-price-shipping').innerHTML = "Free"
			priceShipping = 0.00
		}
		priceTotal += priceItem
		document.querySelector('.checkout-price-total').innerHTML = `$${priceTotal}`
//////////
		overlay.style.display = 'block'
	}
	else {
		overlay.style.display = 'none'
	}
}

function updateAddress() {
	const formInputs = document.querySelectorAll('.product-user-info input')
	const country = document.querySelector('select')

	formInputs.forEach(input => {
		if (input.getAttribute('name') == 'fullname') {
			document.querySelector('.fname').innerHTML = input.value
		}
		if (input.getAttribute('name') == 'address') {
			document.querySelector('.faddress').innerHTML = input.value	
		}
		if (input.getAttribute('name') == 'city') {
			document.querySelector('.fcity').innerHTML = input.value
		}
		if (input.getAttribute('name') == 'state') {
			document.querySelector('.fstate').innerHTML = input.value
		}
		if (input.getAttribute('name') == 'zip') {
			document.querySelector('.fzip').innerHTML = input.value
		}		
	})
	if (country.value != 0) {
		document.querySelector('.fcountry').innerHTML = country.value
	}
}

function updatePrice() {
	const sizes = document.querySelectorAll('.lbl-size input')
	const colors = document.querySelectorAll('.lbl-color input')
	const country = document.querySelector('select')
	const pItem = document.querySelectorAll('.price-item')
	priceTotal = 0
	priceItem = 0

	sizes.forEach(size => {
		if (size.checked) {
			if (size.parentElement.classList.contains('sm')) {
				priceItem += 20.00
			}
			if (size.parentElement.classList.contains('md')) {
				priceItem += 25.00
			}
			if (size.parentElement.classList.contains('lg')) {
				priceItem += 30.00
			}
		}
	})

	colors.forEach(color => {
		if (color.checked) {
			if (color.parentElement.classList.contains('red')) {
				priceItem += 1.5
			}
			if (color.parentElement.classList.contains('green')) {
				priceItem += 2.00
			}
			if (color.parentElement.classList.contains('blue')) {
				priceItem += 2.50
			}
			if (color.parentElement.classList.contains('yellow')) {
				priceItem += 1.75
			}
		}
	})

	pItem.forEach(p => {
		p.innerHTML = `$${priceItem}`
	})

	if (country.value != "US" && country.selectedIndex > 0) {
		priceTotal += 3.75
		document.querySelector('.price-shipping').innerHTML = "$3.75"
	}
	else {
		document.querySelector('.price-shipping').innerHTML = "Free"
		priceShipping = 0.00
	}
	priceTotal += priceItem
	document.querySelector('.price-total').innerHTML = `$${priceTotal}`
}

class ValidateOptions {
	constructor() {
	}

	click(label) {
		if (!label.firstElementChild.checked) {
			label.style.opacity = 1
			label.firstElementChild.checked = true
			updatePrice()
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
			updateAddress()
		}
		else if (!input.parentElement.querySelector('.lbl-error')) {
			let errorHTML = `<label class="lbl-error">Error, ${input.validationMessage}</label>`
			input.insertAdjacentHTML('afterend', errorHTML)
			updateAddress()
		}
		else {
			if (input.parentElement.querySelector('.lbl-error')) {
				input.parentElement.querySelector('.lbl-error').innerHTML = `Error, ${input.validationMessage}`
			}
		}
	}

	select(select) {
		if(select.value != 0) {
			if (select.parentElement.querySelector('.lbl-error')) {
				select.parentElement.querySelector('.lbl-error').remove()
			}
			updateAddress()
			updatePrice()
		}
		else if (!select.parentElement.querySelector('.lbl-error')) {
			let errorHTML = `<label class="lbl-error">Error, please select a country</label>`
			select.insertAdjacentHTML('afterend', errorHTML)
			updateAddress()
			updatePrice()
		}
		else {
			if (select.parentElement.querySelector('.lbl-error')) {
				select.parentElement.querySelector('.lbl-error').innerHTML = `Error, please select a country`
			}
		}
	}

	clear(input) {
		if (input.parentElement.querySelector('.lbl-error')) {
			input.parentElement.querySelector('.lbl-error').remove()
		}
		updatePrice()
	}

	check() {
		const formInputs = document.querySelectorAll('.product-user-info input')
		const country = document.querySelector('select')

		formInputs.forEach(input => {
			if (input.value == "") {
				this.process(input)
				return false
			}		
		})
		if (country.value == 0) {
			this.select(country)
			return false
		}

		return true
	}
}

(() => {
	const productSizes = document.querySelectorAll('.lbl-size')
	const productColors = document.querySelectorAll('.lbl-color')
	const productUserInput = document.querySelector('.product-user-info')
	const userInputs = productUserInput.querySelectorAll('input')
	const userSelect = productUserInput.querySelector('select')
	const required = document.querySelectorAll('input[required], select[required]')
	const submitButton = document.querySelector('.submit-button')
	const overlay = document.querySelector('.overlay')
	const overlayButton = document.querySelector('.overlay-button')
	let vOpt = new ValidateOptions()
	let vForm = new ValidateForm()

	updatePrice()
	updateAddress()

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

	userSelect.addEventListener('change', () => {
		vForm.select(userSelect)
	})

	userInputs.forEach(input => {
		input.addEventListener('change', () => {
			vForm.process(input)
		})
	})

	userInputs.forEach(input => {
		input.addEventListener('input', () => {
			vForm.clear(input)
		})
	})

	required.forEach(req => {
		req.parentElement.classList.add('required')
	})

	overlayButton.addEventListener('click', buildForm)

	submitButton.addEventListener('click', e => {
		e.preventDefault()
		if (!vForm.check()) {

		}
		else {
			buildForm()
		}
	})


})();