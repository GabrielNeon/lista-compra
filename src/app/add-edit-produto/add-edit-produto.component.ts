import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoService } from '../server/produto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-produto',
  templateUrl: './add-edit-produto.component.html',
  styleUrls: ['./add-edit-produto.component.css']
})
export class AddEditProdutoComponent implements OnInit {

  produtoForm: FormGroup;
  constructor(private fb: FormBuilder, private service: ProdutoService,
    private dialogref: MatDialogRef<AddEditProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.produtoForm = this.fb.group({
      nomeProduto: '',
      quantidade: '',
      preco: '',
      dataValidade: ''
    });
  }


  ngOnInit(): void {
    this.produtoForm.patchValue(this.data);
  }

  onProdutoSubmit() {
    if (this.produtoForm.valid) {
      if (this.data) {
        this.service.updateProduto(this.data.id, this.produtoForm.value).subscribe(this.response());
      } else {
        this.service.addProduto(this.produtoForm.value).subscribe(this.response());
      }
    }
  }

  private response() {
    return {
      next: (val: any) => {
        console.log(this.produtoForm.value);
        this.dialogref.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    };
  }
}
