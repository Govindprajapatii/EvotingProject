import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EmployeeTableDataSource as AdminTableDataSource, EmployeeTableItem as AdminTableItem, EmployeeTableItem } from './admin-table-datasource';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminsComponent } from '../admins/admins.component';
import { EidtAdminComponent } from '../eidt-admin/eidt-admin.component';
import { SuperAdminService } from 'src/app/servicies/super-admin.service';
@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdimnTableComponent  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminTableItem>;


  dataSource: AdminTableDataSource;
  adminList;
  employeeTableItem: EmployeeTableItem[] = [];



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'registrationDate', 'status', 'actions'];

  constructor(private dialog: MatDialog, private superAdminService: SuperAdminService) {
    this.superAdminService.getAdminsList().subscribe(x => {
      this.adminList = x;
      this.employeeTableItem = this.adminList as EmployeeTableItem[];
      
      this.dataSource = new AdminTableDataSource( this.employeeTableItem );
      console.log(this.dataSource);
      
      this.LoadTable();
    });



  }


  LoadTable(): void {


    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onViewClick() {

    this.dialog.open(AdminsComponent, { width: '1000px', height: '600px', minWidth: '320px' });
  }

  onEditClick() {

    this.dialog.open(EidtAdminComponent, { width: '1000px', height: '600px', minWidth: '320px' });
  }

  onDeleteClick() {
   
  }

  onStatusChange(userId,index){
    if(this.employeeTableItem[index].status == 'Active'){
      this.superAdminService.updateStatus(userId,"Deactivated").subscribe(isSuccess => {
        
        if(isSuccess)
        {
          this.employeeTableItem[index].status = 'Deactivated';
        }
      });
    }
    else{
      this.superAdminService.updateStatus(userId,"Active").subscribe(isSuccess => {
        if(isSuccess)
        this.employeeTableItem[index].status = 'Active';     
    });
    }
  }

}
