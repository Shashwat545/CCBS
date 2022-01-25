import React from 'react';

export default class DeviceIdentifier extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            isMobile: false,
            isDesktop: false,
            isTablet: false
            // can also check for tablets
        };
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize.bind(this));
    }

    handleWindowResize() {
        const resolution = window.innerWidth;
        // console.log('resolution= ', resolution);
        const isMobile = resolution >= 120 && resolution <= 485;

        const isTablet = resolution >= 485 && resolution <= 669;

        const isDesktop = !isMobile && !isTablet;

        this.setState({
            isMobile,

            isTablet,

            isDesktop
        });
    }
    render() {
        const {
            isMobile,

            isTablet,

            isDesktop
        } = this.state;

        const {
            isDesktop: propsIsDesktop = false,

            isMobile: propsIsMobile = false,

            isTablet: propsIsTablet = false
        } = this.props;
        if ((isDesktop && propsIsDesktop) || (isMobile && propsIsMobile) || (isTablet && propsIsTablet)) {
            return <React.Fragment>{this.props.children}</React.Fragment>;
        }

        return null;
    }
}
