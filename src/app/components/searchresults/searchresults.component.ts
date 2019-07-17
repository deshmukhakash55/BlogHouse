import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { BlogSearchResult } from 'src/app/models/BlogSearchResult';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  public text: string;
  blogs: BlogSearchResult[];

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
          this.text = params.text;
      }
    );

    this.blogService.searchBlogByText(this.text).subscribe( (data: BlogSearchResult[]) => {
      this.blogs = data;
    });

  }

}
