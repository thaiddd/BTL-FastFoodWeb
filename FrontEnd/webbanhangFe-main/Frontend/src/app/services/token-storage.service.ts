import { Injectable } from '@angular/core';

// Quản lý phiên đăng nhập của user
const TOKEN_KEY = 'auth-token'; //key để lưu token trong sessionStorage
const USER_KEY = 'auth-user' //key để lưu thông tin user trong sessionStorage

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear(); //Xóa toàn bộ dữ liệu trong sessionStorage
                                    //gọi khi user đăng xuất
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY); //Xóa token cũ nếu có
    // Lưu token mới với key là TOKEN_KEY
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
  //Xóa thông tin user cũ
    // Chuyển đổi object user thành chuỗi JSON
    // Lưu vào sessionStorage với key là USER_KEY
  }

  public getUser(): any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user){
      return JSON.parse(user)
    }
    return {};
  }
}
