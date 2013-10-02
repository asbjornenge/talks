require.config({
    baseUrl : '/scripts',
    paths: {
        jquery     : '../bower_components/jquery/jquery',
        text       : '../bower_components/requirejs-text/text',
        showdown   : '../bower_components/showdown/compressed/showdown',
        hightlight : '../bower_components/highlightjs/highlight.pack'
    },
    shim : {
      "hightlight": {
            exports : 'hljs'
        }
    }
});

require([
    'jquery',
    'section_src_extractor',
    'hightlight'
    ], function($, section_src_extractor, hljs) {
        console.log(hljs)
        $(document).ready(function() {
            $('section').each(function(i,s) {
                section_src_extractor.extract(s, function(html,extractor) {
                    $(s).html(html);
                    $(s).addClass(extractor);
                    $(s).find('pre code').each(function(i, e) {console.log(e);hljs.highlightBlock(e)});
                })
            })
        });
});
