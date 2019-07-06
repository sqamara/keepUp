import PersistentList from './PersistentList'
import {MasterListId} from '../screens/Settings'

export default function dailyUpdate(onUpdateComplete) {
    const persistenList = new PersistentList(MasterListId, 
        () => {
            items = persistenList.getList();
            items.forEach(item => {
                item.daysSince += 1;
                persistenList.set(item);
            });
            persistenList.save(onUpdateComplete);
        }
    );
}