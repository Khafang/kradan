webpackJsonp([2,0],[function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var i=n(211),o=s(i),r=n(202),a=s(r),c=n(26),l=s(c);o.default.use(n(210)),o.default.use(l.default),new o.default({el:"#app",render:function(e){return e(a.default)}})},,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),i=n(201);n(148),t.default={data:function(){return{content:""}},props:{code:String,value:String,unseenLines:Array,marker:Function,options:{type:Object,default:function(){return{styleActiveLine:!0,lineNumbers:!0,mode:"text/javascript",lineWrapping:!0}}}},created:function(){this.options=this.options||{};var e=this.options.mode||"text/javascript",t=this.options.theme,s="string"==typeof e;if(s)try{e=i.findModeByMIME(e).mode}catch(t){throw new Error("CodeMirror language mode: "+e+" Configuration error (CodeMirror语言模式配置错误，或者不支持此语言)")}if(!s)try{e=i.findModeByName(e.name).mode}catch(t){throw new Error("CodeMirror language mode: "+e.name+" Configuration error (CodeMirror语言模式配置错误，或者不支持此语言)")}n(31)("./"+e+"/"+e+".js"),t&&"solarized light"==t&&(t="solarized"),t&&"default"!=t&&n(136)("./"+t+".css")},ready:function(){var e=this;this.editor=s.fromTextArea(this.$el,this.options),this.editor.setValue(this.code||this.value||this.content),this.editor.on("change",function(t){e.content=t.getValue(),e.code=t.getValue()})},mounted:function(){var e=this;this.editor=s.fromTextArea(this.$el,this.options),this.editor.setValue(this.code||this.value||this.content),this.editor.on("change",function(t){e.content=t.getValue(),e.$emit&&(e.$emit("changed",e.content),e.$emit("input",e.content))}),this.gutterMarkers()},watch:{code:function(e,t){var n=this.editor.getValue();if(e!==n){var s=this.editor.getScrollInfo();this.editor.setValue(e),this.content=e,this.editor.scrollTo(s.left,s.top)}this.gutterMarkers()},value:function(e,t){var n=this.editor.getValue();if(e!==n){var s=this.editor.getScrollInfo();this.editor.setValue(e),this.content=e,this.editor.scrollTo(s.left,s.top)}}},methods:{gutterMarkers:function(){var e=this;e.unseenLines.forEach(function(t){var n=e.editor.lineInfo(t);e.editor.setGutterMarker(t,"breakpoints",n.gutterMarkers?null:e.marker())})}}}},function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function i(){var e=document.createElement("div");return e.style.color="#fba949",e.innerHTML="|",e}Object.defineProperty(t,"__esModule",{value:!0});var o=n(203),r=s(o),a=n(204),c=s(a),l=n(144);t.default={data:function(){return{list:{name:"Root",path:"/",children:[]},currentOpenFilePath:"",openFiles:[],unseenFilePaths:[],unseenFolderPaths:[],unseenLine:[]}},computed:{},mounted:function(){var e=this,t=io.connect();t.on("list",function(t){e.list=t}),t.on("change",function(t){console.log("change "+t),e.addUnseenFile(t);var n=e.openFiles.find(function(e){return e.path===t});n&&e.getFile(t)})},methods:{getFile:function(e){var t=this,n=this;n.$http.get("/files"+e).then(function(s){var o=e.split("/").pop(),r={name:o,path:e,code:"",unseenLines:[],marker:i,editorOption:{tabSize:2,mode:"text/javascript",theme:"material",lineNumbers:!0,lineWrapping:!0,line:!0,readOnly:!0,gutters:["CodeMirror-linenumbers","breakpoints"]}},a=e.split(".").pop();switch(a){case"vue":r.editorOption.mode="script/x-vue";break;case"html":r.editorOption.mode="text/html";break;case"md":r.editorOption.mode="text/x-markdown";break;case"jsx":r.editorOption.mode="text/jsx";break;default:r.editorOption.mode="text/javascript"}var c=n.openFiles.find(function(t){return t.path===e});if(c){var u=l.diffLines(c.code,s.body);c.unseenLines=t.addUnseenLine(u),c.code=s.body}else{r.code=s.body;var f=n.openFiles.findIndex(function(e){return e.path===n.currentOpenFilePath});n.openFiles.splice(f+1,0,r),n.currentOpenFilePath=e}},function(e){console.log(e)})},openFile:function(e){this.removeUnseenFile(e);var t=this;t.openFiles.find(function(t){return t.path===e})?t.currentOpenFilePath=e:t.getFile(e)},closeFile:function(e){var t=this.openFiles.findIndex(function(t){return t.path===e});if(this.openFiles.splice(t,1),this.currentOpenFilePath===e){var n=t<=0?t:t-1;0===this.openFiles.length?this.currentOpenFilePath="":this.currentOpenFilePath=this.openFiles[n].path}},addUnseenFile:function(e){var t=this;if(!this.unseenFilePaths.find(function(t){return t===e})){this.unseenFilePaths.push(e);var n=e.split("/");n.shift(),n.shift(),n.forEach(function(n){var s=e.substring(0,e.search("/"+n));t.unseenFolderPaths.push({path:s+"/",file:e})})}},removeUnseenFile:function(e){var t=this,n=this.unseenFilePaths.indexOf(e);if(n!==-1){this.unseenFilePaths.splice(n,1);var s=this.unseenFolderPaths.filter(function(t){return t.file===e});s.forEach(function(){var n=t.unseenFolderPaths.findIndex(function(t){return t.file===e});n!==-1&&t.unseenFolderPaths.splice(n,1)})}},addUnseenLine:function(e){var t=0,n=[];return e.forEach(function(e){if(void 0===e.added&&void 0===e.removed&&(t+=e.count),e.added)if(e.count>1)for(var s=0;s<e.count;s++)n.push(parseInt(t)),t++;else n.push(parseInt(t)),t+=e.count}),n},isUnseenTab:function(e){return this.unseenFilePaths.find(function(t){return t===e})}},components:{Item:r.default,Viewer:c.default}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"item",data:function(){return{open:!1}},mounted:function(){"/"===this.model.path&&(this.open=!0)},props:{model:Object,currentOpenFilePath:String,unseenFilePaths:Array,unseenFolderPaths:Array},computed:{isFolder:function(){return"directory"===this.model.type},isUnseenFile:function(){var e=this;return this.unseenFilePaths.find(function(t){return t===e.model.path})},isUnseenFolder:function(){var e=this;return this.unseenFolderPaths.find(function(t){return t.path===e.model.path})},isUnseen:function(){return this.isUnseenFile||this.isUnseenFolder},isNone:function(){return!this.isUnseenFile&&!this.isUnseenFolder&&this.currentOpenFilePath!==this.model.path},isActiveUnseen:function(){return this.currentOpenFilePath===this.model.path&&this.isUnseen}},methods:{openFile:function(e){this.$emit("openFile",e)},onClick:function(){this.isFolder?this.open=!this.open:this.$emit("openFile",this.model.path)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(26);t.default={data:function(){return{}},props:["info","unseenLine"],computed:{isImage:function(){var e=this.info.path.split(".").pop();switch(e.toUpperCase()){case"PNG":case"JPG":case"JPEG":case"ICO":case"SVG":case"GIF":return!0}return!1}},mounted:function(){},methods:{},components:{codemirror:s.codemirror}}},function(e,t,n){function s(e){return n(i(e))}function i(e){return o[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var o={"./apl/apl.js":32,"./asciiarmor/asciiarmor.js":33,"./asn.1/asn.1.js":34,"./asterisk/asterisk.js":35,"./brainfuck/brainfuck.js":36,"./clike/clike.js":10,"./clojure/clojure.js":37,"./cmake/cmake.js":38,"./cobol/cobol.js":39,"./coffeescript/coffeescript.js":13,"./commonlisp/commonlisp.js":40,"./crystal/crystal.js":41,"./css/css.js":8,"./cypher/cypher.js":42,"./d/d.js":43,"./dart/dart.js":44,"./diff/diff.js":45,"./django/django.js":46,"./dockerfile/dockerfile.js":47,"./dtd/dtd.js":48,"./dylan/dylan.js":49,"./ebnf/ebnf.js":50,"./ecl/ecl.js":51,"./eiffel/eiffel.js":52,"./elm/elm.js":53,"./erlang/erlang.js":54,"./factor/factor.js":55,"./fcl/fcl.js":56,"./forth/forth.js":57,"./fortran/fortran.js":58,"./gas/gas.js":59,"./gfm/gfm.js":60,"./gherkin/gherkin.js":61,"./go/go.js":62,"./groovy/groovy.js":63,"./haml/haml.js":64,"./handlebars/handlebars.js":14,"./haskell-literate/haskell-literate.js":65,"./haskell/haskell.js":15,"./haxe/haxe.js":66,"./htmlembedded/htmlembedded.js":67,"./htmlmixed/htmlmixed.js":2,"./http/http.js":68,"./idl/idl.js":69,"./javascript/javascript.js":4,"./jinja2/jinja2.js":70,"./jsx/jsx.js":71,"./julia/julia.js":72,"./livescript/livescript.js":73,"./lua/lua.js":74,"./markdown/markdown.js":16,"./mathematica/mathematica.js":75,"./mbox/mbox.js":76,"./meta.js":17,"./mirc/mirc.js":77,"./mllike/mllike.js":78,"./modelica/modelica.js":79,"./mscgen/mscgen.js":80,"./mumps/mumps.js":81,"./nginx/nginx.js":82,"./nsis/nsis.js":83,"./ntriples/ntriples.js":84,"./octave/octave.js":85,"./oz/oz.js":86,"./pascal/pascal.js":87,"./pegjs/pegjs.js":88,"./perl/perl.js":89,"./php/php.js":90,"./pig/pig.js":91,"./powershell/powershell.js":92,"./properties/properties.js":93,"./protobuf/protobuf.js":94,"./pug/pug.js":18,"./puppet/puppet.js":95,"./python/python.js":19,"./q/q.js":96,"./r/r.js":97,"./rpm/rpm.js":98,"./rst/rst.js":99,"./ruby/ruby.js":11,"./rust/rust.js":100,"./sas/sas.js":101,"./sass/sass.js":20,"./scheme/scheme.js":102,"./shell/shell.js":103,"./sieve/sieve.js":104,"./slim/slim.js":105,"./smalltalk/smalltalk.js":106,"./smarty/smarty.js":107,"./solr/solr.js":108,"./soy/soy.js":109,"./sparql/sparql.js":110,"./spreadsheet/spreadsheet.js":111,"./sql/sql.js":112,"./stex/stex.js":21,"./stylus/stylus.js":22,"./swift/swift.js":113,"./tcl/tcl.js":114,"./textile/textile.js":115,"./tiddlywiki/tiddlywiki.js":116,"./tiki/tiki.js":117,"./toml/toml.js":118,"./tornado/tornado.js":119,"./troff/troff.js":120,"./ttcn-cfg/ttcn-cfg.js":121,"./ttcn/ttcn.js":122,"./turtle/turtle.js":123,"./twig/twig.js":124,"./vb/vb.js":125,"./vbscript/vbscript.js":126,"./velocity/velocity.js":127,"./verilog/verilog.js":128,"./vhdl/vhdl.js":129,"./vue/vue.js":130,"./webidl/webidl.js":131,"./xml/xml.js":7,"./xquery/xquery.js":132,"./yacas/yacas.js":133,"./yaml-frontmatter/yaml-frontmatter.js":134,"./yaml/yaml.js":23,"./z80/z80.js":135};s.keys=function(){return Object.keys(o)},s.resolve=i,e.exports=s,s.id=31},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){function s(e){return n(i(e))}function i(e){return o[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var o={"./3024-day.css":149,"./3024-night.css":150,"./abcdef.css":151,"./ambiance-mobile.css":152,"./ambiance.css":153,"./base16-dark.css":154,"./base16-light.css":155,"./bespin.css":156,"./blackboard.css":157,"./cobalt.css":158,"./colorforth.css":159,"./dracula.css":160,"./duotone-dark.css":161,"./duotone-light.css":162,"./eclipse.css":163,"./elegant.css":164,"./erlang-dark.css":165,"./hopscotch.css":166,"./icecoder.css":167,"./isotope.css":168,"./lesser-dark.css":169,"./liquibyte.css":170,"./material.css":171,"./mbo.css":172,"./mdn-like.css":173,"./midnight.css":174,"./monokai.css":175,"./neat.css":176,"./neo.css":177,"./night.css":178,"./panda-syntax.css":179,"./paraiso-dark.css":180,"./paraiso-light.css":181,"./pastel-on-dark.css":182,"./railscasts.css":183,"./rubyblue.css":184,"./seti.css":185,"./solarized.css":186,"./the-matrix.css":187,"./tomorrow-night-bright.css":188,"./tomorrow-night-eighties.css":189,"./ttcn.css":190,"./twilight.css":191,"./vibrant-ink.css":192,"./xq-dark.css":193,"./xq-light.css":194,"./yeti.css":195,"./zenburn.css":196};s.keys=function(){return Object.keys(o)},s.resolve=i,e.exports=s,s.id=136},,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,function(e,t,n){var s,i;n(198),s=n(28);var o=n(207);i=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(i=s=s.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,e.exports=s},function(e,t,n){var s,i;n(199),s=n(29);var o=n(208);i=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(i=s=s.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,e.exports=s},function(e,t,n){var s,i;n(200),s=n(30);var o=n(209);i=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(i=s=s.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,e.exports=s},function(e,t,n){var s,i;n(197),s=n(27);var o=n(206);i=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(i=s=s.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,e.exports=s},function(module,exports){module.exports={render:function(){with(this)return _m(0)},staticRenderFns:[function(){with(this)return _h("textarea")}]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"app"},[_h("div",{staticClass:"left"},[_h("ul",[_h("item",{staticClass:"item",attrs:{model:list,currentOpenFilePath:currentOpenFilePath,"unseen-file-paths":unseenFilePaths,"unseen-folder-paths":unseenFolderPaths},on:{openFile:openFile}})])])," ",_h("div",{staticClass:"right"},[_h("ul",{staticClass:"tabs"},[_l(openFiles,function(e){return _h("li",{staticClass:"tabs-tab",class:{"is-active":currentOpenFilePath===e.path},on:{click:function(t){t.target===t.currentTarget&&openFile(e.path)}}},[_h("span",{staticClass:"tabs-tab-name",on:{click:function(t){t.target===t.currentTarget&&openFile(e.path)}}},[_s(e.name)])," ",_h("span",{staticClass:"icon",attrs:{style:"float: right;"},on:{click:function(t){closeFile(e.path)}}},[_h("i",{directives:[{name:"show",rawName:"v-show",value:!isUnseenTab(e.path),expression:"!isUnseenTab(file.path)"}],staticClass:"fa fa-close",attrs:{"aria-hidden":"true"}})," ",_h("i",{directives:[{name:"show",rawName:"v-show",value:isUnseenTab(e.path),expression:"isUnseenTab(file.path)"}],staticClass:"fa fa-pencil",attrs:{"aria-hidden":"true"}})])])})])," ",_h("div",{staticClass:"item-views"},[_l(openFiles,function(e){return _h("div",[currentOpenFilePath===e.path?_h("viewer",{attrs:{info:e,"unseen-line":unseenLine}}):_e()])})])])])},staticRenderFns:[]}},function(module,exports){module.exports={render:function(){with(this)return _h("li",{class:{"is-active-unseen":isActiveUnseen,"is-active":currentOpenFilePath===model.path,"is-unseen":isUnseen,"is-none":isNone}},[_h("div",{on:{click:onClick}},[isFolder?_h("span",[_s(open?"▼":"▶")]):_e(),"\n    "+_s(model.name)+"\n  "])," ",isFolder?_h("ul",{directives:[{name:"show",rawName:"v-show",value:open,expression:"open"}]},[_l(model.children,function(e){return _h("item",{staticClass:"item",attrs:{model:e,currentOpenFilePath:currentOpenFilePath,"unseen-file-paths":unseenFilePaths,"unseen-folder-paths":unseenFolderPaths},on:{openFile:openFile}})})]):_e()])},staticRenderFns:[]}},function(module,exports){module.exports={render:function(){with(this)return _h("div",[isImage?_e():_h("codemirror",{attrs:{code:info.code,options:info.editorOption,"unseen-lines":info.unseenLines,marker:info.marker}})," ",isImage?_h("div",{staticClass:"image-container"},[_h("img",{attrs:{src:"files/"+info.path,alt:""}})]):_e()])},staticRenderFns:[]}}]);
//# sourceMappingURL=app.74c004eb12ea54716f30.js.map