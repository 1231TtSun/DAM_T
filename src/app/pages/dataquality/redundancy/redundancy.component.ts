import 'hammerjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReportService} from '../../../service/report.service';
import { Component, OnInit,AfterViewInit, ViewChild,OnDestroy} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Dbtime, DbRedundancydata, TableRedundancy, Redundancydata, Modulelist} from '../../../pojo/report';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-redundancy',
  templateUrl: './redundancy.component.html',
  styleUrls: ['./redundancy.component.css'],
  providers: [ReportService],
})

export class RedundancyComponent implements OnInit  {
  current = 1;
  panelOpenState = false;
  isVisible = false;
  tableoverviews: any;
  tablelists: any;
  dataSource: MatTableDataSource<TableRedundancy>;

  data: any;
  options: any;
  themeSubscription: any;

  dbtime2 = {
    module_name: 'pms', result_time: 'history'
  };
  selectedValue = {
    module_name: "pms", result_time: "2019-09-17 03:11:55"
  };
  // 表细节相似度“展示出带排序分页的表格”
  @ViewChild('ta', {static: false}) ta: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // 固定表头名
  displayedColumns: string[] = [ 'table_a', 'table_b','lv_distance','num_cols_a','num_cols_b' ,'num_same_cols'];
  // 表全貌的图展示 echarts
  public option: {};
  public option1: {};
  public echartsIntance;
  n: any;
  m: any;
  relisttime:any;
  // db、overview表示表全貌获取数据，modulelista、modulelisto表示表细节获取数据
  resultlistdb: Array<DbRedundancydata> = [];
  redundancyoverview: DbRedundancydata = new DbRedundancydata();
  modulelista: Array <Modulelist> = [];
  modulelisto: Modulelist = new Modulelist();


  // 查询按钮方法 表细节服务方法的接入
  onSubmit(value: Dbtime) {
    console.log('you submitted value: ', value);
    console.log(this.selectedValue);
    this.reportService.redundancyDetail(this.selectedValue)
      .subscribe((tablelists) => {
        console.log(tablelists);
        this.tablelists = tablelists.result_list;
        this.dataSource = new MatTableDataSource(tablelists.result_list);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  // redundancyDetail(dbtime) {
  //   this.reportService.redundancyDetail(dbtime)
  //     .subscribe((tablelists) => {
  //       console.log(tablelists);
  //       this.tablelists = tablelists.result_list;
  //       this. resultlisttable = tablelists.result_list;
  //       for (let i = 0; i < this.n; i++) {
  //         if (i === 0) {
  //           this.redundancydetail.module_name.push(this.resultlisttable[i].module_name);
  //         } else {
  //           if (this.resultlisttable[i].module_name !== this.resultlisttable[i - 1].module_name) {
  //             this.redundancydetail.module_name.push(this.resultlisttable[i].module_name);
  //           }
  //         }
  //       }
  //     });
  // }
  //数据库的库名获取
  getModulelist(){
    this.reportService.modulelist()
      .subscribe((modulelists) => {
            console.log(modulelists);
            this.modulelista = modulelists.module_list;
            this.m = modulelists.module_list.length;
            for (let i = 0; i < this.m; i++) {
                this.modulelisto.module_name.push(this.modulelista[i].module_name);
            }
          });
  }
// 表全貌服务的接入
  redundancyOverview(dbtime) {
    this.reportService.redundancyOverview(dbtime)
      .subscribe((tableoverviews) => {
        console.log(tableoverviews);
        this.tableoverviews = tableoverviews.result_list;
        this.n = tableoverviews.result_list.length;
        this.resultlistdb = tableoverviews.result_list;
        for (let i = 0; i < this.n; i++) {
          this.redundancyoverview.result_time.push(this.resultlistdb[i].result_time);

          this.redundancyoverview.avg_rate_a.push(this.resultlistdb[i].avg_rate_a);
          this.redundancyoverview.count.push(this.resultlistdb[i].count);
          // if (i === 0) {
          //   this.redundancydetail.module_name.push(this.resultlisttable[i].module_name);
          // } else {
          //   if (this.resultlisttable[i].module_name !== this.resultlisttable[i - 1].module_name) {
          //     this.redundancydetail.module_name.push(this.resultlisttable[i].module_name);
          //   }
          // }
        }
        console.log(this.redundancyoverview.result_time);
        // 模态框echarts
        //         this.option = {
        //           title: {
        //             // text: '详情'
        //           },
        //           tooltip: {
        //             trigger: 'axis'
        //           },
        //           legend: {
        //             data: ['相似度', '总表数']
        //           },
        //           grid: {
        //             left: '7%',
        //             right: '4%',
        //             bottom: '3%',
        //             containLabel: true
        //           },
        //           toolbox: {
        //             feature: {
        //               saveAsImage: {}
        //             }
        //           },
        //           xAxis: {
        //             type: 'category',
        //             inverse: true,
        //             boundaryGap: false,
        //             axisLabel: {
        //               interval: 0,
        //               rotate: 30,
        //             },
        //             data: this.redundancyoverview.result_time,
        //             // data: [' 2019 17:19:37 GMT', ' 2019 03:11:55 GMT', ' 2019 11:36:25 GMT', ' 2019 16:35:19 GMT',
        //             //   ' 2019 11:36:25 GMT', ' 2019 16:35:19 GMT']
        //           },
        //           yAxis: {
        //             type: 'value',
        //           },
        //           series: [
        //             {
        //               name: '相似度',
        //               type: 'line',
        //               stack: '总量',
        //               // data: this. redundancyoverview.avg
        //               data: [120, 132, 101, 134, 90, 230, 210]
        //             },
        //             {
        //               name: '总表数',
        //               type: 'line',
        //               stack: '总量',
        //               // data: this. redundancyoverview.count,
        //               data: [220, 182, 191, 234, 290, 330, 310]
        //             },
        //           ]
        //         };
        //       }
        //     );
        // }
// 区域图
        this.option = {
          title: {
            text: '相似度'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : this.redundancyoverview.result_time,
              axisLabel :{
                interval: 0
              },
            }
          ],
          yAxis : [
            {
              type : 'value',
              splitLine:{
                show:false
              },
            }
          ],
          series : [
            {
              name:'相似度',
              type:'line',
              stack: '总量',
              itemStyle: {normal:{color:"#9696ff"}},
              areaStyle: {normal: {color:"#c4c4ff"}},
              data:this.redundancyoverview.avg_rate_a,
              // symbol:'none', //去掉折线图中的节点
              smooth: true  //true 为平滑曲线，false为直线
            }
          ]
        };


// 柱形图
        this.option1 = {
          title: {
            text: '总表数',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine:{
              show:false
            },
          },
          yAxis: {
            type: 'category',
            data: this.redundancyoverview.result_time,
          },
          series: [
            {
              name: '总表数',
              type: 'bar',
              data: this.redundancyoverview.count,
              itemStyle: {
                normal: {
                  // 随机显示
                  //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                  // 定制显示（按顺序）
                  color: function(params) {
                    var colorList = ["#c4c4ff","#b1b1ff","#8989ff","#9696ff","#6262ff","#c4c4ff","#4e4eff","#3b3bff","#2727ff","#1414ff"];
                    return colorList[params.dataIndex]
                  }
                },
              },
            },
          ]
        };
      })
  }

  // 模态框的控制函数
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  constructor(private reportService: ReportService) {

  }

  ngOnInit() {
    this.redundancyOverview(this.dbtime2);
    this.getModulelist();
    this.onSubmit(this.selectedValue )
  }
}

