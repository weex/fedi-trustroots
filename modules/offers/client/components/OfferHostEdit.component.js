import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OfferHostEditPresentational from './OfferHostEditPresentational';
import * as offersApi from '../api/offers.api';

const api = { offers: offersApi };

// @TODO set status from query string
export default function OfferHostEdit({ user }) {
  const [status, setStatus] = useState('yes');
  const [description, setDescription] = useState('');
  const [noOfferDescription, setNoOfferDescription] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [location, setLocation] = useState([50, 15]); // @TODO set defaultLocation

  useEffect(() => {
    (async () => {
      const offers = await api.offers.readByUserId(user._id, 'host');
      if (offers.length === 0) {
        // @TODO set info that this is the first time
      } else {
        const offer = offers[0];
        setStatus(offer.status);
        setDescription(offer.description);
        setNoOfferDescription(offer.noOfferDescription);
        setMaxGuests(offer.maxGuests);
        setLocation(offer.location);
      }
    })();
  }, [user]);

  const handleChangeMaxGuests = (operation, value) => {
    switch (operation) {
      case '+':
        setMaxGuests(maxGuests => maxGuests + value);
        break;
      case '-':
        setMaxGuests(maxGuests => maxGuests - value);
        break;
      case '=':
        setMaxGuests(value);
        break;
      default:
    }
  };

  return (
    <OfferHostEditPresentational
      status={status}
      maxGuests={maxGuests}
      description={description}
      noOfferDescription={noOfferDescription}
      location={location}
      onChangeStatus={setStatus}
      onChangeMaxGuests={handleChangeMaxGuests}
      onChangeDescription={setDescription}
      onChangeNoOfferDescription={setNoOfferDescription}
      onChangeLocation={setLocation}
    />
  );
}

OfferHostEdit.propTypes = {
  user: PropTypes.object.isRequired,
};
