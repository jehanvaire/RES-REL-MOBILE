import { BehaviorSubject, Observable } from "rxjs";

class FiltreService {
  private filtres = new BehaviorSubject<FiltreEntity>({} as FiltreEntity);

  public getFiltres(): Observable<FiltreEntity> {
    return this.filtres.asObservable();
  }

  public setFiltres(filtres: FiltreEntity): void {
    this.filtres.next(filtres);
  }
}

export default new FiltreService();
