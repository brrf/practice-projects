import { Project } from '../models/project.js';
import { ProjectStatus } from '../models/project.js';
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

export const projectState = ProjectState.getInstance();