import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

      constructor(private appService: AppService) { }

      category: any;

      ngOnInit(): void {
        this.appService.getCategory().subscribe((res: any) => {
          this.category = res.categories;
        });
      }

}
