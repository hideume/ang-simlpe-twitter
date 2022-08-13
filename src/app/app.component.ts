import { Component , OnInit, ViewChild , ElementRef} from '@angular/core';
import { TwitterService } from './twitter.service';
import { TweetService } from './shared/tweet.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('in1',{static:true,read: ElementRef}) public in1:ElementRef;
  // login selfuser
  user;
  aptwsv;

  constructor(private twitter: TwitterService,private router:Router,
    private twsv:TweetService //これを指定しておかないとリロードする。
    ) {
      this.aptwsv=twsv;
    }

  ngOnInit() {
    this.twitter.user().subscribe(user => this.user = user.data);
  }

  clicked() {
    //console.log("clicked"+this.in1.nativeElement.value);
    //this.router.navigate(['/']);
    this.router.navigate(['/search',this.in1.nativeElement.value]);
  }

  tweet() {
    var msg = this.in1.nativeElement.value;
    this.twitter.tweet(msg)
    .subscribe(d=>{
      console.log("tweet ok");
      this.in1.nativeElement.value = "";
      //直ぐに表示を反映させようとしたが、直ぐには変更しないなあ・・
      this.aptwsv.getnewTweets();
    },
    e=>{console.log("tweet error")});
  }
}
