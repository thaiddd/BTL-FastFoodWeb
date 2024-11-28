import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../common/user";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['../../admin.component.css']
})
export class TopbarComponent implements OnInit {
  user = new User()
  @Input() toggle: any
  @Output() toggleChange = new EventEmitter<any>()
  constructor(private tokenService: TokenStorageService,
              private userService: AuthService,
              private  router: Router,) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser()
    this.getUser();
  }

  onToggleChange() {
    this.toggle = !this.toggle;
    this.toggleChange.emit(this.toggle)
  }

  getUser() {
    this.userService.getById(this.user.id).subscribe(
      (response) => {
        this.user = response
      }
    )
  }

  logout() {
    this.router.navigate(['/login']).then((r) => {
      this.tokenService.signOut()
    })
  }
}
