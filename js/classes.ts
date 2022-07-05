//Class for storing one snapshot of pool levels
class Snapshot {
    freeChlorine: number;
    pH: number;
    cyanuricAcid: number;
    totalAlkalinity: number;
    calciumHardness: number;
    saltLevel: number;
    snapDate: Date;

    //constructor(fc, ph, cya, ta, ch, sl); //Upon creation of record
    //constructor(fc, ph, cya, ta, ch, sl, sd); //Upon retrieval of record from storage
    
    constructor(fc, ph, cya, ta, ch, sl, sd?)
    {
        this.freeChlorine = fc;
        this.pH = ph;
        this.cyanuricAcid = cya;
        this.totalAlkalinity = ta;
        this.calciumHardness = ch;
        this.saltLevel = sl;
        if(sd == undefined){
            this.snapDate = new Date();
        } else {
            this.snapDate = sd;
        }
    }

    

    //Returns an array containing the levels and date in an array in order
    getLevelReport(): any[] {
        return [this.freeChlorine, this.pH, this.cyanuricAcid, this.totalAlkalinity, this.calciumHardness, this.saltLevel, this.snapDate];
    }
}

//Class for storing Snapshot objects and managing the localStorage of past records
class PoolHistory {
    snapshotHistory: Snapshot[];

    constructor() {
        this.snapshotHistory = [];
    }

    //Return the snapshotHistory array
    getHistory(): Snapshot[] {
        return this.snapshotHistory;
    }

    //Push new snapshot to history
    addRecord(newSnapshot: Snapshot): void {
        this.snapshotHistory.unshift(newSnapshot);
    }

    //Pull all records from localStorage and store in snapshotHistory attribute
    //Return true or false to denote success
    retrieveHistoryFromStorage(): boolean {
        
        try {
            var storedData = localStorage.getItem("PoolTune");
        }
        catch {
            console.log("Error: problem while retrieving history.");
            return false;
        }

        if(storedData != null)
        {
            storedData = JSON.parse(storedData);
            //console.log(storedData[0]);
            //Run through string object array and create the necessary snapshot objects
            for (let i = 0; i < storedData.length; i++) {
                let curItem = storedData[i];
                this.snapshotHistory.push(new Snapshot(curItem['freeChlorine'], curItem['pH'], curItem['cyanuricAcid'], curItem['totalAlkalinity'], curItem['calciumHardness'], curItem['saltLevel'], curItem['snapDate']));
                //console.log(this.snapshotHistory);
            }
        }
    }

    //Save current state of the PoolHistory object to localStorage
    saveHistoryToStorage(): void {
        let dataToStore = JSON.stringify(this.getHistory());
        localStorage.setItem("PoolTune", dataToStore)
    }

    //Examine snapshotHistory for most recent levels
    getMostRecentLevels(): Snapshot {
        //For now it will just return the last snapshot. 
        //Future goal is to examine snapshotHistory until the last record of each chemical level is found.
        if(this.snapshotHistory.length > 0) {
            return this.snapshotHistory[0];
        }
        
    }
}