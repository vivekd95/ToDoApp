(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n(2),d=n.n(a),l=n(4),s=n.n(l),c=(n(14),n(5)),u=n(6),r=n(1),h=n(8),o=n(7),b=function(e){Object(h.a)(n,e);var t=Object(o.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).handleChange=function(t){e.setState({newTextValue:t.target.value})},e.handleEditChange=function(t){e.editText=t.target.value},e.handleKeyPress=function(t){13===t.keyCode&&e.handleSubmit(t)},e.handleSubmit=function(t){if(t.preventDefault(),""!==e.state.newTextValue){var n={index:e.state.list.length+1,value:e.state.newTextValue,completed:!0,editing:!1};e.setState((function(e){return{list:e.list.concat(n)}}))}else alert("CANNOT ADD EMPTY TASK!!");e.setState({newTextValue:""})},e.handleDelete=function(t){var n=e.state.list.filter((function(e){return e.index!==t}));e.setState({list:n})},e.handleEdit=function(t){var n=e.state.list.map((function(e){return e.index===t&&(e.editing=!e.editing),e}));e.setState({list:n})},e.handleSubmitEdit=function(t,n,i){var a=e.state.list.map((function(e){return e.index===t&&(e.value=""===n?i:n,e.editing=!e.editing),e}));e.setState({list:a})},e.state={newTextValue:"",list:[]},e.editText="",e.handleChange=e.handleChange.bind(Object(r.a)(e)),e.handleEditChange=e.handleEditChange.bind(Object(r.a)(e)),e.handleKeyPress=e.handleKeyPress.bind(Object(r.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(r.a)(e)),e}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"To-Do "}),Object(i.jsxs)("div",{children:[Object(i.jsx)("input",{type:"text",placeholder:"Enter your todo",value:this.state.newTextValue,onChange:this.handleChange,onKeyDown:this.handleKeyPress}),Object(i.jsx)("button",{type:"submit",onClick:this.handleSubmit,children:"ADD"}),this.state.list.map((function(t){return Object(i.jsxs)("div",{className:"task-wrapper",children:[t.editing?Object(i.jsxs)("div",{children:[Object(i.jsx)("input",{type:"text",defaultValue:t.value,onChange:e.handleEditChange}),Object(i.jsx)("button",{disabled:!t.completed,onClick:function(){return e.handleSubmitEdit(t.index,e.editText,t.value)},children:"Save"})]}):Object(i.jsxs)("div",{children:[Object(i.jsx)("span",{children:t.value}),Object(i.jsx)("button",{disabled:!t.completed,onClick:function(){return e.handleEdit(t.index)},children:"Edit"})]}),Object(i.jsx)("button",{onClick:function(){return e.handleDelete(t.index)},children:"DELETE"})]},t.index)}))]})]})}}]),n}(a.Component),j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,d=t.getLCP,l=t.getTTFB;n(e),i(e),a(e),d(e),l(e)}))};s.a.render(Object(i.jsx)(d.a.StrictMode,{children:Object(i.jsx)(b,{})}),document.getElementById("root")),j()}},[[15,1,2]]]);
//# sourceMappingURL=main.efb91ca8.chunk.js.map