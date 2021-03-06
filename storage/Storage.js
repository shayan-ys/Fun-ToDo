import React from 'react';
import { AsyncStorage } from 'react-native';

const storageLastIdKey = '@FunToDo:activities:lastId';

async function setItem(obj, key) {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(obj));
    } catch (error) {
        console.error('AsyncStorage#setItem error: ' + error.message);
    }
}

async function getItem(key) {
    return await AsyncStorage.getItem(key, () => {})
        .then(result => {
            if (result) {
                try {
                    result = JSON.parse(result);
                } catch (error) {
                    console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, error.message);
                }
            } else {
                result = null;
            }
            return result;
        });
}
async function removeItem(key) {
    return await AsyncStorage.removeItem(key);
}

async function getNextId() {
    return await getItem(storageLastIdKey)
        .then(result => {
            return result === null ? 0 : parseInt(result) + 1;
        });
}

async function saveLastId(id) {
    return await setItem(id, storageLastIdKey);
}

class Storage {
    static #objStorageKey = '@FunToDo:activities:json';

    static async getAll() {
        return await getItem(Storage.#objStorageKey).then((result) => result ? result : {});
    }

    static async add(item) {
        return await Storage.getAll().then(async (storage) => {
            // check if item already exists
            if (item.hasOwnProperty('id') && Storage.findInGivenStorage(item.id, storage)) {
                throw Error(`Item ${item.id} already exists`);
            }

            return await getNextId().then(async (id) => {
                if (Storage.findInGivenStorage(id, storage)) {
                    // problem, nextId already exists in the storage
                    console.warn(`nextId ${id} already exists in the storage`);
                    let arrayIds = Object.keys(storage).map((el) => parseInt(el));
                    id = Math.max( ...arrayIds ) + 1;
                }
                storage[id] = {...item, id: id};
                // save
                await setItem(storage, Storage.#objStorageKey).then(async () => {
                    return await saveLastId(id);
                });
            });
        });
    }

    static findInGivenStorage(id, storage) {
        return storage.hasOwnProperty(id) ? storage[id] : null;
    }

    static async getById(id) {
        return await Storage.getAll().then((storage) => Storage.findInGivenStorage(id, storage));
    }

    static async update(item) {
        return await Storage.getAll().then(async (storage) => {
            // only if item exists in the storage
            if (Storage.findInGivenStorage(item.id, storage)) {
                storage[item.id] = item;
                return await setItem(storage, Storage.#objStorageKey);
            }
            throw Error(`Item ${id} does not exist in the storage`);
        });
    }

    static async delete(id) {
        return await Storage.getAll().then(async (storage) => {
            if (Storage.findInGivenStorage(id, storage)) {
                delete storage[id];
                return await setItem(storage, Storage.#objStorageKey);
            }
            throw Error(`Item ${id} does not exist in the storage`);
        });
    }

    static async clearAll() {
        return await removeItem(Storage.#objStorageKey).then(async () => {
            return await removeItem(storageLastIdKey);
        });
    }
}

export default Storage;
