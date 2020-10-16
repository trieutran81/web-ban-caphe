import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css',
  '../../assets/admin/assets/css/bootstrap.min.css',
  '../../assets/member/css/style.css',
  '../../assets/member/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../assets/member/css/lightbox.css',
  '../../assets/member/css/slider.css',
  '../../assets/member/css/util.css',
]
})
export class IndexComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  onGotoProductView(id) {
    this.router.navigate(["/product/view"], { queryParams: { id: id } });
  }
}
