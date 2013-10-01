define([], function() {
    'use strict';

    function extract_javascript(src, callback) {
        require([src], function(data) {
            callback(data);
        })
    }

    function extract_markdown(src, callback) {
        require(['showdown','text!'+src], function(Showdown, data) {
            var converter = new Showdown.converter();
            callback(converter.makeHtml(data));
        })
    }

    /** MAIN FUNCTION **/
    function extract_html_from_src(element, callback) {
        var src = element.getAttribute('src'),
            html;
        if (!src || src.split('.').length < 2) return element.innerHTML;
        switch(src.split('.')[1]) {
            case 'js':
                extract_javascript(src, callback)
                break;
            case 'md':
                extract_markdown(src, callback)
                break;
            // TODO - add html
            default:
                callback("<h2>Error</h2>");
        }
    }

    return {
        extract : extract_html_from_src
    }

})
