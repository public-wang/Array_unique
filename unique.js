/*无需思考，我们可以得到 O(n^2) 复杂度的解法。
定义一个变量数组 res 保存结果，遍历需要去重的数组，
如果该元素已经存在在 res 中了，则说明是重复的元素，
如果没有，则放入 res 中。*/
function unique(arr) {
	var res=[];

	for(var i = 0; i<a.length; i++) {
		var item = a[i];

		for (var j = 0; j<res.length; j++) {
			if (item == res[j])
				break;
		}
		if (j == res.length) {
			res.push(item);
		}
	}

	return res;
}

/*代码非常简单，那么是否能更简洁些？
如果不考虑浏览器兼容，我们可以用 ES5 提供的 Array.prototype.indexOf 方法来简化代码。*/
function unique(arr) {
	var res=[];

	for(var i = 0; i<a.length; i++) {
		var item = a[i];

		(res.indexOf(item) ===-1) && res.push(item);
	}

	return res;
}
/*既然用了 indexOf，那么不妨再加上 filter。*/

function unique(a) {
 
  var res = a.filter(function(item, index, array) {
    return array.indexOf(item) === index;
  });
  
  return res;
}

/*方法二

法一是将原数组中的元素和结果数组中的元素一一比较，
我们可以换个思路，将原数组中重复元素的最后一个元素
放入结果数组中。*/

function unique(a) {
  var res = [];
 
  for (var i = 0, len = a.length; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      // 这一步十分巧妙
      // 如果发现相同元素
      // 则 i 自增进入下一个循环比较
      if (a[i] === a[j])
        j = ++i;
    }
 
    res.push(a[i]);
  }
 
  return res;
}
 
 
var a = [1, 1, '1', '2', 1];
var ans = unique(a);
console.log(ans); // => ["1", "2", 1]

/*虽然复杂度还是 O(n^2)，但是可以看到结果不同，
1 出现在了数组最后面，因为结果数组取的是元素最后一次出现的位置。*/

/*方法三（sort)

如果笔试面试时只答出了上面这样 O(n^2) 的方案，
可能还不能使面试官满意，下面就来说几种进阶方案。

将数组用 sort 排序后，理论上相同的元素会被放在相邻的位置，
那么比较前后位置的元素就可以了。*/

function unique(a) {
	return a.concat().sort().filter(function(item, pos, array){
		return !pos || (array[pos] != array[pos-1]);
	})
}

/*但是问题又来了，1 和 "1" 会被排在一起，不同的 Object 会被排在一起，因为它们 toString() 的结果相同，所以会出现这样的错误：

var a = [1, 1, 3, 2, 1, 2, 4, '1'];
var ans = unique(a);
console.log(ans); // => [1, 2, 3, 4]

当然你完全可以针对数组中可能出现的不同类型，来写这个比较函数。不过这似乎有点麻烦。
*/
/*方法四 （object）

用 JavaScript 中的 Object 对象来当做哈希表，
这也是几年前笔试时的解法，跟 sort 一样，
可以去重完全由 Number 基本类型组成的数组。*/
function unique(a) {
	var seen={};

	return a.filter(function(item){
		return seen.hasOwnProperty(item)?false:(seen[item]=true);
	})
}

/*还是和方法三一样的问题，因为 Object 的 key 值都是 String 类型，
所以对于 1 和 "1" 无法分别，我们可以稍微改进下，
将类型也存入 key 中。*/
function unique(a) {
  var ret = [];
  var hash = {};
 
  for (var i = 0, len = a.length; i < len; i++) {
    var item = a[i];
 
    var key = typeof(item) + item;
 
    if (hash[key] !== 1) {
      ret.push(item);
      hash[key] = 1;
    }
  }
 
  return ret;
}
 
 
var a = [1, 1, 3, 2, '4', 1, 2, 4, '1'];
var ans = unique(a);
console.log(ans); // => [1, 3, 2, "4", 4, "1"]

/*虽然解决了讨厌的 1 和 "1" 的问题，但是还有别的问题！*/

var a = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];
var ans = unique(a);
console.log(ans); // => [Object, String]

/*但是如果数组元素全部是基础类型的 Number 值，键值对法应该是最高效的！
*/

/*方法五 （ES6）

ES6 部署了 Set 以及 Array.from 方法，太强大了！如果浏览器支持，完全可以这样：*/
function unique(a) {
	return Array.from(new Set(a));
}

var a = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];
var ans = unique(a);
console.log(ans); // => [Object, Object, String, Number]