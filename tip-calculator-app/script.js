const billInput = document.querySelector('#bill')
const tipPercentElement = document.querySelectorAll('.input-radio')
const customTipInput = document.querySelector('#custom-tip')
const numberOfPeopleInput = document.querySelector('#nop')
const tipAmountPriceElement = document.querySelector('#tip-amount-price')
const totalPriceElement = document.querySelector('#total-price')
const resetButton = document.querySelector('.btn')

const errorMessages = document.querySelectorAll('.message')

billInput.addEventListener('input', (e) => {
  printErrorMessage(e, errorMessages[0])
  calculate()
})

tipPercentElement.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    customTipInput.value = ''
    customTipInput.classList.remove('error')
    errorMessages[1].classList.remove('error')

    calculate()
  })
})

customTipInput.addEventListener('focus', (e) => {
  tipPercentElement.forEach((elem) => {
    elem.checked = false
  })
})

customTipInput.addEventListener('input', (e) => {
  printErrorMessage(e, errorMessages[1])

  calculate()
})

numberOfPeopleInput.addEventListener('input', (e) => {
  printErrorMessage(e, errorMessages[2], true)
  calculate()
})

resetButton.addEventListener('click', () => {
  errorMessages.forEach((elem) => elem.classList.remove('error'))

  billInput.value = ''
  billInput.classList.remove('error')

  tipPercentElement.forEach((elem) => (elem.checked = false))

  customTipInput.value = ''
  customTipInput.classList.remove('error')

  numberOfPeopleInput.value = ''
  numberOfPeopleInput.classList.remove('error')

  tipAmountPriceElement.textContent = '0.00'
  totalPriceElement.textContent = '0.00'
})

// return bill, tip percentage, number of people
function getValue() {
  let tipValue = customTipInput.value

  if (tipValue === '') {
    tipPercentElement.forEach((elem) => {
      if (elem.checked) {
        tipValue = elem.value
      }
    })
  }

  if (
    billInput.value === '' ||
    numberOfPeopleInput.value === '' ||
    tipValue === ''
  )
    return

  return {
    bill: billInput.value,
    people: numberOfPeopleInput.value,
    tip: tipValue,
  }
}

// print result
function calculate() {
  tipAmountPriceElement.textContent = '0.00'
  totalPriceElement.textContent = '0.00'

  const values = getValue()
  if (!values) return

  const ready = isReady()
  if (!ready) return

  const tipAmount = (values.bill / values.people) * (values.tip / 100)
  const total = values.bill / values.people + tipAmount

  tipAmountPriceElement.textContent = Math.floor(tipAmount * 100) / 100
  totalPriceElement.textContent = Math.round(total * 100) / 100
}

// print error message
function printErrorMessage(e, message, real) {
  e.target.classList.remove('error')
  message.classList.remove('error')

  const errorMessage = getErrorMessage(e.target.valueAsNumber, real)

  if (errorMessage) {
    e.target.classList.add('error')
    message.classList.add('error')
    message.textContent = errorMessage
  }
}

function getErrorMessage(value, real) {

  if (isNaN(value)) {
    return 'Must be number'
  }

  const number = parseFloat(value)

  if (number < 0) {
    return 'Must be positive number'
  }

  if (number === 0) {
    return "Can't be zero"
  }

  if (real && /\D+/g.test(number)) {
    return 'Must be real number'
  }
}

function isReady() {
  const inputs = document.querySelectorAll('.input-number')

  for (const elem of inputs) {
    if (elem.classList.contains('error')) {
      return false
    }
  }

  return true
}
