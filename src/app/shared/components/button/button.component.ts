import { Component, Input, OnInit } from 'angular-ts-decorators';

@Component({
    selector: 'app-button',
    transclude: true,
    template: require('./button.component.html'),
    styles: [require('./button.component.scss')]
})
export class ButtonComponent implements OnInit {
    @Input() link: string;
    @Input() target = '_self';

    ngOnInit() {

    }
}
