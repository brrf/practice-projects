import { DOMComponent } from './base-component.js';
import { Validatable, validate} from '../utils/validation.js';
import { bindThis } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';


export class ProjectInput extends DOMComponent<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement
    descriptionInputEl: HTMLInputElement
    peopleInputEl: HTMLInputElement

    constructor() {
        super('project-input', 'app', true, 'user-input')
        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement;

        this.configure()
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
        projectState.addProject(title, description, people)
    }

    private configure() {
        this.element.addEventListener('submit', this.handleSubmission)
    }
}