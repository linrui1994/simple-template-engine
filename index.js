var templateEngine = function (tpl, data) {
  tpl = tpl.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/[\r\t\n]/g, '')
  var reg = /<%(.+?)%>/g
  var code = 'var r=[];\n'
  var regExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g 
  var cursor = 0
  function add (line, js) {
    js ? code += (regExp.test(line) ? line : 'r.push(' + line + ');\n')
       : code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n'
  }
  while (match = reg.exec(tpl)) {
    add(tpl.slice(cursor, match.index))
    add(match[1], true)
    cursor = match.index + match[0].length
  }
  code += 'return r.join("");'
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}