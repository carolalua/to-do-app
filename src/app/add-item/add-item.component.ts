import { Component, EventEmitter, Output } from '@angular/core';
import { toDoItem } from '../../shared/models/toDoItem';
import { NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-item',
  imports: [NgIf, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  @Output() taskAdded = new EventEmitter<toDoItem>();
  isAdding : boolean = false;
  newItemText : string = '';

  openAddNewPopup() {
    this.newItemText = '';
    this.isAdding = true;
  }

  addNewItem() {
    if (this.newItemText.trim()) {
      const newItem: toDoItem = { toDoText: this.newItemText, isComplete: false };
      this.taskAdded.emit(newItem);
      this.newItemText = '';
      this.closePopup();
    }
  }

  closePopup() {
    this.isAdding = false;
  }
}
