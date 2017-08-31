
var log = console.log;
// Controller
var Controller = {
  init(model, view) {
    var self = this
    this.model = model
    this.view = view
    this.view.new_todo.addEventListener('change', function () { self.addItem() }, false)
  },
  addItem() {
    var self = this
    var newItem = {
      title: this.view.new_todo.value,
      completed: false,
      id: new Date().getTime()
    }
    this.model.addItem(newItem)
    this.model.updateCounters()
    this.view.render('clearNewTodo')
    this.view.render('newItem', this.model.data)
    this.view.render('updateCounter', this.model.counters)
  }
}


// Model
var Model = {
  init(store) {
    this.store = store
    this.data = this.store.data
  },
  addItem(newItem) {
    Store.addItem(newItem);
  },
  updateCounters() {
    var self = this
    this.counters = {
      completed: 0,
      active: 0,
      all: 0
    }
    self.data.forEach(function (item) {

      if (item.completed) {
        self.counters.completed++
      } else {
        self.counters.active++
      }
      self.counters.all++
    })
  }
}




// Store
var Store = {
  init(name) {
    this._dbname = name
    this.data = []
    if (!localStorage[name]) {
      this.updateData(this.data)
    }
  },
  getData() {
    return JSON.parse(JSON.stringify(localStorage[this._dbname]))
  },
  updateData(data) {
    localStorage[this._dbname] = JSON.stringify(data)
  },
  addItem(newItem) {
    this.data.push(newItem)
    this.updateData(this.data)
  }
}


// View
var View = {
  init() {
    this.new_todo = $('.new-todo')
    this.main = $('.main')
    this.footer = $('.footer')
    this.todo_counter = $('.todo-count')
    this.filters = $('.filters')
    this.todo_list = $('.todo-list')
    this.toggle_all = $('.toggle-all')
    this.new_todo = $('.new-todo')
    this.clear_completed = $('.clear-completed')
  },
  render(cmd, data) {
    var self = this


    var commands = {
      newItem: function () {
        var template = ''
        data.forEach(function (item) {
          template +=
            `<li data-id=${item.id}>
      <div>
        <input type="checkbox" class="toggle">
        <label>${item.title}</label>
        <button class="destroy"></button>
      </div>
        </li>`
        })
        self.todo_list.innerHTML = template
      },
      clearNewTodo: function () {
        self.new_todo.value = ''
      },
      updateCounter: function () {
        log(data)
        self.todo_counter.innerHTML = data.active > 1 ? `${data.active} items left` : `${data.active} item left`
        self.clear_completed.style.display = data.completed > 0 ? 'block' : 'none'
      }
    }
    commands[cmd]()
  }
}

localStorage.clear()
Store.init('todos')
View.init()
Model.init(Store)
Controller.init(Model, View)