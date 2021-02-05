import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
Router
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        public toastController: ToastController,
        private storageService: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storageService.getItem('token')).pipe(
            switchMap(token => {
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                }
                
                if (!request.headers.has('Content-Type')) {
                    request = request.clone({
                        setHeaders: {
                            'Content-Type': 'application/json'
                        }
                    });
                }

                request = request.clone({
                    setHeaders: {
                        'X-Requested-With' : 'XMLHttpRequest',
                        'Accept' : 'application/json'
                    }
                })
                
                request = request.clone({
                    headers: request.headers.set('Accept', 'application/json')
                });
                
                return next.handle(request).pipe(
                    catchError((error: HttpErrorResponse) => {
                        console.log("Error", error);
                        if (error.status === 401) {
                            if (error.error.success === false) {
                                this.presentToast('No estás autorizado');
                            } else {
                                this.router.navigate(['login']);
                            }
                        }
                        else {
                            return throwError(error);
                        }
                    })
                );
            })
        );

        const token = localStorage.getItem('token');
        
        if (token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': token
                }
            });
        }
        
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });
        
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (error.error.success === false) {
                        this.presentToast('No estás autorizado');
                    } else {
                        this.router.navigate(['login']);
                    }
                }
                return throwError(error);
            }));
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }
}