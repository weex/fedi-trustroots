import React from 'react';
import PropTypes from 'prop-types';

export default function OfferHostEditLocation({
  firstTimeAround,
  status,
  defaultZoom,
  location,
  onChangeLocation,
}) {
  firstTimeAround;
  status;
  return (
    <>
      <li>default zoom: {defaultZoom}</li>
      <li>
        location:
        <input
          value={location[0]}
          onChange={event =>
            onChangeLocation([+event.target.value, location[1]])
          }
        />
        <input
          value={location[1]}
          onChange={event =>
            onChangeLocation([location[0], +event.target.value])
          }
        />
      </li>
    </>
  );
}

OfferHostEditLocation.propTypes = {
  firstTimeAround: PropTypes.bool,
  status: PropTypes.oneOf(['yes', 'maybe', 'no']).isRequired,
  defaultZoom: PropTypes.number.isRequired,
  location: PropTypes.array.isRequired,
  onChangeLocation: PropTypes.func.isRequired,
};
