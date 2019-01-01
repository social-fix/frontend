import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { AuthLogin, AuthLogout, CREATE_USER_SUCCESS, LOGOUT, routerTransition, SetUser } from '@app/core';
import { ResetHelpState, SetHostedHelps, SetJoinedHelps } from '@app/core/help/help.actions';
import { AnyHelp } from '@app/core/help/help.model';
import { HelpService } from '@app/core/help/help.service';
import { environment as env } from '@env/environment';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { HelpState } from './core/help/help.reducer';
import { HelpCRUDService } from './core/websocket/help-crud.service';
import { LoginComponent } from './static/login/login.component';
import { RegisterComponent } from './static/register/register.component';


@Component({
    selector: 'sf-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routerTransition]
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('bottom')
    bottom: ElementRef;

    private componentDestroyed$: Subject<void> = new Subject<void>();

    @HostBinding('class') componentCssClass;

    isProd = env.production;
    envName = env.envName;
    version = env.versions.app;
    year = new Date().getFullYear();
    logo = require('../assets/logo.svg');
    navigation = [
        { link: 'about', label: 'About us' },
        { link: 'faq', label: 'F.A.Q.' },
        { link: 'security', label: 'Security' },
        { link: 'support', label: 'Support the project!' }

    ];
    navigationSideMenu = [
        ...this.navigation,
        { link: 'settings', label: 'Settings' }
    ];
    isAuthenticated;

    constructor(
        public overlayContainer: OverlayContainer,
        private store: Store<any>,
        private router: Router,
        private titleService: Title,
        private dialog: MatDialog,
        private dispatcher: ActionsSubject,
        private helpService: HelpService,
        private wsService: HelpCRUDService
    ) { }


    ngOnInit(): void {
        
        this.dispatcher.pipe(takeUntil(this.componentDestroyed$)).subscribe(
            (data) => {
                if (data.type === CREATE_USER_SUCCESS) {
                    this.router.navigateByUrl('/successfulRegistration');
                } else if (data.type === LOGOUT) {
                    this.router.navigateByUrl('/landing');
                }
            }
        );
        this.store
            .select('user')
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
        this.router.events
            .pipe(
                takeUntil(this.componentDestroyed$),
                filter(event => event instanceof ActivationEnd)
            )
            .subscribe((event: ActivationEnd) => {
                let lastChild = event.snapshot;
                while (lastChild.children.length) {
                    lastChild = lastChild.children[0];
                }
                const { title } = lastChild.data;
                this.titleService.setTitle(
                    title ? `${title} - ${env.appName}` : env.appName
                );
            });
    }

    ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    onLoginClick() {
        const dialogRef = this.dialog.open(LoginComponent, { panelClass: 'custom-dialog-container' });
        dialogRef.afterClosed().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
            if (data) {
                this.store.dispatch(new AuthLogin(data['token']));
                this.store.dispatch(new SetUser(data['user']));
                this.router.navigateByUrl('/dashboard');
                this.helpService.getByCriteria('getBySender').pipe(takeUntil(this.componentDestroyed$)).subscribe(
                    (helps: Array<AnyHelp>) => this.store.dispatch(new SetHostedHelps(helps)),
                    (error) => console.error(error)
                );
                this.helpService.getByCriteria('getIfIsGuest').pipe(takeUntil(this.componentDestroyed$)).subscribe(
                    (helps: Array<AnyHelp>) => this.store.dispatch(new SetJoinedHelps(helps)),
                    (error) => console.error(error)
                );
            }
        });
    }

    onRegisterClick() {
        if (this.router.url === '/landing') {
            this.bottom.nativeElement.scrollIntoView({ behavior: 'smooth' })
        } else {
            const dialogRef = this.dialog.open(RegisterComponent, { panelClass: 'custom-dialog-container' });
            dialogRef.componentInstance.submit.pipe(takeUntil(this.componentDestroyed$)).subscribe(
                () => {
                    dialogRef.close();
                }
            );
        }
    }

    onLogoutClick() {
        this.store.dispatch(new AuthLogout());
        this.store.dispatch(new ResetHelpState())
        this.router.navigateByUrl('/landing');
    }
}
