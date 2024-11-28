import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {Chart} from 'node_modules/chart.js/auto';
import _default from "chart.js/dist/plugins/plugin.legend";
import labels = _default.defaults.labels;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./../../admin.component.css']
})
export class DashboardComponent implements OnInit {
  showEditProfile!: boolean
  arr: any[] = [2, 3, 4, 5, 6];
  pieOptions: any
  totalToday: number | undefined
  countObject = {
    userCount: 0,
    saleCount: 0,
    orderCount: 0,
    orderFinishCount: 0
  }

  constructor(private dashboardService: DashboardService) {
  }

  orderCountData: any = []


  ngOnInit(): void {
    this.initCount();
    this.initChart()
    this.reportOrderCount()
    // this.initCountToday();
  }

  initCount = () => {
    this.dashboardService.getCount().subscribe(
      (response) => {
        this.countObject = response;
      }
    )
  }

  // initCountToday() {
  //   let data = {
  //     dateToday: new Date()
  //   }
  //   this.dashboardService.dateTodayOrderCount(data).subscribe(res => {
  //     this.totalToday = res;
  //   })
  // }

  initChart() {

    this.pieOptions = {
      title: {
        text: ""
      },
      animationEnabled: true,
      axisY: {
        includeZero: true
      },
      data: [{
        type: "pie", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        dataPoints: [
          {x: 10, y: 71},
          {x: 20, y: 55},
          {x: 30, y: 50},
          {x: 40, y: 65},
          {x: 50, y: 71},
          {x: 60, y: 92, indexLabel: "Highest\u2191"},
          {x: 70, y: 68},
          {x: 80, y: 38, indexLabel: "Lowest\u2193"},
          {x: 90, y: 54},
          {x: 100, y: 60}
        ]
      }]
    }
  }

  reportOrderCount() {

    this.dashboardService.reportOrderCount('2023').subscribe(
      (response) => {
        let labels = response.map((item: { month: any; }) => item.month)
        let datas = response.map((item: {
          quantity: any;
          month: any;
        }) => item.quantity)

        let colors = response.map(() => this.dynamicColors())
        this.initLineChart(labels, datas, colors)

        let percents = response.map((item: {
          quantity: any;
          month: any;
        }) => item.quantity * 100 / this.countObject.orderCount)
        this.initPercentOrderChart(labels, percents, colors)

      }
    )
  }

  initLineChart = function (label: any, datas: any, colors: any) {
    const data = {
      labels: label,
      datasets: [{
        label: 'Số lượng',
        data: datas,
        fill: false,
        backgroundColor: colors,
        tension: 1,
      }]
    };
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            }
          },
        }
      },
    };
    // @ts-ignore
    const lineChart = new Chart('orderChart', config);
  }

  initPercentOrderChart = (label: any, datas: any, colors: any) => {
    const data = {
      labels: label,
      datasets: [{
        label: 'Phần trăm',
        data: datas,
        fill: false,
        backgroundColor: colors,
        tension: 1,
      }]
    };
    const config = {
      type: 'pie',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            }
          },
        }
      },
    };
    // @ts-ignore
    const lineChart = new Chart('percentOrderChart', config);
  }

  dynamicColors = function () {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };
}
