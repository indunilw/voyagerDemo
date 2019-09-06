angular.module("PickMovieModule",[]).controller("PickMovieController",function($scope,$http){
    $scope.exmovies = [];
    $scope.temp = [];
    $scope.getExistingMovies = function(){
        var url = "src/movies.json";
        $http.get(url).then(function(response){
            $scope.exmovies = response.data;
        },function(message){
            alert("Something has gone wrong!");
        }); 
    }
    $scope.SearchMovies = function(){
        var url = "https://www.omdbapi.com/?s=" +$scope.SearchMovie+ "&apikey=a3014e29";
        $http.get(url).then(function(response){
                $scope.temp = response.data["Search"];
        },function(message){
            alert("Something went wrong!");
        });
    }
});