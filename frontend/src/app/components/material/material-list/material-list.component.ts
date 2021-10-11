import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {
  public page = 0;
  public materials: any[];
  public collectionSize: number = 0;
  public authorUID = localStorage.getItem("uid");

  constructor(private router: Router, private materialService: MaterialService) { }

  public ngOnInit(): void {
    this.materialService.getMaterialsByAuthor(this.authorUID).subscribe(data => {
      this.materials = data.content;
      this.collectionSize = data.totalElements;       
    });
  }

  public goToCreate(): void {
    this.router.navigate(['cadastrar']);
  }

  public onPageChange(pageNum: number): void {
    this.materialService.getMaterialsByAuthorWithPagination(pageNum-1, this.authorUID).subscribe(data => {
      this.materials = data.content;
      if (data.content.length <= 8) {
        document.getElementById("breadcrumb")?.scrollIntoView();
      }  
    });
  }

}
