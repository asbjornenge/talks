/** @jsx React.DOM */
define(['react'], function(React) {

    function createCloudStyle(animation_name, size) {
        var anim   = "@-webkit-keyframes "+animation_name+" {\
            100% {-webkit-transform: translateX(-100%) scale("+size+","+size+");}\
        }";
        var style  = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(anim));
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    var Sky = React.createClass({
        render : function() {
            var clouds = [];
            var sizes  = ["0.5","0.8","0.3"];
            for (var i=0; i<parseInt(this.props.clouds); i++) {
                var size = Math.floor(Math.random() * 3);
                clouds.push(<Cloud size={sizes[size]}></Cloud>)
            }
            return (
                <div class="sky">{clouds}</div>
            )
        }
    })

    var Cloud = React.createClass({
        render : function() {
            var size   = this.props.size;
            var speed  = Math.floor(Math.random() * 5)    + 30;
            var start  = Math.floor(Math.random() * 5000) + 1;
            var height = Math.floor(Math.random() * 6)    + 1;
            var width  = Math.floor(Math.random() * 20)   + 5;
            var top    = Math.floor(Math.random() * 150)  + 100;
            var a_name = 'moveclouds'+(Math.floor(Math.random() * 300) + 1);
            createCloudStyle(a_name, size);
            var css    = {
                display             : 'block',
                top                 : top+'px',
                '-webkit-transform' : 'translateX('+(document.body.clientWidth)+'px) scale('+size+','+size+')',
                '-webkit-animation' : a_name+' '+speed+'s linear infinite'

            }
            return (
                <div style={css} class="cloud"></div>
            )
        }
    })

    function scatter(target) {
        React.renderComponent(<Sky clouds="5" />, target);
    }

    return {
        scatter : scatter,
        Cloud    : Cloud
    }
})
