import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../service/report.service';
import 'hammerjs';
import {Aver_Integrity, Dbtime, Integrity, New} from '../../../pojo/report';



@Component({
  selector: 'app-integrity',
  templateUrl: './integrity.component.html',
  styleUrls: ['./integrity.component.css']
})
export class IntegrityComponent implements OnInit {
  result_list: Array<Integrity> = [];
  aver_integrity: Aver_Integrity = new Aver_Integrity();
  n: number;

  selectedValue = {
    module_name: null, result_time: null
  };

  dime: Dbtime = {
    module_name: 'pms', result_time: 'history'
  };


  option:any;
  option2:{};
  d_result_list: Array<Integrity> = [];
  size = 'default';
  d_option:{};
  new: New=new New();
  m: any;
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }



  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.integrityOverview(this.dime)
      .subscribe(
        data => {
          console.log(data);
          this.n = data.result_list.length;
          this.result_list = data.result_list;
          for (let i = 0; i < this.n; i++) {
            this.aver_integrity.result_time.push(this.result_list[i].result_time);
            this.aver_integrity.cols.push(this.result_list[i].rate_null_cols);
            this.aver_integrity.rows.push(this.result_list[i].rate_full_rows);
            this.aver_integrity.grids.push(this.result_list[i].rate_null_grids);
            this.aver_integrity.grids2.push(this.result_list[i].rate_null_grids2);
            if (i == 0) {
              this.aver_integrity.module_name.push(this.result_list[i].module_name);
            }
            else {
              if (this.result_list[i].module_name != this.result_list[i - 1].module_name) {
                this.aver_integrity.module_name.push(this.result_list[i].module_name)
              }
            }
          }
          this.aver_integrity.op_data.push(this.result_list[0].rate_full_rows);
          this.aver_integrity.op_data.push(this.result_list[0].rate_null_cols);
          this.aver_integrity.op_data.push(this.result_list[0].rate_null_grids);
          this.aver_integrity.op_data.push(this.result_list[0].rate_null_grids2);
        },
        err => console.log(err),
        () => {
          console.log(this.result_list);
          console.log(this.aver_integrity);
          console.log(this.aver_integrity.op_data);
          this.option = {
            title: {
              text: '最新数据'
            },
            tooltip: {},
            legend: {
              data: ['比率']
            },
            xAxis: {
              data: ['满行比', '空列比', '空格/全表', '空格/去空列']
            },
            yAxis: {},
            series: [{
              name: '比率',
              type: 'bar',
              data:this.aver_integrity.op_data
            }]
          };
          this.option2 = {
            title: {
              text: '历史变化'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:['空列比','满行比','空格/全表','空格/去空列']
            },
            grid: {
              left: '25%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              inverse: true,
              boundaryGap: false,
              axisLabel: {
                interval: 0,
                rotate: 40,
              },
              data:this.aver_integrity.result_time
              // data: ['Mon, 16 Sep 2019 17:19:37 GMT','Tue, 17 Sep 2019 03:11:55 GMT','Mon, 23 Sep 2019 11:36:25 GMT','Wed, 25 Sep 2019 16:35:19 GMT']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name:'空列比',
                type:'line',
                stack: '总量',
                data:this.aver_integrity.cols
                // data:[0.0314345, 0.0314345, 0, 0.0314345]
              },
              {
                name:'满行比',
                type:'line',
                stack: '总量',
                data:this.aver_integrity.rows
                // data:[0.0621900, 0.0621900, 0, 0.0621900]
              },
              {
                name:'空格/全表',
                type:'line',
                stack: '总量',
                data:this.aver_integrity.grids
                // data:[0.275456,0.275456, 0, 0.275456]
              },
              {
                name:'空格/去空列',
                type:'line',
                stack: '总量',
                data:this.aver_integrity.grids2
                // data:[0.235245, 0.235245, 0, 0.235245]
              }
            ]
          };
        }
      );


  }

  onSubmit(value: Dbtime) {
    console.log('you submitted value: ', value);
    console.log(this.selectedValue);
    this.reportService.integrityOverview(this.selectedValue)
      .subscribe(
        data => {
          console.log(data);
          this.n = data.result_list.length;
          this.d_result_list = data.result_list;
          for (let i=0;i<this.n;i++){
            this.new.time.push(this.d_result_list[i].result_time)
            this.new.cols.push(this.d_result_list[i].rate_null_cols)
            this.new.rows.push(this.d_result_list[i].rate_full_rows)
            this.new.grids.push(this.d_result_list[i].rate_null_grids)
            this.new.grids2.push(this.d_result_list[i].rate_null_grids2)
          }
        },
        err => console.log(err),
        () => {
          console.log(this.d_result_list);
          this.d_option = {
            title: {
              text: '详情'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:['空列比','满行比','空格/全表','空格/去空列']
            },
            grid: {
              left: '15%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              inverse: true,
              boundaryGap: false,
              axisLabel: {
                interval: 0,
                rotate: 60,
              },
              data:this.new.time
              // data: ['Mon, 16 Sep 2019 17:19:37 GMT','Tue, 17 Sep 2019 03:11:55 GMT','Mon, 23 Sep 2019 11:36:25 GMT','Wed, 25 Sep 2019 16:35:19 GMT']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name:'空列比',
                type:'line',
                stack: '总量',
                data:this.new.cols
                // data:[0.0314345, 0.0314345, 0, 0.0314345]
              },
              {
                name:'满行比',
                type:'line',
                stack: '总量',
                data:this.new.rows
                // data:[0.0621900, 0.0621900, 0, 0.0621900]
              },
              {
                name:'空格/全表',
                type:'line',
                stack: '总量',
                data:this.new.grids
                // data:[0.275456,0.275456, 0, 0.275456]
              },
              {
                name:'空格/去空列',
                type:'line',
                stack: '总量',
                data:this.new.grids2
                // data:[0.235245, 0.235245, 0, 0.235245]
              }
            ]
          };
        }
      );

  }


}

