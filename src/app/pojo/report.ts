export class New {
  time:any[]=[];
  cols:any[]=[];
  rows:any[]=[];
  grids:any[]=[];
  grids2:any[]=[];
  name:any[]=[];
}

export class Dbtime {
  module_name: string;
  result_time: string;
}

export class Aver_Integrity {
  module_name:any[] = [];
  // rate_full_rows:any;
  // rate_null_cols:any;
  // rate_null_grids:any;
  // rate_null_grids2:any;
  result_time:any[] = [];
  op_data:any[] = [];
  cols:any[]=[];
  rows:any[]=[];
  grids:any[]=[];
  grids2:any[]=[];
}

export class Integrity {
  id: string;
  module_id: string;
  module_name:string;
  num_cols:any;
  num_full_cols:any;
  num_full_rows:any;
  num_grids:any
  num_non_full_cols:any;
  num_non_full_rows:any;
  num_null_cols:any;
  num_null_grids:any;
  num_rows:any;
  rate_full_rows:any;
  rate_null_cols:any;
  rate_null_grids:any;
  rate_null_grids2:any;
  result_time:any;
  table_name:any;

}
export class Redundancydata {
  modulename: any [] = [];
  resulttime: any[] = [];
  avg: any[] = [];
  count: any[] = [];
}
export class DbRedundancydata {
  result_time: any[] = [];
  avg_rate_a: any[]=[];
  count: any [] = [];
}

export class TableRedundancy {
  id: string;
  len_col_names_a: string;
  len_col_names_b: string;
  lv_distance: string;
  module_id: string;
  module_name: any [] = [];
  num_cols_a: string;
  num_cols_b: string;
  num_same_cols: string;
  rate_a: string;
  rate_b: string;
  table_a: string;
  table_b: string;
}
export class Modulelist {
  module_name: any [] = [];
}

