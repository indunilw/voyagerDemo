/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore','$http', MasterCtrl]);

function MasterCtrl($scope, $cookieStore,$http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    $scope.ExistMovies = [];
    $scope.HideSave =true;
    $scope.ShowAlert = false;
    $scope.formData ={};
    $scope.MoviesNew= [];
    $scope.MovieDetails= [];
    $scope.selectedRow = 999;
    $scope.variablechange ="Search Movies";
    $scope.MovieCount=0;
    $scope.MovieListDb={};
    $scope.UserName = "";
    $scope.imageUrl = "";


    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    $scope.getUsers = function() {
        var url="https://imdbokazservice.herokuapp.com/getuser";
        $http.get(url).then(function(response){
            $scope.UserCount = response.data;
        },function(message){
            alert("Error!");
        });
    };

    $scope.geSubmitted = function() {
        var url="https://imdbokazservice.herokuapp.com/getAllMapper";
        $http.get(url).then(function(response){
            $scope.SubmitCount = response.data;
        },function(message){
            alert("Error!");
        });
    };

    $scope.getNoOfMovies = function() {
       var url="https://imdbokazservice.herokuapp.com/getMovies";
       $http.get(url).then(function(response){
            $scope.MovieCount = response.data;
       },function(message){
            alert("Error!");
       });
    };


    window.onresize = function() {
        $scope.$apply();
    };
    
    $scope.getExistingMovies = function(){
        if($scope.formData.SearchMovies!=""){
            var url ="https://api.themoviedb.org/3/search/movie?api_key=7dc05f38054edcdb8ff1b1f69f884a71&language=en-US&query="+$scope.formData.SearchMovies+"&page=1&include_adult=false";
            $http.get(url).then(function(response){
                $scope.ExistMovies = response.data["results"];                
            },function(message){
                alert("Something has gone wrong!");
            });
        }else{
            $scope.ExistMovies = [];
        }
    }

    $scope.getMovies = function(){
        var url = "https://imdbokazservice.herokuapp.com/getMovies";
        $http.get(url).then(function(response){
            $scope.MoviesNew = response.data;
        },function(message){
            alert("Something not correct!");
        });
    }

    $scope.getUserDetails = function(){
        var url = "https://imdbokazservice.herokuapp.com/getuser";
        $http.get(url).then(function(response){
            $scope.UserDetails = response.data;
        },function(message){
            alert("Something not correct!");
        });
    }
    $scope.getMovie = function(){
        var url = "#/movies";
        $http.get(url).then(function(response){
            $scope.MoviesNew = [
                {
                    "title":"The Angry Birds Movie 2",
                    "release_date":"2019-08-14",
                    "overview":"Red, Chuck, Bomb and the rest of their feathered friends are surprised when a green pig suggests that they put aside their differences and unite to fight a common threat. Aggressive birds from an island covered in ice are planning to use an elaborate weapon to destroy the fowl and swine.",
                    "vote_average":"6",
                    "img":"/ebe8hJRCwdflNQbUjRrfmqtUiNi.jpg"
                },
               
            ];
        },function(message){
            alert("Something not correct!");
        });
    }
    $scope.Save = function(){
        if($scope.selectedRow !=null){
            $scope.MovieListDb={
                "movie_id":"null",
                "tmdb_id":$scope.ExistMovies[$scope.selectedRow].id,
                "title":$scope.ExistMovies[$scope.selectedRow].title,
                "description":$scope.ExistMovies[$scope.selectedRow].overview,
                "rating":$scope.ExistMovies[$scope.selectedRow].vote_average,
                "genere":"null",
                "poster_url":$scope.ExistMovies[$scope.selectedRow].poster_path,
                "year":$scope.ExistMovies[$scope.selectedRow].release_date
            };
            var url = "https://imdbokazservice.herokuapp.com/addMovie";
            $http.post(url,$scope.MovieListDb).then(function(){
                $scope.ShowAlert=true;
                $scope.getMovies();
            },function(){
            alert("Something is not correct");
            });
        }else{
            //post to mapper table.
        }
    }
    $scope.Cancel = function(){
        window.location = '#/';
    }
    $scope.setClickedRowFav = function(index){
        $scope.selectedRowFav = index;
        $scope.selectedRow = null;
        $scope.HideSave = false;
    }

    $scope.setClickedRow = function(index){
        $scope.selectedRow = index;
        $scope.selectedRowFav = null;
        $scope.HideSave = false;
    }
    $scope.ButtonSwitch = function(){
        $scope.variable=!$scope.variable;
        $scope.variablechange =$scope.variable? "Choose from Favorites":"Search Movies";
    }
    $scope.ShowDetails = function(){
        window.location = '#/popup';
    }  
    $scope.getUserProfile = function(){
        $scope.UserName = sessionStorage.getItem('Name');
        $scope.imageUrl = sessionStorage.getItem('Image');
    }
    $scope.navigate = function(){
        window.location = "#/home";
    }

}





