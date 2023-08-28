import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = "http://localhost:3000/produtos";
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http:HttpClient) { }

  addProduto(produto:any):Observable<any>{
    return this.http.post(url, produto);
  }
  getAllProdutos():Observable<any>{
    return this.http.get(url);
  }
  deleteProduto(id:number):Observable<any>{
    return this.http.delete(`${url}/${id}`);
  }
  updateProduto(id:number,date:any):Observable<any>{
    return this.http.put(`${url}/${id}`,date);
  }
}
