/** @jsx React.DOM */
define([
    'react',
    'jquery',
    'highlight'
    ], function(React, $, hljs) {

    function getLocationHash() {
        return window.location.hash === "" ? 0 : window.location.hash.split('#')[1];
    }
    function setLocationHash(val) {
        window.location.hash = val;
    }

    var Slide = React.createClass({
        getInitialState: function() {
            $.get(this.props.src, function(data) {
                var markup = $("<div>"+data+"</div>");
                markup.find('code').each(function(i,pre) {
                    hljs.highlightBlock(pre, false, false);
                })
                this.setState({markup:markup.html()});
            }.bind(this));
            return { markup : [] };
        },
        render : function() {
            var css = {
                display : this.props.current ? 'block' : 'none'
            }
            return (
                <section style={css} dangerouslySetInnerHTML={{__html: this.state.markup}}></section>
            )
        }
    })

    var Presentation = React.createClass({
        getInitialState: function() {
            console.log("initial")
            return { current : getLocationHash() }
        },
        componentWillMount : function() {
            document.onkeydown = function (e) {
                switch (e.which) {
                    case 32:
                    case 39:
                        this.nextSlide();
                        break;
                    case 37:
                        this.prevSlide();
                        break;
                }
            }.bind(this);
        },
        nextSlide : function() {
            var next = parseInt(this.state.current);
            if (this.props.data.length > next+1) {
                next = next+1;
                setLocationHash(next);
                this.setState({current:next});
            }
        },
        prevSlide : function() {
            var prev = parseInt(this.state.current);
            if (this.state.current > 0) {
                prev = prev-1;
                setLocationHash(prev);
                this.setState({current:prev});
            }
        },
        render : function() {
            var slides  = this.props.data.map(function (slide, index) {
                var isCurrent = index == this.state.current ? true : false;
                return <Slide current={isCurrent} src={slide.src}></Slide>;
            }.bind(this));
            return (
                <div class="reactPresentation">
                    {slides}
                </div>
            );
        }
    })

    function render(slides, target) {
        React.renderComponent(<Presentation data={slides} />, target);
    }

    return {
        render : render
    }
})
