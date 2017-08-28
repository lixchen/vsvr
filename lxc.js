var util = {
  isNaN(obj) {
    return Number.isNaN(obj)
  },
  isArray(obj) {
    return Array.isArray(obj)
  },
  isUndefined(obj) {
    return obj === undefined || obj === null
  },
  isTrue(obj) {
    return obj === true
  },
  isFalse(obj) {
    return obj === false
  },
  isArrayLike(obj) {
    var length = !!obj && 'length' in obj && obj.length;
    var type = typeof obj;
    if (type === 'function' || type === 'string') {
      return false;
    }
    return Array.isArray(obj) || typeof length === 'number' && length >= 0
  },
  each(obj, fn) {
    var i, length;
    if (util.isArrayLike(obj)) {
      for (i = 0; i < obj.length; i++) {
        fn(obj[i], i, obj);
      }
    } else {
      var keys = Object.keys(obj);
      for (i = 0; i < keys.length; i++) {
        fn(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  }
};

var toString = Object.prototype.toString;

var data_type = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'];

data_type.forEach(function (item) {
  util[`is${item}`] = function (obj) {
    return toString.call(obj) === `[object ${item}]`
  }
})


/**
 * 检测类型
 */
function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
/**
 * 获取样式和设置样式
 * 除了width、height、top、left、bottom、right
 * 其他属性有单位的需要带单位
 */
function css(elem, cssRules, value) {
  var len = arguments.length;
  var arr = ['width', 'height', 'top', 'left', 'bottom', 'right'];
  if (len === 1) {
    return getComputedStyle(elem, null);
  } else if (len === 3) {
    elem.style[cssRules] = arr.indexOf(cssRules) === -1 ? value : value + 'px';
  } else if (len === 2) {
    var type = Object.prototype.toString.call(cssRules);
    if (type === '[object String]') {
      return parseFloat(getComputedStyle(elem, null)[cssRules]);
    } else if (type === '[object Object]') {
      for (var key in cssRules) {
        cssRules.hasOwnProperty(key) &&
          (elem.style[key] = arr.indexOf(key) === -1 ? cssRules[key] : cssRules[key] + 'px');
      }
    }
  }
}

/**
 * 获取dom元素
 */
function $(selector, context) {
  const idReg = /^#[a-zA-Z]+([-_]?[a-zA-z]+)*$/g;
  const classReg = /^\.[a-zA-Z]+([-_]?[a-zA-z]+)*$/g;
  const tagReg = /^[a-zA-Z]+[a-zA-Z]*$/g;
  let selectorType = 'querySelectorAll';
  // 判断改用哪种方式获取元素
  if (idReg.test(selector)) {
    selectorType = 'getElementById';
    selector = selector.substr(1, selector.length);
  } else if (classReg.test(selector)) {
    selectorType = 'getElementsByClassName';
    selector = selector.substr(1, selector.length)
  } else if (tagReg.test(selector)) {
    selectorType = 'getElementsByTagName';
  } else {
    return [];
  }
  return (context || document)[selectorType](selector) || [];
}


/**
 * 默认减速运动，添加type参数linear为匀速，速度版
 */
function animate(elem, attrs, fn, type, speed) {
  clearInterval(elem.timer)
  var step = current = 0
  if (arguments.length === 3 && typeof fn !== 'function') {
    type = fn;
  }
  elem.timer = setInterval(function () {
    var flag = true
    for (var attr in attrs) {
      current = (attr === 'opacity') ?
        parseFloat(getComputedStyle(elem, null)[attr]) * 100 :
        parseInt(getComputedStyle(elem, null)[attr])

      if (current !== attrs[attr]) {
        flag = false
      }

      if (type === 'linear') {
        step = !!speed ? speed : 10
        step = (attrs[attr] > current) ? Math.abs(step) : -Math.abs(step)
        step = (Math.abs(attrs[attr] - current) < Math.abs(step)) ? Math.abs(attrs[attr] - current) : step
        alert('linear')
      } else {
        step = (attrs[attr] - current) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        alert('jmsu')
      }

      if (attr === 'opacity') {
        elem.style[attr] = (current + step) / 100
      } else {
        elem.style[attr] = current + step + 'px'
      }
    }

    if (flag) {
      clearInterval(elem.timer)
      typeof fn === 'function' && fn.call(elem)
    }
  }, 30)
}

/**
 * 时间版运动
 * tween: t/当前已用时间、b/初始值、c/已经走了的值、d/持续时间、返回目标位置
 */
function animate(elem, attrs, times, type, fn) {
  var len = arguments.length;
  if (len === 2) {
    times = 400;
    type = 'linear';
  }

  if (len === 3) {
    (typeof times === 'number') && (type = 'linear');
    (typeof times === 'string') && (type = times) && (times = 400);
    (typeof times === 'function') && (fn = times) && (times = 400) && (type = 'linear');
  }

  if (len === 4) {
    var num = times,
      tp = type;
    times = typeof num === 'number' ?
      num :
      typeof tp === 'number' ?
      tp :
      400;
    type = typeof tp === 'string' ?
      tp :
      typeof num === 'string' ?
      num :
      'linear';
    fn = typeof num === 'function' ?
      num :
      typeof tp === 'function' ?
      tp :
      '';
  }
  console.log(times, type, fn)
  /**
   * 计算速度的公式
   * linear/匀速、easeIn/加速、easeOut/减速
   * 参数:
   *     t: 已用时间
   *     b: 初始值
   *     c: 已走距离
   *     d: 总时间
   */
  var tween = {
    linear: function (t, b, c, d) {
      return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
  };

  var current = {};
  for (var attr in attrs) {
    current[attr] = attr === 'opacity' ?
      Math.round(getComputedStyle(elem, null)[attr] * 100) :
      parseInt(getComputedStyle(elem, null)[attr]);
  }

  clearInterval(elem.timer);
  var startTime = new Date().getTime();

  elem.timer = setInterval(function () {
    var nowTime = new Date().getTime();

    var t = Math.min(times, nowTime - startTime);
    for (var attr in attrs) {
      var step = tween[type](t, current[attr], attrs[attr] - current[attr], times);

      if (attr === 'opacity') {
        elem.style.opacity = step / 100;
        elem.style.filter = 'alpha(opacity=' + step + ')';
      } else {
        elem.style[attr] = step + 'px';
      }
    }

    if (t === times) {
      clearInterval(elem.timer);
      fn && fn.call(elem);
    }
  }, 20);

}


/**
 * 拖拽
 */
function drag(elem, target) {
  if (target) {
    target.addEventListener('mousedown', dg, false);
  } else {
    elem.addEventListener('mousedown', dg, false);
  }

  function dg(event) {
    const disx = event.clientX - elem.offsetLeft;
    const disy = event.clientY - elem.offsetTop;

    function move(event) {
      elem.style.margin = 0;
      elem.style.left = event.clientX - disx + 'px';
      elem.style.top = event.clientY - disy + 'px';
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }

    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', move, false);
    }, false);
  }
}

// 获取某月总天数/最后一天 getTotalDays(year, month)
function getTotalDays(y, m) {
  var d = new Date(y, m, 0);
  return d.getDate();
}
// 获取某天为星期几 getDayOfWeek(year, month, day)
function getDayOfWeek(y, m, d) {
  var d = new Date(y, m, d);
  return d.getDay();
}