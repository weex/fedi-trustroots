// External dependencies
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';

// Internal dependencies
import '@/config/client/i18n';
import LanguageSwitch from '@/modules/core/client/components/LanguageSwitch.component';

export default function InterfaceLanguagePanel({ getAllLocales }) {
  const { t } = useTranslation('users');

  return (
    <div className="panel panel-default" id="locale">
      <div className="panel-heading">{t('Interface language')}</div>
      <div className="panel-body">
        <form>
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-3 text-right control-label">
                {t('Change language')}
              </label>
              <div className="col-sm-9">
                <div className="form-group">
                  <div className="col-sm-9 col-md-7 col-lg-6">
                    <LanguageSwitch
                      buttonStyle="primary"
                      getAllLocales={getAllLocales}
                      saveToAPI
                    />
                  </div>
                </div>

                <p className="help-block">
                  {t(
                    'This is the language of the interface you see across the site.',
                  )}
                </p>
                <p className="help-block">
                  {t(
                    'Thanks to all our community members who helped translate!',
                  )}{' '}
                  <a href="/volunteering">{t('You can help us out!')}</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

InterfaceLanguagePanel.propTypes = {
  getAllLocales: PropTypes.bool,
};
