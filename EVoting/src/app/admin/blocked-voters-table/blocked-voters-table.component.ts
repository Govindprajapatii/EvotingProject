import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BlockedVotersTableDataSource, BlockedVotersTableItem } from './blocked-voters-table-datasource';

@Component({
  selector: 'app-blocked-voters-table',
  templateUrl: './blocked-voters-table.component.html',
  styleUrls: ['./blocked-voters-table.component.scss']
})
export class BlockedVotersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BlockedVotersTableItem>;
  dataSource: BlockedVotersTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new BlockedVotersTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
