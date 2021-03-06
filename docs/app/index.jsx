import React from 'react';
import {render} from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import 'font-awesome-webpack';

import App from 'components/App';
import CheckboxGroupDocs from 'components/CheckboxGroupDocs';
import ComboboxDocs from 'components/ComboboxDocs';
import DatePickerDocs from 'components/DatePickerDocs';
import InfoTextDocs from 'components/InfoTextDocs';
import LogoDocs from 'components/LogoDocs';
import PaginatorDocs from 'components/PaginatorDocs';
import SelectDocs from 'components/SelectDocs';
import StarsDocs from 'components/StarsDocs';
import TabsDocs from 'components/TabsDocs';
import TableDocs from 'components/TableDocs';
import TextFieldDocs from 'components/TextFieldDocs';
import NotificationDocs from 'components/NotificationDocs';

import '../../main.scss';


const getRoutes = () => (
  <Route path="/" component={App} >
    <IndexRoute component={CheckboxGroupDocs} />
    <Route path="/checkbox-group" component={CheckboxGroupDocs} />
    <Route path="/combobox" component={ComboboxDocs} />
    <Route path="/date-picker" component={DatePickerDocs} />
    <Route path="/logo" component={LogoDocs} />
    <Route path="/paginator" component={PaginatorDocs} />
    <Route path="/text-field" component={TextFieldDocs} />
    <Route path="/stars" component={StarsDocs} />
    <Route path="/info-text" component={InfoTextDocs} />
    <Route path="/notification" component={NotificationDocs} />
    <Route path="/select" component={SelectDocs} />
    <Route path="/table" component={TableDocs} />
    <Route path="/tabs" component={TabsDocs}>
      <Route path="2" component={TabsDocs} />
      <Route path="3" component={TabsDocs} />
    </Route>
  </Route>
);

render(
  <Router
    routes={getRoutes()}
    history={hashHistory} />,
  document.getElementById('nukleus-docs')
);
