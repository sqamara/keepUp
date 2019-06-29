import {AsyncStorage} from 'react-native';

export default class PersistentList {
    constructor(primaryKey, onLoadComplete) {
        this.primaryKey = primaryKey;
        AsyncStorage.getItem(this.primaryKey, (error, result) => {
            if (error) {
                console.error("Failed Load PersistentList ", this.primaryKey);
            } else {
                this.cachedList = (result == null ? [] : JSON.parse(result));
                onLoadComplete();
            }
        });
    }

    getList() {
        return this.cachedList;
    }

    set(item) {
        this.remove(item.key)
        this.cachedList.push(item);
    }

    remove(key) {
        this.cachedList = this.cachedList.filter((item) => {return item.key != key;});
    }

    save(onSaveComplete) {
        AsyncStorage.setItem(this.primaryKey, JSON.stringify(this.cachedList), (error) => {
            if (error) {
                console.error("Failed Save PersistentList ", this.primaryKey);
            } else {
                onSaveComplete();
            }
        });
    }

};