//Class for storing Snapshot objects and managing the localStorage of past records
class PoolHistory2 {
    snapshotHistory: Snapshot[];

    //Push new snapshot to history
    addRecord(newSnapshot: Snapshot): void {
        this.snapshotHistory.push(newSnapshot);
    }

    //Pull all records from localStorage and store in snapshotHistory attribute
    //Return true or false to denote success
    retrieveHistory(): boolean {
        return false;
    }

    //Save current state of the PoolHistory object to localStorage
    saveHistory(): void {

    }

    //Examine snapshotHistory for most recent levels
    getMostRecentLevels(): Snapshot {
        //For now it will just return the last snapshot. 
        //Future goal is to examine snapshotHistory until the last record of each chemical level is found.
        return this.snapshotHistory[this.snapshotHistory.length - 1];
    }
}