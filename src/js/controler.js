angular.module('tutorialApp', [])
    .controller('GUICtrl', function ($scope, $compile) {
        $scope.setup = {
            "lang": "de",
            "theme": "dark-hive",
            "snap_grid": "",
            "tooltip": "",
            "fbs_wrap": true,
            "LT_open": false,
            "last_file": "",
            "update": true,
            "user_name": "",
            "user_mail": "",
        };


        $scope.mbs = {};
        $scope.fbs = {};
        $scope.con = {
            mbs: {},
            fbs: {}
        };

        $scope.save_scope_watchers = function () {
            $scope.orig = angular.copy($scope.$$watchers);
        };

        $scope.reset_scope_watchers = function () {
            $scope.$$watchers = angular.copy($scope.orig);
        };

        $scope.add_mbs = function (id, data) {

            $scope.mbs[id] = data;
            $scope.$apply();
            console.log($scope)

        };

        $scope.append = function (wo, was) {
            var data = $compile(was);
            angular.element(wo).append(data($scope));
            $scope.$apply();
        };

//        $scope.$watch("mbs", function (newValue, oldValue) {
//            console.log("change mbs")
//
//        }, true);

//        $scope.$watch("fbs", function (newValue, oldValue) {
//            console.log("change fbs")
//        }, true);




//SETUP WATCHER ------------------------------------------------------------------------------------
        $scope.$watch("setup.snap_grid", function (newValue) {
            if (newValue) {
                $("#img_set_grid_on").addClass("ui-state-focus")
            } else {
                $("#img_set_grid_on").removeClass("ui-state-focus")
            }
        });
//-------------------------------------------------------------------------------------------------
        $(document).tooltip({
            content: function () {
                return $(this).attr('title');
            }
        });
        $scope.$watch("setup.tooltip", function (newValue) {
            if (newValue) {
                $("#img_set_tooltip_on").addClass("ui-state-focus");
                $(document).tooltip("enable");

            } else {
                $("#img_set_tooltip_on").removeClass("ui-state-focus");
                var collection = $("[title]");
                $(document).tooltip("disable");
                collection.attr("title", "");
            }
        });
//-------------------------------------------------------------------------------------------------
        $scope.$watch("setup.theme", function (newValue) {
            var theme = $scope.setup.theme;
            if (theme == undefined) {
                theme = "dark-hive"
            }
            $("#theme_css").remove();
            $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + theme + '/jquery-ui.min.css"/>');
            setTimeout(function () {
                document.styleSheets[1].cssRules[3].style["background-color"] = $(".frame_color").css("background-color");
                document.styleSheets[1].cssRules[4].style["background-color"] = $(".frame_color").css("background-color");
            }, 500);

        });
//-------------------------------------------------------------------------------------------------
    });


