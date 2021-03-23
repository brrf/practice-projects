// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number
}

function validate(formInput: Validatable): Boolean {
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

function bindThis(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const adjMethod = originalMethod.bind(this)
            return adjMethod
        }
    }
    return adjDescriptor
}

class ProjectInput {
    templateElement: HTMLTemplateElement
    hostElement: HTMLDivElement
    element: HTMLFormElement
    titleInputEl: HTMLInputElement
    descriptionInputEl: HTMLInputElement
    peopleInputEl: HTMLInputElement

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        
        const elContent = document.importNode(this.templateElement.content, true);
        this.element = elContent.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement;

        this.configure()
        this.attach()
    }

    private getInputs(): [string, string, number] {
        const title = this.titleInputEl.value;
        const description = this.descriptionInputEl.value;
        const people = +this.peopleInputEl.value

        return [title, description, people]
    }

    private validateInput(inputs: Validatable[]): Boolean {
        return (!inputs
            .map(input => validate(input))
            .includes(false)
        )
    }

    @bindThis
    private handleSubmission(event: Event) {
        event.preventDefault();
        const [title, description, people] = this.getInputs()
        const titleValidatable: Validatable = {
            value: title,
            required: true, 
        }
        const descriptionValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: people,
            required: true,
            min: 1, 
            max: 5
        }
        if (!this.validateInput([titleValidatable, descriptionValidatable, peopleValidatable])) {
            alert('Invalid input, please try again!')
            return
        }
        console.log(title, description, people)
    }

    private configure() {
        this.element.addEventListener('submit', this.handleSubmission)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const projInput = new ProjectInput()