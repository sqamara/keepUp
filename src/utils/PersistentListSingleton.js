import PersistentList from './PersistentList'
import {AppConstants} from '../screens/Settings'

export let PersistentListSingleton = new PersistentList(AppConstants.MasterListID)
