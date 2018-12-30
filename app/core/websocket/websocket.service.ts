import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

@Injectable()
export class WebsocketService {
    constructor() { }

    public connect(url): Subject<MessageEvent> {
        return this.create(url);
    }

    private create(url): Subject<MessageEvent> {
        const ws = new WebSocket(url);
        console.error('hey boy! new connexion at: ' + url)
        const observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            })
        const observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }
        return Subject.create(observer, observable);
    }
}
