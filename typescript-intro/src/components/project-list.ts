import { DragTarget } from '../models/drag-drop';
import { bindThis } from '../decorators/autobind';
import { DOMComponent } from './base-component';
import { Project, ProjectStatus } from '../models/project';
import { ProjectItem } from './project-item';
import { projectState } from '../state/project-state';

export class ProjectList extends DOMComponent<HTMLDivElement, HTMLElement> implements DragTarget {
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