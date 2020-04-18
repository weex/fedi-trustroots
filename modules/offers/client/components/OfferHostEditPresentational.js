import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tab, Tabs } from 'react-bootstrap';

import Availability from './OfferHostEditAvailability';
import Description from './OfferHostEditDescription';
import Location from './OfferHostEditLocation';
import StepNavigation from '@/modules/core/client/components/StepNavigation';

export default function OfferHostEditPresentational({
  disabled,
  status,
  maxGuests,
  description,
  noOfferDescription,
  location,
  firstTimeAround,
  isDefaultLocation,
  validationErrors,
  onChangeStatus,
  onChangeMaxGuests,
  onChangeDescription,
  onChangeNoOfferDescription,
  onChangeLocation,
  onSubmit,
}) {
  const [step, setStep] = useState(0);

  const isLocationDisabled = status === 'no';

  // there are no validation errors
  const isValid = Object.values(validationErrors).flat().length === 0;

  // @TODO dry this, with CreateReference.component.js
  const navigationErrors = [
    [...validationErrors.status, ...validationErrors.maxGuests],
    [...validationErrors.description, ...validationErrors.noOfferDescription],
    [...validationErrors.location],
  ];
  const currentStepErrors = navigationErrors.slice(0, step + 1).flat();
  const isNextStepDisabled = disabled || currentStepErrors.length > 0;
  const nextStepError =
    !disabled && currentStepErrors.find(error => error.trim().length > 0);

  return (
    <section className="offers-edit">
      <Button
        className="btn-lg btn-inverse-primary pull-right hidden-xs"
        disabled={disabled || !isValid}
        onClick={onSubmit}
        aria-hidden={true}
      >
        Save and Exit
      </Button>
      {/*
      <button
        type="submit"
        className="btn btn-lg btn-inverse-primary pull-right hidden-xs"
        ng-disabled="offerHostEdit.isLoading ||
          (offerHostEdit.offer.status!=='no' && offerHostEdit.isDescriptionTooShort)"
        uib-tooltip="Write longer description first"
        tooltip-enable="offerHostEdit.isDescriptionTooShort && offerHostEdit.offer.status !== 'no'"
        tooltip-placement="bottom"
        aria-hidden="true"
      >
        Save and Exit
      </button>
      */}
      <Tabs
        id="offer-host-edit-tabs"
        className="offer-tabs"
        activeKey={step}
        onSelect={key => setStep(key)}
        animation={false}
      >
        <Tab eventKey={0} title="Availability">
          <Availability
            status={status}
            maxGuests={maxGuests}
            onChangeStatus={onChangeStatus}
            onChangeMaxGuests={onChangeMaxGuests}
          />
        </Tab>
        <Tab eventKey={1} title="Description">
          <Description
            status={status}
            description={description}
            noOfferDescription={noOfferDescription}
            onChangeDescription={onChangeDescription}
            onChangeNoOfferDescription={onChangeNoOfferDescription}
          />
        </Tab>
        <Tab eventKey={2} title="Location" disabled={isLocationDisabled}>
          <Location
            status={status}
            firstTimeAround={firstTimeAround}
            defaultZoom={isDefaultLocation ? 6 : 16}
            location={location}
            onChangeLocation={onChangeLocation}
          />
        </Tab>
      </Tabs>

      <StepNavigation
        currentStep={step}
        numberOfSteps={isLocationDisabled ? 2 : 3}
        disabled={isNextStepDisabled}
        disabledReason={nextStepError}
        onBack={() => setStep(step => step - 1)}
        onNext={() => setStep(step => step + 1)}
        onSubmit={onSubmit}
      />
    </section>
  );
}

OfferHostEditPresentational.propTypes = {
  disabled: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(['yes', 'maybe', 'no']).isRequired,
  maxGuests: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  noOfferDescription: PropTypes.string.isRequired,
  location: PropTypes.array.isRequired,
  firstTimeAround: PropTypes.bool.isRequired,
  isDefaultLocation: PropTypes.bool.isRequired,
  validationErrors: PropTypes.object.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onChangeMaxGuests: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeNoOfferDescription: PropTypes.func.isRequired,
  onChangeLocation: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
