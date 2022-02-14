import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { VoterRegistrationService } from 'src/app/servicies/voter-registration.service';
import { SuperAdminService } from 'src/app/servicies/super-admin.service';


// TODO: Replace this with your own data model type
export interface AdminTableItem {
  firstName: string;
  lastName: string;
  registrationDate: string;
  userId: number;
  email:string;
  status :string;
  isActive :Boolean;
}
export class AdminTableDataSource extends DataSource<AdminTableItem> {
  data: AdminTableItem[] =[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private employeeTableItem:AdminTableItem[]) {
    super();
    this.data = employeeTableItem;
  }

 
  connect(): Observable<AdminTableItem[]> {
    if (this.paginator && this.sort) {
        return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  private getPagedData(data: AdminTableItem[]): AdminTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AdminTableItem[]): AdminTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.firstName, b.firstName, isAsc);
        case 'id': return compare(+a.userId, +b.userId, isAsc);
        case 'status': return compare(a.status,b.status,isAsc);
        case 'registrationDate':return compare(a.registrationDate,b.registrationDate,isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
