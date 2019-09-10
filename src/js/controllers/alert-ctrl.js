/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('AlertsCtrl', ['$scope', AlertsCtrl]);

function AlertsCtrl($scope) {
    $scope.alerts = [{
        type: 'info',
        msg: 'Thanks for visiting! Feel free to select a movie that you wish!'
    }];

    $scope.alerts2 =[{
        type: 'info',
        msg: 'Choose a movie from current favorites or feel free to choose a new one!'
    }];

    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.closeAlert2 = function(index){
        $scope.alerts2.splice(index,1);
    }
}