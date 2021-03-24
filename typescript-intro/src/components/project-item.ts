import {Draggable} from '../models/drag-drop.js';
import { bindThis } from '../decorators/autobind.js';
import { DOMComponent } from './base-component.js';
import { Project } from '../models/project.js';

export class ProjectItem extends DOMComponent<HTMLUListElement, HTMLLIElement> implements Draggable {
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

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler)
    }

    renderProjectItem() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}