/**
 *思路：https://github.com/ElemeFE/element/issues/3054
 *1、先取到默认主题css文件里的内容，element-ui/lib/theme-chalk/index.css，生成一大串字符串并保存为originStyle
 *2、写一个16进制色值和对应关键字字符串的json,把originStyle里涉及到的16进制色值替换成相应关键字，生成一个新的style字符串middleStyle,显然这个style不能直接用，因为色值被改成了关键字。
 *3、基于css-color-function，再根据用户选择的基础色值生成一个关键字字符串和对应css-color-function表达式的json
 *4、基于第3步中生成的json生成一个新的{关键字：16进制色值}json
 *5、依据这个json将middleStyle中的关键字重新替换回16进制色值，生成newStyle，此时这个newStyle是可以用的，然后再插到style标签里
 *6、newStyle替换掉默认的originStyle就实现了主题色切换
 *
 *难点：
 *1、把.css里的内容取过来保存到本地
 *2、色值间的换算
 *3、
**/
import color from 'css-color-function'
import formula from './formula.json'

export const generateColors = primary => {
  let colors = {}

  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value)
  })
  return colors
}
//一些色值转换方法
export const colorsFn = {
	toHSL:function(v){
	    //取出rgb
	    let rgb = [];
	    rgb = v.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
	    let strHex = "#";
	    for(let i=0; i<rgb.length; i++){
	        let hex = Number(rgb[i]).toString(16);
	        if(hex === "0"){
	            hex += hex; 
	        }else if(hex.length===1){
	            hex ="0"+hex;
	        }
	        strHex += hex;
	    };
	    //返回16进制色值
	    return strHex;
	},
}