(function () {
    "use strict";

    angular
        .module("lnSortable", [])
        .directive("lnSortable", lnSortable);

    function lnSortable() {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {
            var lnAxis = attributes.lnAxis;
            $(element).sortable({
                axis: lnAxis,
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    var temp = scope.model.fields[start];
                    scope.model.fields[start] = scope.model.fields[end];
                    scope.model.fields[end] = temp;
                    scope.$apply();
                }
            });
        }

        return {
            link: link
        };
    }
})();