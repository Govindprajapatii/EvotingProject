import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminsComponent } from '../admins/admins.component';
import { EidtAdminComponent } from '../eidt-admin/eidt-admin.component';
import { SuperAdminService } from 'src/app/servicies/super-admin.service';
import { AdminTableDataSource, AdminTableItem } from './admin-table-datasource';





@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})




export class AdimnTableComponent  implements AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminTableItem>;

  isChecked = true;
  dataSource: AdminTableDataSource;
  employeeTableItem: AdminTableItem[] = [];



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'registrationDate', 'status', 'actions'];

  constructor(private dialog: MatDialog, private superAdminService: SuperAdminService) {
    this.superAdminService.getAdminsList().subscribe(x => {
      
      this.employeeTableItem = x as AdminTableItem[];
      
      this.dataSource = new AdminTableDataSource( this.employeeTableItem );
      console.log(this.dataSource);
      
    });



  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
  }

  
  LoadTable(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onViewClick(userId) {

    this.dialog.open(AdminsComponent, { width: '1000px', height: '600px', minWidth: '320px',data:{"userId":userId}});
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
          
         
        }
      });
    }
    else{
      this.superAdminService.updateStatus(userId,"Active").subscribe(isSuccess => {
        if(isSuccess)
        {
          // this.employeeTableItem[index].isActive = true;

          this.employeeTableItem[index].status = 'Active';     
        }
    });
    }
  }

}
