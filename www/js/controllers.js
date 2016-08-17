var app = angular.module('starter.controllers', []);

app.controller('CalcCtrl', function($scope) {
  $scope.test = "HI";
  var num1 = "";
  var num2 = "";
  var op = "";
  $scope.result = "0.";
  $scope.sendInput = function (input) {
    if (!op) {
      num1 += input;
      $scope.result = num1;
    }
    else {
      num2 += input;
      $scope.result = num2;
    }
  };
  $scope.handleDot = function () {
    if (!$scope.result.toString().indexOf('.')<0)
      $scope.sendInput('.');
  };
  $scope.operate = function (input) {
    if(!op)
      op = input;
    if(op && num1 && num2) {
      calculate(input);
      op = input;
    }
  };
  $scope.calculate = function (input) {
    switch (op) {
      case "+":
        $scope.result = num1 + num2;
        break;
      case "-":
        $scope.result = num1 - num2;
        break;
      case "x":
        $scope.result = num1 * num2;
        break;
      case "/":
        $scope.result = num1 / num2;
        break;
    }
    if(input)
      num1 = $scope.result;
    else
      num1 = num2 = "";
    op = "";
    return 0;
  };

});

app.directive('numPad', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      val: '@',
      calc: '='
    },
    link: function (scope, elem, attrs) {
      scope.sendInput = function (input) {
       // alert(scope.test);
        scope.calc(input);
      }
    },
    template: '<button  class="col button button-stable" ng-click="sendInput(val)">{{val}}</button>'
  }
});


