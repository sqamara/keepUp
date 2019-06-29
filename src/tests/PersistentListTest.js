import PersistentList from '../utils/PersistentList'
import {AsyncStorage} from 'react-native';

masterKey = 'PersistentListTest';

testData = [
    { key: '0001', value: 'aaaa'},
    { key: '0002', value: 'bbbb'},
    { key: '0003', value: 'cccc'},
    { key: '0004', value: 'dddd'},
    { key: '0005', value: 'eeee'}
];

export default function PersistentListTest() {
    console.log('Ensuring no stored list exist');
    AsyncStorage.removeItem(masterKey);
    console.log('Creating PersistentList');
    pl = new PersistentList(masterKey, () => {
        console.log('loading objects');
        testData.forEach((item) => {
            pl.set(item);
        });
        console.log('printing objects');
        console.log(pl.getList());
        console.log('deleting object');
        pl.remove('0003');
        console.log('printing objects');
        console.log(pl.getList());
        console.log('updating object');
        pl.set({ key: '0004', value: '4444'});
        console.log('printing objects');
        console.log(pl.getList());
        pl.save(() => {
            console.log('Creating another PersistentList');
            pl2 = new PersistentList(masterKey, () => {
                console.log('printing objects');
                console.log(pl2.getList());
            });
        });
    
    });
}