import { Observable } from 'rxjs';

export function ObservableToPromise<T, R = T>(observable: Observable<R>, resolver?: (x: R) => T): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    observable.subscribe({
      next: resolver ? x => resolve(resolver(x)) : () => resolve(null),
      error: err => reject(err),
    });
  });
}
