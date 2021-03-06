import {AsyncStorage} from 'react-native';

export default class PersistentList {
    constructor(primaryId, onLoadComplete) {
        this.primaryId = primaryId; 
        this.load(onLoadComplete)
    }

    load(onLoadComplete) {
        AsyncStorage.getItem(this.primaryId, function(error, result) {
            if (error) {
                console.error("Failed Load PersistentList", this.primaryId);
            } else {
                this.cachedList = (result == null ? [] : JSON.parse(result));
                if (onLoadComplete)
                  onLoadComplete();
            }
        }.bind(this));
    }


    getList() {
        return this.cachedList;
    }

    set(item) {
        this.remove(item.id)
        this.cachedList.push(item);
    }

    remove(id) {
        this.cachedList = this.cachedList.filter((item) => {return item.id != id;});
    }

    save(onSaveComplete) {
        AsyncStorage.setItem(this.primaryId, JSON.stringify(this.cachedList), function(error) {
            if (error) {
                console.error("Failed Save PersistentList", this.primaryId);
            } else {
              if (onSaveComplete)
                onSaveComplete();
            }
        }.bind(this));
    }

    removeAll(onRemoveAllComplete) {
        this.cachedList = [];
        this.save(onRemoveAllComplete)
    }

}
