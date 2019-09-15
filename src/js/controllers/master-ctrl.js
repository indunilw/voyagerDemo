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
    $scope.HideDetails = true;
    $scope.formData ={};
    $scope.MoviesNew= [];
    $scope.MovieDetails= [];
    $scope.selectedRow = 999;
    $scope.variablechange ="Search Movies";
    $scope.classchange = "fa fa-search"
    $scope.stylecolor = "Black";
    $scope.MovieCount=0;
    $scope.MovieListDb={};
    $scope.UserName = "";
    $scope.imageUrl = "";
    $scope.UserDetails = {};
    $scope.selectedRowHome = {};
    $scope.MovieMapperDetails = {};


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

    $scope.getSubmitted = function() {
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
    $scope.Save = function(){
        if($scope.selectedRow !=null){
            $scope.MovieListDb={
                "email":sessionStorage.getItem('Email'),
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
            var url = "https://imdbokazservice.herokuapp.com/AddFavoriteMovie";
            $scope.MovieMapperDetails = {
                "email":sessionStorage.getItem('Email'),
                "title":$scope.MoviesNew[$scope.selectedRowFav].title
            }
            $http.post(url,$scope.MovieMapperDetails).then(function(response){
                $scope.ShowAlert=true;
                $scope.getMovies();
            },function(message){
                alert("Something is not correct");
            });

        }
    }
    $scope.Cancel = function(){
        window.location = '#/';
    }
    $scope.setClickedRowHome = function(index){
        $scope.selectedRowHome = index;
        $scope.HideDetails = false;
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
        $scope.classchange = $scope.variable? "fa fa-heart":"fa fa-search";
        $scope.stylecolor = $scope.variable? "Red":"Black";
    }
    $scope.ShowDetails = function(){
        var url = "https://imdbokazservice.herokuapp.com/findByTitle/"+$scope.MoviesNew[$scope.selectedRowHome].title;
        $http.get(url).then(function(response){
            $scope.MoviesCard = response.data;
            window.location = '#/popup';
        },function(message){
            alert("Error!");
        });
    }  
    $scope.getUserProfile = function(){
        $scope.UserName = sessionStorage.getItem('Name');
        $scope.imageUrl = sessionStorage.getItem('Image');
    }
    $scope.navigate = function(){
        window.location = "#/home";
    }
    $scope.AddUser = function(){
        $scope.UserDetails={
            "user_id":"null",
            "email":sessionStorage.getItem('Email'),
            "first_name":sessionStorage.getItem('Fname'),
            "last_name":sessionStorage.getItem('Lname'),
            "image_url":sessionStorage.getItem('Image'),
        };
        var url = "https://imdbokazservice.herokuapp.com/addUser";
        $http.post(url,$scope.UserDetails).then(function(){
            $scope.UserDetails={};
        },function(){
            alert("Error!");
        });
    }
}





