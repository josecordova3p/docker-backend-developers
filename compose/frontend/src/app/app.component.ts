import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order } from './order.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  orderForm: FormGroup;
  orderPlaced: boolean = false;

  constructor (private http: HttpClient) {}

  ngOnInit() {
    this.orderForm = new FormGroup({
      product: new FormControl(''),
      quantity: new FormControl(''),
      unitPrice: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    const order: Order = {
      product: form.value.product,
      quantity: form.value.quantity,
      unitPrice: form.value.unitPrice
    };
    form.disable();
    console.log(environment);
    this.http.post(environment.API_BASE_URL + '/send', order, { responseType: 'text'}).subscribe(
      resp => {
        this.orderPlaced = true;
      }
    );
  }

  clearForm(form: FormGroup) {
    form.reset();
    form.enable();
    this.close();
  }

  close() {
    this.orderPlaced = false;
  }
}
