var app = angular.module("clientFashionApp", ["ngRoute", "ngSanitize"]);

var API_URL = "http://localhost:4000";

// ===== Routes =====
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeCtrl",
        })
        .when("/detail/:id", {
            templateUrl: "views/detail.html",
            controller: "DetailCtrl",
        })
        .otherwise({ redirectTo: "/" });
});

// ===== Fashion Service =====
app.factory("FashionService", function ($http) {
    return {
        getAll: function () {
            return $http.get(API_URL + "/fashions");
        },
        getByStyle: function (style) {
            return $http.get(API_URL + "/fashions/style/" + encodeURIComponent(style));
        },
        getById: function (id) {
            return $http.get(API_URL + "/fashions/" + id);
        },
    };
});

// ===== Home Controller =====
app.controller("HomeCtrl", function ($scope, FashionService) {
    $scope.allFashions = [];
    $scope.groupedFashions = {};
    $scope.styles = [];
    $scope.searchStyle = "";
    $scope.selectedStyle = "";
    $scope.loading = true;
    $scope.isFiltered = false;

    function loadAllFashions() {
        $scope.loading = true;
        FashionService.getAll().then(function (response) {
            $scope.allFashions = response.data;
            groupByStyle(response.data);
            // Extract unique styles
            var styleSet = {};
            response.data.forEach(function (f) {
                styleSet[f.style] = true;
            });
            $scope.styles = Object.keys(styleSet).sort();
            $scope.loading = false;
        });
    }

    function groupByStyle(fashions) {
        $scope.groupedFashions = {};
        fashions.forEach(function (f) {
            if (!$scope.groupedFashions[f.style]) {
                $scope.groupedFashions[f.style] = [];
            }
            $scope.groupedFashions[f.style].push(f);
        });
    }

    loadAllFashions();

    $scope.filterByStyle = function () {
        var style = $scope.selectedStyle || $scope.searchStyle;
        if (!style || style.trim() === "") {
            groupByStyle($scope.allFashions);
            $scope.isFiltered = false;
            return;
        }
        $scope.loading = true;
        $scope.isFiltered = true;
        FashionService.getByStyle(style).then(function (response) {
            groupByStyle(response.data);
            $scope.loading = false;
        });
    };

    $scope.onDropdownChange = function () {
        $scope.searchStyle = $scope.selectedStyle;
        $scope.filterByStyle();
    };

    $scope.clearFilter = function () {
        $scope.searchStyle = "";
        $scope.selectedStyle = "";
        $scope.isFiltered = false;
        groupByStyle($scope.allFashions);
    };
});

// ===== Detail Controller =====
app.controller("DetailCtrl", function ($scope, $routeParams, FashionService) {
    $scope.fashion = {};
    $scope.loading = true;

    FashionService.getById($routeParams.id).then(function (response) {
        $scope.fashion = response.data;
        $scope.loading = false;
    });
});
