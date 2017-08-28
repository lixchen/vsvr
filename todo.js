/**
 * 获取元素
 */

var
  app = $('.todoapp')[0],
  main = $('.main')[0],
  footer = $('.footer')[0],
  new_todo = $('.new-todo')[0],
  toggle_all = $('.toggle-all', main)[0],
  todo_list = $('.todo-list', main)[0],
  items = $('li', todo_list),
  count = $('.todo-count', footer)[0],
  filters = $('a', footer),
  clear_completed = $('.clear-completed', footer)[0],
  all , active , completed ;


/**
 * 没有待办事项时隐藏main和footer
 */
function play() {
  if (items.length === 0) {
    css(main, 'display', 'none');
    css(footer, 'display', 'none');
  } else {
    css(main, 'display', 'block');
    css(footer, 'display', 'block');
  }
}

play();

/**
 * 设置toggle_all的状态
 */
function toggleAllState() {
  toggle_all.checked = [].every.call(items, function(item){
    return item.toggle.checked;
  })
}

/**
 * 输入待办事项
 * 输入框失去焦点或按Enter
 * 添加信息到todo_list
 * 显示main和footer
 */
function addItem() {
  var todo = new_todo.value,
    li = document.createElement('li');
  if (!todo) {
    return
  }
  li.innerHTML = `
<div>
  <input class="toggle" type="checkbox">
  <label>${todo}</label>
  <button class="destroy"></button>
</div>`;
  li.toggle = $('.toggle', li)[0];
  li.destroy = $('.destroy', li)[0];
  todo_list.appendChild(li);
  new_todo.value = '';
  toggleAllState();
  play();
}

new_todo.addEventListener('blur', addItem, false);

/**
 * toggle-all 
 * 全部选中/取消
 */

function toggleAll() {
    util.each(items, function(item){
      item.toggle.checked = toggle_all.checked;
    })
}

toggle_all.addEventListener('click', toggleAll, false);

/**
 * todoHandler
 * 单个待办事项的操作
 * 完成/删除/编辑
 */

function todoHandler(evnet) {
  util.each(items, function(item){
    if(event.target === item.toggle) {
      toggleAllState();
    } 
    if(event.target === item.destroy) {
      todo_list.removeChild(item);
      play();
    }
  })
}

todo_list.addEventListener('click', todoHandler, false);


/**
 * fliters
 * All查看所有待办事项
 * Active未完成
 * Completed已完成
 */
function todoFilter(event){
    all = [];
    active = [];
    completed = [];
    util.each(items, function(item, index){
      all.push(item);
      item.toggle.checked && completed.push(item);
      !item.toggle.checked && active.push(item);
    })
    function p(obj, value) {
      util.each(obj, function(i){
         css(i, 'display', value || 'block');
      });
    }
     p(items, 'none')
    event.target === filters[0] && p(all) ;
    event.target === filters[1]  &&  p(active) ;
    event.target === filters[2]  &&  p(completed) ;
     event.target === clear_completed && util.each(completed, function(i){
         todo_list.removeChild(i);
      });
}

footer.addEventListener('click', todoFilter,false);




