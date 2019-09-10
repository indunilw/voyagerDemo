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
    $scope.formData ={};
    $scope.MoviesNew= [];
    $scope.selectedRow = 999;

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
        $scope.users = 28;
    };

    $scope.getNotSubmitted = function() {
        $scope.notSubmitted = 15;
    };

    $scope.getNoOfMovies = function() {
        $scope.movies = 12;
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
                {
                    "title":"Avengers: Endgame",
                    "release_date":"2019-04-26",
                    "overview":"After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
                    "vote_average":"8.3",
                    "img":"/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
                },
                {
                    "title":"The Dark Knight",
                    "release_date":"2011-07-11",
                    "overview":"In a post-apocalyptic world ravaged by feuding warlords, a group of desperate soldiers hatch a plan to steal a Warlord's treasure and start a new life. Faced with the threat of a horrific death at the hands of the Warlord's executioners, the men escape into a desolate and forbidden land known only as the Shadowlands. Now the men must flee from the Warlord's vicious assassins while defending themselves from the terrifying creatures that inhabit the land.",
                    "vote_average":"6.6",
                    "img":"/kyjTDE5vldkUpJGErAvqYY6J92M.jpg"
                }
            ];
        },function(message){
            alert("Something not correct!");
        });
    }

    $scope.getUserDetails = function(){
        var url = "#/movies";
        $http.get(url).then(function(response){
            $scope.UserDetails = [
                {
                    "id":"1",
                    "user_name":"Sunella Fernando",
                    "role":"Admin",
                    "submitted":"Yes"
                },
                {
                    "id":"2",
                    "user_name":"Dilini Dandeniya",
                    "role":"User",
                    "submitted":"NO"
                },
                {
                    "id":"3",
                    "user_name":"Harry Manoharan",
                    "role":"User",
                    "submitted":"Yes"
                },
                {
                    "id":"4",
                    "user_name":"Achintha Premarathne",
                    "role":"User",
                    "submitted":"Yes"
                },
                {
                    "id":"5",
                    "user_name":"Indunil Withana",
                    "role":"User",
                    "submitted":"Yes"
                }

            ];
        },function(message){
            alert("Something not correct!");
        });
    }
    $scope.Save = function(){
        window.location = '#/';
    }
    $scope.Cancel = function(){
        window.location = '#/';
    }

    $scope.setClickedRow = function(index){
        $scope.selectedRow = index;

    }
}