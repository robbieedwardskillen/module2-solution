(function () {
'use strict';

angular.module('ShoppingListCheckOff', []).controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var to_buy = this;
  to_buy.itemName = "";
  to_buy.itemQuantity = "";
  to_buy.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  to_buy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  to_buy.initializeItem = function (itemName, itemQuantity) {
    to_buy.itemName = itemName;
    to_buy.itemQuantity = itemQuantity;
      ShoppingListCheckOffService.initializeItem(to_buy.itemName, to_buy.itemQuantity);
  };
  to_buy.addItem = function (itemName, itemQuantity) {
    ShoppingListCheckOffService.addItem(itemName, itemQuantity);
    to_buy.allBought = ShoppingListCheckOffService.checkIfAllBought();
    to_buy.anythingBought = ShoppingListCheckOffService.checkIfAnythingBought();
  };
  to_buy.removeItem = function(itemName){
    ShoppingListCheckOffService.removeItem(itemName);
  }
} 
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.anythingBought = ShoppingListCheckOffService.checkIfAnythingBought();
  bought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  bought.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
}
function contains(array, value){
  for (var i = 0; i < array.length; i++)
  {
    if (array[i].name == value){
      return true;
    }
  }
  return false;
}

function ShoppingListCheckOffService() {
  var service = this;
  var boughtItems = [];
  var toBuyItems = [];
  service.checkIfAnythingBought = function(){
    if (boughtItems.length > 0){
      return true;
    } 
    else{
      return false;
    }
  };
  service.initializeItem = function (itemName, itemQuantity) {
      var item = {
        quantity: itemQuantity,
        name: itemName
      };
      toBuyItems.push(item);
  };
  service.addItem = function (itemName, itemQuantity) {
      var item = {
        quantity: itemQuantity,
        name: itemName
      };
      boughtItems.push(item);
  };
  service.checkIfAllBought = function(){
      if (contains(boughtItems, "cookie") && contains(boughtItems, "ham") && 
      contains(boughtItems, "turkey") && contains(boughtItems, "bacon")
       && contains(boughtItems, "egg")){
        return true;
      }
        return false;
  };
  service.removeItem = function(itemName){
    for (var i = 0; i < toBuyItems.length; i++){
      if (toBuyItems[i].name == itemName){
        toBuyItems.splice(i, 1);
      }
    }
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };
    service.getToBuyItems = function () {
    return toBuyItems;
  };
}

})();
