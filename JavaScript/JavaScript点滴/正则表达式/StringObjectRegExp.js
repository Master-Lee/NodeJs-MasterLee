// 正则表达式的基本语法如下2种：

// 直接量语法：
//      1. /pattern/attributes;

//      2. 创建RegExp对象的语法

//          new RegExp(pattern,attributes);

// 参数：参数pattern是一个字符串，指定了正则表达式的模式；参数attributes是一个可选的参数，包含属性 g，i，m，分别使用与全局匹配，不区分大小写匹配，多行匹配；

// @return 返回值：一个新的RegExp对象，具有指定的模式和标志；

/*
*支持正则表达式的String对象方法
*/
/*********************************************/
/**1、search方法**/
//返回检索到的位置，如果没有检索到返回-1
//通过i可以忽略大小写
/*********************************************/
var str = "hello world,hello world";

console.log(str.search(/hello/));   //返回位置 0
console.log(str.search(/hello/g));  //返回第一个的位置 0
console.log(str.search("wo"));      //6
console.log(str.search("abc"));     //-1
console.log("Hello".search(/hello/i)); //忽略大小写 0


/*********************************************/
/**2、match方法**/
// 该方法用于在字符串内检索指定的值，或找到一个或者多个正则表达式的匹配。
// 该方法类似于indexOf()或者lastIndexOf(); 
// 但是它返回的是指定的值，而不是字符串的位置
/*********************************************/

var str = "hello world";
console.log(str.match("hello"));    //[ 'hello', index: 0, input: 'hello world' ]
console.log(str.match("Hello"));    //null
console.log(str.match(/hello/));    //[ 'hello', index: 0, input: 'hello world' ]

var str2="1 plus 2 equal 3";
console.log(str2.match(/\d+/g));  