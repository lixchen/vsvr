let System = {};
let Store = {
  newStore(name) {
    return Object.create(this).init(name);
  },
  init(name) {
    this.dbname = name;
    if (!localStorage[name]) {
      this.data = [];

      this.updateData(this.data);
    } else {
      this.data = this.getData();
    }
    return this;
  },
  getData() {
    return JSON.parse(localStorage[this.dbname])
  },
  updateData(data) {
    localStorage[this.dbname] = JSON.stringify(data)
  },
  addItem(newItem) {
    this.data.push(newItem)
    this.updateData(this.data)
  }
};


// let allItems = Store.newStore('allItems');


/**
 * 示例
 */
storageName = [
  {
    name: 'blog',
    deskIcon: false,  // false/true
    taskIcon: false,  // false/true
    state: 'close',   // true/close
    pos: { w: 0, h: 0, l: 0, t: 0 },  // width、height、left、top
    special: 'normal'       // 最大化、最小化(normal)、贴边
  }
];


let System = {
  init(store) {
     this.store = store;
  },
  
  openItem(item, fn) {
    item.state = 'open';
    fn(item.state)
  },
  
  openContextmenu(menu) {
    menu.style.display = 'block';
  }
  
  
}


let menu = Object.create(System);
let menu = {
  init() {
    
  },
  
  createDeskIcon(){
  
  },
  
  createTaskIcon(){
    
  },
  
  
}





