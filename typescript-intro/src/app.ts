type Listener = (projects: Project[]) => void;

class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {}

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);
        this.projects.push(newProject)
        this.notifyListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
        }
        this.notifyListeners();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance;
    }

    private notifyListeners() {
        this.listeners.forEach(listener => {
            listener([...this.projects])
        })
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn)
    }
}

const projectState = ProjectState.getInstance();

enum ProjectStatus {ACTIVE, FINISHED}

class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus
    ) {}
}

// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number
}

// Drag & Drop Interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
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

abstract class DOMComponent<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement
    hostElement: T
    element: U

    constructor(templateId: string, hostElementId: string, insertAtBeginning: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const elContent = document.importNode(this.templateElement.content, true);
        this.element = elContent.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtBeginning)
    }

    private attach(insertAtBeginning: Boolean): void {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
    }
}

class ProjectList extends DOMComponent<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[] = [];
    
    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = []
        this.configure()
        

        this.customizeElement()
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.ACTIVE
                }
                return prj.status === ProjectStatus.FINISHED
            });
            this.renderProjects();
        });
    }

    @bindThis
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
        
    }

    @bindThis
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    @bindThis
    dropHandler(event: DragEvent) {
        const projId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projId, this.type === 'active'? ProjectStatus.ACTIVE : ProjectStatus.FINISHED)
    }

    renderProjects(): void {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        this.assignedProjects.forEach((project: Project) => {
           new ProjectItem(this.element.querySelector('ul')!.id, project)
        })
    }

    private customizeElement(): void {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}

class ProjectItem extends DOMComponent<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    get persons() {
        return this.project.people === 1 ? '1 person' : `${this.project.people} persons`
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id)
        this.project = project;
        this.configure();
        this.renderProjectItem();
    }

    @bindThis
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @bindThis
    dragEndHandler(_: DragEvent) {

    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragstart', this.dragEndHandler)
    }

    renderProjectItem() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

class ProjectInput extends DOMComponent<HTMLDivElement, HTMLFormElement>{
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

const projInput = new ProjectInput()
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');