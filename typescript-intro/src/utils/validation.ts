export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number
}

export function validate(formInput: Validatable): Boolean {
    let isValid = true;
    if (formInput.required) {
        isValid = isValid && formInput.value.toString().trim().length !== 0;
    }
    
    if (formInput.minLength && typeof formInput.value === 'string') {
        isValid = isValid && formInput.value.length > formInput.minLength;
    }

    if (formInput.maxLength && typeof formInput.value === 'string') {
        isValid = isValid && formInput.value.length < formInput.maxLength;
    }

    if (formInput.min && typeof formInput.value === 'number') {
        isValid = isValid && formInput.value > formInput.min
    }

    if (formInput.max && typeof formInput.value === 'number') {
        isValid = isValid && formInput.value < formInput.max
    }   

    return isValid
}