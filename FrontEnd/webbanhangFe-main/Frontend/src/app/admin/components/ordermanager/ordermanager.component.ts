import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ordermanager',
  templateUrl: './ordermanager.component.html',
  styleUrls: ['./ordermanager.component.css',
    "./../../admin.component.css"]
})
export class OrdermanagerComponent implements OnInit {
  orders: any = []
  loading = false
  pageSize: number = 10;
  totalItems: number = 0;
  toDate: Date | undefined;
  fromDate: Date | undefined;
  page: number = 0;

  constructor(private orderService: OrderService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initData()
  }

  initData() {
    this.loading = true
    let data={
      dateFrom:this.fromDate,
      dateTo:this.toDate
    }
    this.orderService.getAll(data).subscribe(
      (response) => {
        this.orders = response
        this.totalItems = this.orders.length;
        this.paginateData();
        this.loading = false
      },
      (error) => {
        this.loading = false
        this.toastr.error('Không thể kết nối đến server', 'Đã có lỗi xảy ra!');
      }
    )
  }

  onChangeTT(row: any) {
    if (row.state == "Done") {
      return "Hoàn Thành";
    }
    return "Chưa hoàn thành"
  }


  paginateData() {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.orders = this.orders.slice(start, end);
  }

  onChangePage(event: any) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.initData();
  }

  onFinish(id: any) {
    this.loading = true
    this.orderService.finish(id).subscribe(
      (response) => {
        this.loading = false
        this.toastr.success('Hoàn thành đơn hàng thàng công', 'Success!');
        this.initData()
      },
      (error) => {
        this.loading = false
        this.toastr.error('Không thể kết nối đến server', 'Đã có lỗi xảy ra!');
      }
    )
  }

  onRevoke(id: any) {
    this.loading = true
    this.orderService.revoke(id).subscribe(
      (response) => {
        this.loading = false
        this.toastr.success('Thu hồi đơn hàng thàng công', 'Success!');
        this.initData()
      },
      (error) => {
        this.loading = false
        this.toastr.error('Không thể kết nối đến server', 'Đã có lỗi xảy ra!');
      }
    )
  }

  protected readonly Date = Date;
}
