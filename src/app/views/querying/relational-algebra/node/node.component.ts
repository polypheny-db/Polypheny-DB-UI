import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Node} from '../relational-algebra.model';
import {SortDirection, SortState} from '../../../../components/data-table/models/sort-state.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('nodeEle', {static: false}) public nodeEle: ElementRef;
  @Input() node: Node;

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.node.height = this.nodeEle.nativeElement.offsetHeight;
  }

  addSortColumn(){
    this.node.sortColumns.push( new SortState() );
  }

  removeSortColumn( index:number ) {
    if( this.node.sortColumns.length > 1){
      this.node.sortColumns.splice( index, 1 );
    }
  }

  sortColumn(node:Node, event: CdkDragDrop<string[]>) {
    moveItemInArray(node.sortColumns, event.previousIndex, event.currentIndex);
  }

  toggleDirection( col:SortState ){
    if( col.direction === SortDirection.DESC){
      col.direction = SortDirection.ASC;
    } else {
      col.direction = SortDirection.DESC;
    }
  }

}
