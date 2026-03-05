var app = angular.module("adminFashionApp", ["ngRoute", "ngSanitize"]);

var API_URL = "http://localhost:4000";

// ===== Routes =====
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/list.html",
            controller: "FashionListCtrl",
        })
        .when("/add", {
            templateUrl: "views/form.html",
            controller: "FashionAddCtrl",
        })
        .when("/edit/:id", {
            templateUrl: "views/form.html",
            controller: "FashionEditCtrl",
        })
        .when("/detail/:id", {
            templateUrl: "views/detail.html",
            controller: "FashionDetailCtrl",
        })
        .otherwise({ redirectTo: "/" });
});

// ===== Fashion Service =====
app.factory("FashionService", function ($http) {
    return {
        getAll: function () {
            return $http.get(API_URL + "/fashions");
        },
        getById: function (id) {
            return $http.get(API_URL + "/fashions/" + id);
        },
        create: function (fashion) {
            return $http.post(API_URL + "/fashions", fashion);
        },
        update: function (id, fashion) {
            return $http.put(API_URL + "/fashions/" + id, fashion);
        },
        remove: function (id) {
            return $http.delete(API_URL + "/fashions/" + id);
        },
    };
});

// ===== Summernote Directive =====
app.directive("summernote", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {
            $(element).summernote({
                height: 250,
                toolbar: [
                    ["style", ["style"]],
                    ["font", ["bold", "italic", "underline", "strikethrough", "clear"]],
                    ["fontname", ["fontname"]],
                    ["fontsize", ["fontsize"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["table", ["table"]],
                    ["insert", ["link", "picture", "video"]],
                    ["view", ["fullscreen", "codeview", "help"]],
                ],
                callbacks: {
                    onChange: function (contents) {
                        scope.$apply(function () {
                            ngModel.$setViewValue(contents);
                        });
                    },
                },
            });

            ngModel.$render = function () {
                $(element).summernote("code", ngModel.$viewValue || "");
            };
        },
    };
});

// ===== List Controller =====
app.controller("FashionListCtrl", function ($scope, $rootScope, FashionService) {
    $scope.fashions = [];
    $scope.loading = true;

    function loadFashions() {
        $scope.loading = true;
        FashionService.getAll().then(function (response) {
            $scope.fashions = response.data;
            $scope.loading = false;
        });
    }

    loadFashions();

    // Delete modal logic (using $rootScope for modal in index.html)
    $rootScope.showDeleteModal = false;
    $rootScope.deletingFashion = null;

    $scope.askDelete = function (fashion) {
        $rootScope.deletingFashion = fashion;
        $rootScope.showDeleteModal = true;
    };

    $rootScope.cancelDelete = function () {
        $rootScope.showDeleteModal = false;
        $rootScope.deletingFashion = null;
    };

    $rootScope.confirmDelete = function () {
        if ($rootScope.deletingFashion) {
            FashionService.remove($rootScope.deletingFashion._id).then(function () {
                $rootScope.showDeleteModal = false;
                $rootScope.deletingFashion = null;
                loadFashions();
            });
        }
    };
});

// ===== Add Controller =====
app.controller("FashionAddCtrl", function ($scope, $location, FashionService) {
    $scope.formTitle = "Add New Fashion";
    $scope.fashion = {
        title: "",
        details: "",
        thumbnail: "",
        style: "",
    };
    $scope.styles = ["Street Style", "Casual", "Formal"];
    $scope.saving = false;

    $scope.saveFashion = function () {
        if (!$scope.fashion.title || !$scope.fashion.style) return;
        $scope.saving = true;
        FashionService.create($scope.fashion).then(function () {
            $location.path("/");
        });
    };
});

// ===== Edit Controller =====
app.controller("FashionEditCtrl", function ($scope, $location, $routeParams, FashionService) {
    $scope.formTitle = "Edit Fashion";
    $scope.fashion = {};
    $scope.styles = ["Street Style", "Casual", "Formal"];
    $scope.saving = false;
    $scope.loading = true;

    FashionService.getById($routeParams.id).then(function (response) {
        $scope.fashion = response.data;
        $scope.loading = false;
    });

    $scope.saveFashion = function () {
        if (!$scope.fashion.title || !$scope.fashion.style) return;
        $scope.saving = true;
        FashionService.update($routeParams.id, $scope.fashion).then(function () {
            $location.path("/");
        });
    };
});

// ===== Detail Controller =====
app.controller("FashionDetailCtrl", function ($scope, $routeParams, FashionService) {
    $scope.fashion = {};
    $scope.loading = true;

    FashionService.getById($routeParams.id).then(function (response) {
        $scope.fashion = response.data;
        $scope.loading = false;
    });
});
