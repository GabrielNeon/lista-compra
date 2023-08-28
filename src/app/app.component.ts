import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProdutoComponent } from './add-edit-produto/add-edit-produto.component';
import { ProdutoService } from './server/produto.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lista-compra';

  displayedColumns: string[] = ['id',
    'nomeProduto',
    'quantidade',
    'preco',
    'dataValidade',
    'acao'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: ProdutoService) { }
  ngOnInit(): void {
    this.produtosLista();
  }
  openAddEdit() {
    const dialogAtual = this.dialog.open(AddEditProdutoComponent);
    dialogAtual.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.produtosLista();
        }
      }
    });
  }
  editarProduto(data: any) {
    const dialogAtual = this.dialog.open(AddEditProdutoComponent, {
      data
    });
    dialogAtual.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.produtosLista();
        }
      }
    });
  }
  produtosLista() {
    this.service.getAllProdutos().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (res) => {
        console.error(res);
      }
    });
  }

  deletarProduto(id: number) {
    this.service.deleteProduto(id).subscribe({
      next: (res) => {
        console.log(res);
        this.produtosLista();
      },
      error: (res) => {
        console.error(res);
      }
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
