/** @jsx React.DOM */
require.config({
    baseUrl : '/scripts',
    paths: {
        jquery         : '../bower_components/jquery/jquery',
        text           : '../bower_components/requirejs-text/text',
        showdown       : '../bower_components/showdown/compressed/showdown',
        highlight      : '../bower_components/highlightjs/highlight.pack',
        react          : '../bower_components/react/react',
        JSXTransformer : '../bower_components/react/JSXTransformer',
        jsx            : "../scripts/jsx"
    },
    shim : {
      highlight : {
            exports : 'hljs'
        },
        JSXTransformer: {
            exports: 'JSXTransformer'
        }
    }
});

require([
    'jquery',
    'jsx!../scripts/presentation',
    'jsx!../scripts/cloud'
    ], function($, pres, clouds) {
        $(document).ready(function() {
            pres.render([
                {src:'intro_speaker.html'},
                {src:'yo.html'},
                {src:'grunt.html'},
                {src:'bower.html'}
            ], $('#presentation')[0]);
            clouds.scatter($('#clouds')[0]);
        });
});

