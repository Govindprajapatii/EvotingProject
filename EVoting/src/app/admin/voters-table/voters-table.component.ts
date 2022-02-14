import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { VotersTableDataSource, VotersTableItem } from './voters-table-datasource';

@Component({
  selector: 'app-voters-table',
  templateUrl: './voters-table.component.html',
  styleUrls: ['./voters-table.component.scss']
})
export class VotersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<VotersTableItem>;
  dataSource: VotersTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','registrationDate','status','actions'];
  isBlockedVoters = false;
  isVarifyVoters = false;
  isAllVoters = true;
  constructor() {
    this.dataSource = new VotersTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onViewClick(){

  }
  onBlockClick(){
    
  }
  AllVoters(){
    this.isAllVoters = true;
    this.isVarifyVoters = false;
this.isBlockedVoters = false;
}
  BlockedVoters(){
    this.isAllVoters = false;
    this.isVarifyVoters = false;
this.isBlockedVoters = true;
  }
  VarifyVoters(){
    this.isAllVoters = false;
    this.isVarifyVoters = true;
this.isBlockedVoters = false;
  }
}
