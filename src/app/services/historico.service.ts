import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Historico } from '../models/Historico';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  constructor(private storage: Storage) { 
    
  }

  public async busca(texto) {
    let historico: Historico;
    await this.storage.get(texto).then(valor => {
      texto = valor;
    });
    return historico;
  }

}
