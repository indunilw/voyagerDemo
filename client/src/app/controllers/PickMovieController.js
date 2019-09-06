angular.module("PickMovieModule",[]).controller("PickMovieController",function($scope,$http){
    $scope.exmovies = [];
    $scope.newmovies = [];
    $scope.getExistingMovies = function(){
        var url = "src/movies.json";
        $http.get(url).then(function(response){
            $scope.exmovies = response.data;
        },function(message){
            alert("Something has gone wrong!");
        }); 
    }
    $scope.SearchMovies = function(){
        var url ="https://api.themoviedb.org/3/search/movie?api_key=7dc05f38054edcdb8ff1b1f69f884a71&language=en-US&query="+$scope.SearchMovie+"&page=1&include_adult=false";
        $http.get(url).then(function(response){
                $scope.newmovies = response.data["results"];
        },function(message){
            alert("Something went wrong!");
        });
    }
});