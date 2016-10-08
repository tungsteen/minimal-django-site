"use strict";

require.config({
    paths: {
        jquery: "/static/jquery/jquery.min",
        bootstrap: "/static/bootstrap/js/bootstrap.min"
    }
});

requirejs(["jquery"],  function($) {
   $(window).ready(function() {
    console.log("Page is ready!");
   }); 
});
