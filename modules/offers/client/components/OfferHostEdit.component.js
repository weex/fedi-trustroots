import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import LoadingIndicator from '@/modules/core/client/components/LoadingIndicator';
import OfferHostEditPresentational from './OfferHostEditPresentational';
import * as offersApi from '../api/offers.api';
import { createValidator } from '@/modules/core/client/utils/validation';
import { plainTextLength } from '@/modules/core/client/utils/filters';

const api = { offers: offersApi };

// as defined in modules/core/client/services/location.client.service.js
const DEFAULT_LOCATION = [48.6908333333, 9.14055555556];

export default function OfferHostEdit({ user }) {
  const { t } = useTranslation('offers');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [offerId, setOfferId] = useState();
  const [status, setStatus] = useState('yes');
  const [maxGuests, setMaxGuests] = useState(1);
  const [description, setDescription] = useState('');
  const [noOfferDescription, setNoOfferDescription] = useState('');
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [isDefaultLocation, setIsDefaultLocation] = useState(true);
  const [firstTimeAround, setFirstTimeAround] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      // load host offer from api
      const [offer] = await api.offers.getOffers(user._id, 'host');

      // sometimes the offer is not set, yet
      if (!offer) setFirstTimeAround(true);

      // set the offer values, or defaults
      setOfferId(offer?._id ?? null);
      setStatus(offer?.status ?? 'yes');
      setMaxGuests(offer?.maxGuests ?? 1);
      setDescription(offer?.description ?? '');
      setNoOfferDescription(offer?.noOfferDescription ?? '');
      if (offer?.location) {
        setLocation(offer.location);
        setIsDefaultLocation(false);
      } else {
        setLocation(DEFAULT_LOCATION);
        setIsDefaultLocation(true);
      }

      // overwrite status with the value from query string
      // @TODO use react-router-dom location in the future
      const urlParams = new URLSearchParams(window.location.search);
      const queryStatus = urlParams.get('status');

      if (['yes', 'maybe', 'no'].includes(queryStatus)) setStatus(queryStatus);

      // loading is finished
      setIsLoading(false);
    })();
  }, [user]);

  const handleChangeMaxGuests = (guests, operation) => {
    switch (operation) {
      case '+':
        setMaxGuests(maxGuests => maxGuests + guests);
        break;
      case '-':
        setMaxGuests(maxGuests => maxGuests - guests);
        break;
      case '=':
        setMaxGuests(guests);
        break;
      default:
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const data = {
      status,
      maxGuests,
      description,
      noOfferDescription,
      location,
    };
    if (offerId) {
      await api.offers.update(offerId, data);
    } else {
      await api.offers.create({ ...data, type: 'host' });
    }
    setIsSaving(false);
    const nextUrl =
      window.innerWidth < 768
        ? `/profile/${user.username}/accommodation`
        : `/profile/${user.username}`;
    window.location.assign(nextUrl);
  };

  if (isLoading) return <LoadingIndicator />;

  const validate = createValidator({
    description: [
      [
        (value, { status }) => status === 'no' || plainTextLength(value) >= 5,
        t('Write longer description first'),
      ],
    ],
  });

  return (
    <OfferHostEditPresentational
      disabled={isSaving}
      status={status}
      maxGuests={maxGuests}
      description={description}
      noOfferDescription={noOfferDescription}
      location={location}
      firstTimeAround={firstTimeAround}
      isDefaultLocation={isDefaultLocation}
      validationErrors={validate({
        status,
        maxGuests,
        description,
        noOfferDescription,
        location,
      })}
      onChangeStatus={setStatus}
      onChangeMaxGuests={handleChangeMaxGuests}
      onChangeDescription={setDescription}
      onChangeNoOfferDescription={setNoOfferDescription}
      onChangeLocation={setLocation}
      onSubmit={handleSubmit}
    />
  );
}

OfferHostEdit.propTypes = {
  user: PropTypes.object.isRequired,
};
