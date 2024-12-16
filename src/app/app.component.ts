import { Component } from '@angular/core';
import { user } from '../shared/models/user';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { toDoItem } from '../shared/models/toDoItem';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, TodoListComponent, AddItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items: toDoItem[] = [];
  user = new user('Nina');
  title = 'to-do';

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.items = JSON.parse(savedTasks);
    }
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.items));
  }

  addTask(newTask: toDoItem) {
    this.items.push(newTask);
    this.saveTasksToLocalStorage();
  }

  saveEdit(editData : toDoItem[]) {
    const currentItem = editData[0];
    const oldItem = editData[1];

    if (currentItem) {
      const index = this.items.findIndex(item => item.toDoText === oldItem!.toDoText);
      if (index !== -1) {
        this.items[index] = { ...currentItem };
        this.saveTasksToLocalStorage();
      }
    }
  }

  deleteItem(item: toDoItem) {
    this.items = this.items.filter(i => i !== item);
    this.saveTasksToLocalStorage();
  }

  toggleItem(item: toDoItem) {
    item.isComplete = !item.isComplete;
    this.saveTasksToLocalStorage();
  }
}