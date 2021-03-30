import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() selectedHeader = new EventEmitter<string>()

    selectHeader(header: string) {
        this.selectedHeader.emit(header)
    }
}