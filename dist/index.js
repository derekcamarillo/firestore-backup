"use strict";var __assign=(this&&this.__assign)||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))
t[p]=s[p];}
return t;};return __assign.apply(this,arguments);};var __createBinding=(this&&this.__createBinding)||(Object.create?(function(o,m,k,k2){if(k2===undefined)k2=k;Object.defineProperty(o,k2,{enumerable:true,get:function(){return m[k];}});}):(function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];}));var __setModuleDefault=(this&&this.__setModuleDefault)||(Object.create?(function(o,v){Object.defineProperty(o,"default",{enumerable:true,value:v});}):function(o,v){o["default"]=v;});var __importStar=(this&&this.__importStar)||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(k!=="default"&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);__setModuleDefault(result,mod);return result;};Object.defineProperty(exports,"__esModule",{value:true});exports.backups=exports.restore=exports.backup=exports.admin=exports.initializeApp=void 0;var admin=__importStar(require("firebase-admin"));exports.admin=admin;var restoreService=__importStar(require("./import"));var backupService=__importStar(require("./export"));var initializeApp=function(serviceAccount,name,options){if(name===void 0){name='[DEFAULT]';}
if(options===void 0){options={};}
if(admin.apps.length===0||(admin.apps.length>0&&admin.app().name!==name)){admin.initializeApp({credential:admin.credential.cert(serviceAccount),databaseURL:serviceAccount['databaseURL'],},name);admin.firestore().settings(__assign({timestampsInSnapshots:true},options.firestore));}
return true;};exports.initializeApp=initializeApp;var backup=function(collectionName,options){return backupService.backup(collectionName,options);};exports.backup=backup;var restore=function(fileName,options){if(options===void 0){options={};}
return restoreService.restore(fileName,options);};exports.restore=restore;var backups=function(collectionNameArray,options){if(collectionNameArray===void 0){collectionNameArray=[];}
return backupService.getAllCollections(collectionNameArray,options);};exports.backups=backups;