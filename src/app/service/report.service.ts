import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVERADDRESS} from '../settings';
import {HttpHeaders} from '@angular/common/http';
import {Dbtime} from '../pojo/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  // 返回所有评测时间的序列
  datetimeList(module: any): Observable<any> {
    const datetimeListUrl = SERVERADDRESS + '/report/datetimelist';
    return this.http.post(datetimeListUrl, module, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

// 返回完整性评价的数据库评估情况
  integrityOverview(dbtime: Dbtime): Observable<any> {
    const integrityoverviewUrl = SERVERADDRESS + '/report/integrity/overview';
    return this.http.post(integrityoverviewUrl, dbtime, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  // 返回完整性评价的各个表格评估情况
  integrityDetailtable(table: any): Observable<any> {
    const integritydetailtableUrl = SERVERADDRESS + '/report/integrity/detail_table';
    return this.http.post(integritydetailtableUrl, table, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  // 返回冗余度评价的数据库相似情况
  redundancyOverview(module: any): Observable<any> {
    const redundancyoverviewUrl = SERVERADDRESS + '/report/redundancy/overview';
    return this.http.post(redundancyoverviewUrl, module, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  // 返回冗余度评价的相似两表具体相似信息
  redundancyDetail(table: any): Observable<any> {
    const redundancydetailUrl = SERVERADDRESS + '/report/redundancy/detail';
    return this.http.post(redundancydetailUrl, table, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  //返回数据库详细信息
  modulelist(): Observable<any> {
    const modulelistUrl = SERVERADDRESS + '/module/list';
    return this.http.get(modulelistUrl, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
}
