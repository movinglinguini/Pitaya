/**
 * Class meant to replicate the `Subject` class in RxJS.
 * Handler for emitting signals between components in this program.
 */
export class Signal {
  constructor () {
    this._subscriptions = new Map();
    this._nextSubID = 0;
    this.vacantIDs = [];
  }

  /**
   * Adds `cb` as a receiver for whenever this signal is emitted.
   * @param {(arg) => void} cb 
   * @returns The receiver ID for this function. Needed for unsubscribing this function.
   */
  subscribe(cb) {
    const useVacantID = this.vacantIDs.length > 0;
    const subID = useVacantID ? this.vacantIDs.pop() : this._nextSubID;
    this._subscriptions.set(subID, cb);

    if (!useVacantID) {
      this._nextSubID += 1;
    }
    return subID;
  }

  /**
   * Removes whatever function was subscribed with ID `subID` as a receiver.
   * @param {*} subID 
   */
  unsubscribe(subID) {
    this._subscriptions.delete(subID);
    this.vacantIDs.push(subID);
  }

  /**
   * Emits a value to every receiver subscribed to this signal.
   * @param {any} value 
   */
  emit(value) {
    Array.from(this._subscriptions.values()).forEach(cb => cb(value));
  }
}