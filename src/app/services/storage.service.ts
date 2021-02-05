import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setObject(key, object) {
    await Storage.set({
      key: key,
      value: JSON.stringify(object)
    });
  }
  
  // JSON "get" example
  async getObject(searchedKey) {
    const ret = await Storage.get({ key: searchedKey });
    return JSON.parse(ret.value);
  }
  
  async setItem(newKey, newValue) {
    await Storage.set({
      key: newKey,
      value: newValue
    });
  }
  
  async getItem(searchedKey) {
    const { value } = await Storage.get({ key: searchedKey });
    return value;
  }
  
  async removeItem(deleteKey) {
    await Storage.remove({ key: deleteKey });
  }
  
  async keys() {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
  }
  
  async clear() {
    await Storage.clear();
  }
}
