import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toDoItem } from '../../shared/models/toDoItem';
import { user } from '../../shared/models/user';
import { NgClass, NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'todo-list',
  imports: [NgFor, NgClass, NgIf, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  @Input() items: toDoItem[] = [];
  @Input() user!: user; 
  @Output() deleteItem = new EventEmitter<toDoItem>();
  @Output() saveEdit = new EventEmitter<toDoItem[]>();
  @Output() toggleItem = new EventEmitter<toDoItem>()
  //user = new user('Nina');
  isEditing : boolean = false;
  currentItem: toDoItem | null = null;
  oldItem: toDoItem | null = null;

  editItemCliked(item: toDoItem) {
    this.currentItem = { ...item };
    this.oldItem = { ...item}
    this.isEditing = true;
  }

  deleteItemClicked(item: toDoItem) {
    this.deleteItem.emit(item); 
  }

  saveEditClicked() {
    if (this.currentItem) {
     const listEdit : toDoItem[] = [
      new toDoItem(this.currentItem.toDoText, this.currentItem.isComplete),
      new toDoItem(this.oldItem!.toDoText, this.oldItem!.isComplete),
    ];
    this.saveEdit.emit(listEdit);
    this.closePopup();
    }
  }

  toggleItemClicked(item: toDoItem) {
    this.toggleItem.emit(item);
  }

  closePopup() {
    this.isEditing = false;
    this.currentItem = null;
  }
}
