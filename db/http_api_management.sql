/*
 Navicat Premium Data Transfer

 Source Server         : localhost_27017
 Source Server Type    : MongoDB
 Source Server Version : 50021
 Source Host           : localhost:27017
 Source Schema         : http_api_management

 Target Server Type    : MongoDB
 Target Server Version : 50021
 File Encoding         : 65001

 Date: 14/11/2023 15:43:35
*/


// ----------------------------
// Collection structure for test
// ----------------------------
db.getCollection("test").drop();
db.createCollection("test");

// ----------------------------
// Documents of test
// ----------------------------

// ----------------------------
// Collection structure for user
// ----------------------------
db.getCollection("user").drop();
db.createCollection("user");

// ----------------------------
// Documents of user
// ----------------------------
db.getCollection("user").insert([ {
    _id: ObjectId("655226cdb38c6852770d679a"),
    account: "admin",
    password: "6680a5d942b8b7108dfaecbbd4aa91ec",
    email: "1214166014@qq.com",
    nickName: "某君",
    entryTime: ISODate("2023-11-13T13:38:21.253Z")
} ]);
