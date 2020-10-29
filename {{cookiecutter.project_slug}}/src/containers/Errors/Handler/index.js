import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

import NotFoundPage from '../NotFoundPage';
import { ROUTE_NOT_FOUND } from '../constants';

const Handler = ({ children }) => {
  const location = useLocation();
  if (location.state && location.state.error) {
    switch (location.state.error) {
      case ROUTE_NOT_FOUND:
        return <NotFoundPage />;
      default:
    }
  }
  return React.Children.only(children);
};

Handler.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default Handler;
