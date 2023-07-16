import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.css']
})
export class EnquiryListComponent implements OnInit {
  enquiryList: any[] = [];
  enquiryColumns: string[] = [];
  listUrl: string = `${environment.baseUrl}list`;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEnquiryList();
  }

  getEnquiryList() {
    this.http.get(this.listUrl).subscribe((results: any) => {
      if (results.length) {
        this.enquiryList = results.slice();
        this.enquiryColumns = Object.keys(results[0]).filter(column => (column !== 'travel_id' && column !== 'createdDate'));
        console.log('list', this.enquiryList);
        console.log('columns', this.enquiryColumns);
      }
    })
  }

  getTimeAgo(date: number) {
    const seconds = Math.floor((Date.now() - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (seconds < 60) {
      return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
    }
    if (minutes < 60) {
      return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    }
    if (hours < 24) {
      return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    }
    if (days < 30) {
      return days + (days === 1 ? ' day ago' : ' days ago');
    }
    if (months < 12) {
      return months + (months === 1 ? ' month ago' : ' months ago');
    }
    return years + (years === 1 ? ' year ago' : ' years ago');
  }
}
