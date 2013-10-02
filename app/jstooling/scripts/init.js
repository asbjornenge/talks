/** @jsx React.DOM */
require.config({
    baseUrl : '/scripts',
    paths: {
        jquery         : '../bower_components/jquery/jquery',
        text           : '../bower_components/requirejs-text/text',
        showdown       : '../bower_components/showdown/compressed/showdown',
        hightlight     : '../bower_components/highlightjs/highlight.pack',
        react          : '../bower_components/react/react',
        JSXTransformer : '../bower_components/react/JSXTransformer',
        jsx            : "../scripts/jsx"
    },
    shim : {
      hightlight : {
            exports : 'hljs'
        },
        JSXTransformer: {
            exports: 'JSXTransformer'
        }
    }
});

require([
    'jquery',
    'section_src_extractor',
    'hightlight',
    'jsx!../scripts/presentation'
    ], function($, section_src_extractor, hljs, pres) {
        $(document).ready(function() {
            pres.render([
                {src:'intro_speaker.html'},
                {src:'intro_talk.html'}
            ],$('body')[0])
            // $('section').each(function(i,s) {
            //     section_src_extractor.extract(s, function(html,extractor) {
            //         $(s).html(html);
            //         $(s).addClass(extractor);
            //         $(s).find('pre code').each(function(i, e) {console.log(e);hljs.highlightBlock(e)});
            //     })
            // })
        });
});
