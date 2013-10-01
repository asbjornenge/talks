require.config({
    paths: {
        jquery: '../../bower_components/jquery/jquery'
    }
});

require(['jquery'], function($) {
    console.log("GETS HERE!",$)
});
