import {all} from 'redux-saga/effects';
import { watchProductSummarySaga } from './productSummary';

// Dashboard
export default function*() {
  yield all([
    watchProductSummarySaga()
  ]);
}
