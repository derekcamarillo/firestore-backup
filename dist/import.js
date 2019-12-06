"use strict";var __awaiter=(this&&this.__awaiter)||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}
return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}
function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}
function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}
step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=(this&&this.__generator)||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}
function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}
if(op[0]===3&&(!t||(op[1]>t[0]&&op[1]<t[3]))){_.label=op[1];break;}
if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}
if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}
if(t[2])_.ops.pop();_.trys.pop();continue;}
op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}
if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};var __importStar=(this&&this.__importStar)||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(Object.hasOwnProperty.call(mod,k))result[k]=mod[k];result["default"]=mod;return result;};Object.defineProperty(exports,"__esModule",{value:true});var admin=__importStar(require("firebase-admin"));var fs=__importStar(require("fs"));var updateTime=function(dateArray,documentObj){dateArray.forEach(function(c){c.split(".").reduce(function(acc,cur,i,a){if(!a[i+1]&&acc[cur]&&acc[cur]._seconds){acc[cur]=new Date(acc[cur]._seconds*1000);}
else
return acc[cur]||{};},documentObj);});};exports.restore=function(fileName,dateArray,geoArray){var db=admin.firestore();return new Promise(function(resolve,reject){if(typeof fileName==="object"){var dataArray=fileName;updateCollection(db,dataArray,dateArray,geoArray).then(function(){resolve({status:true,message:"Collection successfully imported!"});}).catch(function(error){reject({status:false,message:error.message});});}
else{fs.readFile(fileName,"utf8",function(err,data){if(err){console.log(err);reject({status:false,message:err.message});}
var dataArray=JSON.parse(data);updateCollection(db,dataArray,dateArray,geoArray).then(function(){resolve({status:true,message:"Collection successfully imported!"});}).catch(function(error){reject({status:false,message:error.message});});});}});};var updateCollection=function(db,dataArray,dateArray,geoArray){return __awaiter(void 0,void 0,void 0,function(){var _a,_b,_i,index,collectionName,_c,_d,_e,doc,subCollections;return __generator(this,function(_f){switch(_f.label){case 0:_a=[];for(_b in dataArray)
_a.push(_b);_i=0;_f.label=1;case 1:if(!(_i<_a.length))return[3,9];index=_a[_i];collectionName=index;_c=[];for(_d in dataArray[index])
_c.push(_d);_e=0;_f.label=2;case 2:if(!(_e<_c.length))return[3,8];doc=_c[_e];if(!dataArray[index].hasOwnProperty(doc))return[3,7];if(!dataArray[index][doc]["subCollection"])return[3,5];subCollections=dataArray[index][doc]["subCollection"];delete dataArray[index][doc]["subCollection"];return[4,startUpdating(db,collectionName,doc,dataArray[index][doc],dateArray,geoArray)];case 3:_f.sent();return[4,updateCollection(db,subCollections,[],[])];case 4:_f.sent();return[3,7];case 5:return[4,startUpdating(db,collectionName,doc,dataArray[index][doc],dateArray,geoArray)];case 6:_f.sent();_f.label=7;case 7:_e++;return[3,2];case 8:_i++;return[3,1];case 9:return[2];}});});};var startUpdating=function(db,collectionName,doc,data,dateArray,geoArray){var parameterValid=true;if(typeof dateArray==="object"&&dateArray.length>0){updateTime(dateArray,data);}
if(typeof geoArray!=="undefined"&&geoArray.length>0){geoArray.forEach(function(geo){if(data.hasOwnProperty(geo)){data[geo]=new admin.firestore.GeoPoint(data[geo]._latitude,data[geo]._longitude);}
else{console.log("Please check your geo parameters!!!",geoArray);parameterValid=false;}});}
if(parameterValid){return new Promise(function(resolve){db.collection(collectionName).doc(doc).set(data).then(function(){console.log(doc+" was successfully added to firestore!");resolve("Data written!");}).catch(function(error){console.log(error);});});}
else{console.log(doc+" was not imported to firestore. Please check your parameters or ignore if you don't need to import the property above.");return false;}};