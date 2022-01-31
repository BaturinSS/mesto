const getErrorMessage = inputElement => {return inputElement.validationMessage};

const showInputError = (formData, inputElement) => inputElement.classList.add(formData['inputErrorClass']);

const includeErrorText = (formData, inputElement) => {

  const formActive = inputElement.closest(formData['formSelector']);
  const inputError = formActive.querySelector(`.${inputElement.id}-error`);
  inputError.classList.add(formData['textErrorClass']);
  errorMessage = getErrorMessage(inputElement);
  inputError.textContent = errorMessage;
}

const hideInputError = (formData, inputElement) => inputElement.classList.remove(formData['inputErrorClass']);

const disableErrorText = (formData, inputElement) => {
  const formActive = inputElement.closest(formData['formSelector']);
  const inputError = formActive.querySelector(`.${inputElement.id}-error`);
  inputError.classList.remove(formData['textErrorClass']);
}

const deactivateButton = (formData, inputElement) => {
  const formActive = inputElement.closest(formData['formSelector']);
  const submitButton = formActive.querySelector(formData['submitButtonSelector']);
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(formData['inactiveButtonClass']);
}

const activationButton = (formData, inputElement) => {
  const formActive = inputElement.closest(formData['formSelector']);
  const submitButton = formActive.querySelector(formData['submitButtonSelector']);
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove(formData['inactiveButtonClass']);
}

const hasInvalidInput = (formData, inputElement) => {
  const formActive = inputElement.closest(formData['formSelector']);
  const inputsFormActive = Array.from(formActive.querySelectorAll(formData['inputSelector']));
  return inputsFormActive.some((inputElement) => {return !inputElement.validity.valid});
}

const changingButtonState = (formData, inputElement) => {
  const validityFormActive = hasInvalidInput(formData, inputElement);
  if (!validityFormActive) {
    activationButton(formData, inputElement);
  } else {
    deactivateButton(formData, inputElement);
  }
}

const isValid = (formData, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formData, inputElement);
    includeErrorText(formData, inputElement);
  } else {
    hideInputError(formData, inputElement);
    disableErrorText(formData, inputElement);
  }
  changingButtonState(formData, inputElement);
}

const enableValidation = (formData) => {
  const arrayForms = Array.from(document.querySelectorAll(formData['formSelector']));
  arrayForms.forEach(form => {
    const arrayInputsForm = Array.from(form.querySelectorAll(formData['inputSelector']));
    arrayInputsForm.forEach(inputElement => {inputElement.addEventListener('input', () => isValid(formData, inputElement));
  })
})
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  textErrorClass: 'popup__input-error_active'
})