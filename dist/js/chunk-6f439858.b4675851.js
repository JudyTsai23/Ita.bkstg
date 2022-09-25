(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f439858"],{"55a3":function(t,e,a){},a440:function(t,e,a){"use strict";a("55a3")},c4f1:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("CButtonToolbar",{attrs:{justify:""}},[a("IconButton",{staticClass:"text-white my-1 mr-2",attrs:{color:"warning",size:"sm",icon:"cil-pencil"},on:{clickFn:function(e){return t.edit()}}},[t._v("編輯")]),a("IconButton",{staticClass:"text-white my-1 mr-2",attrs:{color:"danger",size:"sm",icon:"cil-trash"},on:{clickFn:function(e){return t.del()}}},[t._v("刪除")])],1)},i=[],n=a("35ab"),r=a("20fc"),o={name:"ProcessButtons",props:{isChange:{type:Boolean,default:!1},itemId:{required:!0},itemGroup:{type:String,required:!0},editUrl:{type:String,default:""},delUrl:{type:String,default:""},delMsg:{type:String,default:""}},data:function(){return{}},methods:{checkChanged:function(){return!this.isChange||!!confirm("頁面內容曾修改過，尚未儲存修改的變更將會捨棄！\n是否確定要離開此頁面？")},edit:function(){if(this.checkChanged()){var t=""==this.editUrl?n["a"].getUrl(this.itemGroup,"edit"):this.editUrl;this.$router.push(t+this.itemId)}},del:function(){var t=this;if(confirm(this.delAlertStr)&&this.checkChanged()){this.$store.commit("set",["globalLoading",!0]);var e=""==this.delUrl?n["a"].getUrl(this.itemGroup,"delete"):this.delUrl;r["a"].delete(e+this.itemId,(function(e){t.$store.commit("set",["globalLoading",!1]),console.log("刪除成功!"),t.$emit("reloadFn")}),(function(t){console.log("刪除失敗!"),console.log(t)}))}}},computed:{delAlertStr:function(){return this.delMsg+"是否確定要刪除？\n***** 請注意！刪除後無法復原！*****"}}},l=o,c=a("2877"),u=Object(c["a"])(l,s,i,!1,null,"9e645470",null);e["a"]=u.exports},d2c2:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("CCard",[a("CCardHeader",{staticClass:"h5 font-weight-bold"},[a("CIcon",{staticClass:"mt-0",attrs:{name:"cil-restaurant"}}),t._v(" 餐點管理 ")],1),a("CCardBody",[a("ul",{staticClass:"nav nav-tabs mb-3"},[t._l(t.mealCateList,(function(e){return a("li",{key:e.id,staticClass:"nav-item",attrs:{active:t.currCateId==e.id}},[a("a",{staticClass:"nav-link",class:{active:t.currCateId==e.id},attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.currCateChanged(e.id)}}},[t._v(t._s(e.name_zh))])])})),a("IconButton",{staticClass:"align-self-center ml-3 py-0",attrs:{color:"dark",variant:"outline",size:"sm",icon:"cil-pencil"},on:{clickFn:function(e){return t.editCate()}}},[t._v("修改類別")])],2),a("CAlert",{attrs:{color:"info",closeButton:""}},[a("p",[t._v(" 拖曳前方的 "),a("span",{staticClass:"border border-dark px-1"},[a("CIcon",{staticClass:"align-text-bottom",attrs:{name:"cil-elevator"}})],1),t._v(" 來進行排序，修改後請按下方的 "),a("span",{staticClass:"border border-dark rounded px-1"},[t._v("儲存排序")]),t._v(" 。 ")]),a("p",{staticClass:"mb-0"},[t._v(" 如需更換餐點所屬的子類別，請點擊該餐點的 "),a("span",{staticClass:"border border-dark rounded px-1"},[t._v("編輯")]),t._v(" 按鈕前往頁面進行修改。 ")])]),a("p",{directives:[{name:"show",rawName:"v-show",value:0==t.mealList.length,expression:"mealList.length == 0"}],staticClass:"text-muted text-center my-4"},[t._v("此類別中尚無餐點")]),t._l(t.mealList,(function(e){return a("div",{key:"subCate"+e.subCateId},[a("p",{staticClass:"h4 font-weight-bold mt-4"},[t._v(" "+t._s(e.subCateName)+" ")]),a("draggable",{staticClass:"list-unstyled px-4",attrs:{tag:"ul",list:e.meals,handle:".move-icon",animation:200},on:{change:function(e){t.changed=!0}}},[a("transition-group",{attrs:{name:"flip-list"}},t._l(e.meals,(function(e){return a("li",{key:e.id,staticClass:"row align-items-center border mb-3"},[a("CIcon",{attrs:{name:"cil-elevator",customClasses:"move-icon border-right"}}),a("div",{staticClass:"col text-left"},[t._v(t._s(e.name))]),a("div",{staticClass:"col-auto d-flex align-items-center"},[e.public?t._e():a("CBadge",{staticClass:"label-badge ml-3",attrs:{color:"light"}},[t._v("隱藏")]),e.limitDate?a("CBadge",{staticClass:"small ml-3",attrs:{color:"warning-light"}},[t._v(" 期間限定 "),a("br"),t._v(" "+t._s(t.limitDateFormat(e.limitDate))+" ")]):t._e(),a("span",{staticClass:"ml-3"},[t._v("$ "+t._s(e.price))])],1),a("ProcessButtons",{staticClass:"border-left pl-3",attrs:{"is-change":t.changed,"item-id":e.id,"item-group":"meal","edit-url":"/mngt/meal/edit/"},on:{reloadFn:t.init}})],1)})),0)],1)],1)}))],2),a("CCardFooter",{attrs:{align:"right"}},[a("CButton",{staticClass:"mr-2",attrs:{color:"info"},on:{click:function(e){return t.addMeal()}}},[t._v("新增餐點")]),a("CButton",{attrs:{color:"success"},on:{click:function(e){return t.saveSort()}}},[t._v("儲存排序")])],1)],1)},i=[],n=a("35ab"),r=a("20fc"),o=a("b76a"),l=a.n(o),c=a("c4f1"),u={name:"Meal",components:{draggable:l.a,ProcessButtons:c["a"]},data:function(){return{currCateId:this.$route.query.cate,mealCateList:[],mealList:[],changed:!1}},mounted:function(){this.init()},methods:{init:function(){this.getMealCateList()},getMealCateList:function(){var t=this;this.$store.commit("set",["globalLoading",!0]);var e=n["a"].getUrl("mealCate","getAll");r["a"].get(e,(function(e){if(e.restData){var a=e.restData;t.mealCateList=a.map((function(t){var e={id:t.id,name_zh:t.zhName};return e})),console.log("查詢餐點類別成功!"),t.currCateId||(t.currCateId=t.mealCateList[0].id),t.getMealList(),t.$store.commit("set",["globalLoading",!1])}}),(function(t){console.log("查詢餐點類別失敗!"),console.log(t)}))},getMealList:function(){var t=this;this.$store.commit("set",["globalLoading",!0]);var e=n["a"].getUrl("meal","getAll")+this.currCateId;r["a"].get(e,(function(e){e.restData&&(t.mealList=e.restData,t.$store.commit("set",["globalLoading",!1]),console.log("查詢餐點成功!"))}),(function(t){console.log("查詢餐點失敗!"),console.log(t)}))},limitDateFormat:function(t){var e=t.toString(),a=e.substr(0,4),s=e.substr(4,2),i=e.substr(6,2);return"".concat(a,".").concat(s,".").concat(i)},currCateChanged:function(t){this.currCateId=t,this.getMealList(),this.$router.replace("/mngt/meal?cate="+t)},checkChanged:function(){return!this.changed||!!confirm("頁面內容曾修改過，尚未儲存修改的變更將會捨棄！\n是否確定要離開此頁面？")},editCate:function(){this.checkChanged()&&this.$router.push("/mngt/meal/cate")},addMeal:function(){this.checkChanged()&&this.$router.push("/mngt/meal/create?cate="+this.currCateId)},saveSort:function(){var t=this;this.$store.commit("set",["globalLoading",!0]);var e=[];this.mealList.forEach((function(t){t.meals.forEach((function(t,a){e.push({id:t.id,sort:a+1})}))}));var a=n["a"].getUrl("meal","saveSort");r["a"].put(a,e,(function(e){t.$store.commit("set",["globalLoading",!1]),console.log("修改餐點排序成功!"),t.getMealList()}),(function(t){console.log("修改餐點排序失敗!"),console.log(t)}))}}},d=u,m=(a("a440"),a("2877")),g=Object(m["a"])(d,s,i,!1,null,"3b5a4163",null);e["default"]=g.exports}}]);
//# sourceMappingURL=chunk-6f439858.b4675851.js.map