$(document).ready(function() {
    "use strict";
    var e = function(e) {
        var t = e.length ? e : $(e.target),
            a = t.data("output");
        window.JSON ? a.val(window.JSON.stringify(t.nestable("serialize"))) : a.val("JSON browser support required for this demo.")
    };
    $(".nestable").nestable({
        group: 1
    }).nestable()
});