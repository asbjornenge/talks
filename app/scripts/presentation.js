/** @jsx React.DOM */
define(['react'], function(React) {

    var Slide = React.createClass({
        render : function() {
            var css = {
                display : this.props.current ? 'block' : 'none'
            }
            return (
                <section style={css}>{this.props.src}</section>
            )
        }
    })

    var Presentation = React.createClass({
        // getInitialState: function() {
        //     console.log("initing");
        //     return { current : window.location.hash === "" ? 0 : window.location.hash.split('#')[1]};
        // },
        componentWillMount : function() {
            console.log("mounting");
            document.onkeydown = function (e) {
                switch (e.which) {
                    case 32:
                    case 39:
                        window.location.hash = "1";
                        this.setState({current:1})
                        break;
                    case 37:
                        window.location.hash = "0";
                        this.setState({current:0})
                        break;
                }
            }.bind(this);
        },
        render : function() {
            var current = this.state ? this.state.current : getLocationHash();
            var slides  = this.props.data.map(function (slide, index) {
                var isCurrent = index == current ? true : false;
                return <Slide current={isCurrent} src={slide.src}></Slide>;
            });
            return (
                <div class="reactPresentation">
                    {slides}
                </div>
            );
        }
    })

    function getLocationHash() {
        return window.location.hash === "" ? 0 : window.location.hash.split('#')[1];
    }

    function render(slides, target) {
        React.renderComponent(<Presentation data={slides} />, target);
    }

    return {
        render : render
    }
})
