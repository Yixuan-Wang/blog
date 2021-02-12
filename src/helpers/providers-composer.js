import React from 'react';
import PropTypes from 'prop-types';

function ProvidersComposer({ providers, children }) {
  return providers.reduceRight(
    (children, parent) => React.cloneElement(parent, { children }),
    children,
  );
}

ProvidersComposer.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.element).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProvidersComposer;
