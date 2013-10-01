require.config({
    baseUrl : '/scripts',
    paths: {
        jquery   : '../bower_components/jquery/jquery',
        text     : '../bower_components/requirejs-text/text',
        showdown : '../bower_components/showdown/compressed/showdown'
    }
});

require([
    'jquery',
    'section_extractor'
    ], function($, section_extractor) {
        $(document).ready(function() {
            $('section').each(function(i,s) {
                section_extractor.extract(s, function(html) {
                    $(s).html(html);
                })
            })
        });
});
