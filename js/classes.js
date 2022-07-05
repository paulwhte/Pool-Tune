//Class for storing one snapshot of pool levels
var Snapshot = /** @class */ (function () {
    //constructor(fc, ph, cya, ta, ch, sl); //Upon creation of record
    //constructor(fc, ph, cya, ta, ch, sl, sd); //Upon retrieval of record from storage
    function Snapshot(fc, ph, cya, ta, ch, sl, sd) {
        this.freeChlorine = fc;
        this.pH = ph;
        this.cyanuricAcid = cya;
        this.totalAlkalinity = ta;
        this.calciumHardness = ch;
        this.saltLevel = sl;
        if (sd == undefined) {
            this.snapDate = new Date();
        }
        else {
            this.snapDate = sd;
        }
    }
    //Returns an array containing the levels and date in an array in order
    Snapshot.prototype.getLevelReport = function () {
        return [this.freeChlorine, this.pH, this.cyanuricAcid, this.totalAlkalinity, this.calciumHardness, this.saltLevel, this.snapDate];
    };
    return Snapshot;
}());
//Class for storing Snapshot objects and managing the localStorage of past records
var PoolHistory = /** @class */ (function () {
    function PoolHistory() {
        this.snapshotHistory = [];
    }
    //Return the snapshotHistory array
    PoolHistory.prototype.getHistory = function () {
        return this.snapshotHistory;
    };
    //Push new snapshot to history
    PoolHistory.prototype.addRecord = function (newSnapshot) {
        this.snapshotHistory.unshift(newSnapshot);
    };
    //Pull all records from localStorage and store in snapshotHistory attribute
    //Return true or false to denote success
    PoolHistory.prototype.retrieveHistoryFromStorage = function () {
        try {
            var storedData = localStorage.getItem("PoolTune");
        }
        catch (_a) {
            console.log("Error: problem while retrieving history.");
            return false;
        }
        if (storedData != null) {
            storedData = JSON.parse(storedData);
            //console.log(storedData[0]);
            //Run through string object array and create the necessary snapshot objects
            for (var i = 0; i < storedData.length; i++) {
                var curItem = storedData[i];
                this.snapshotHistory.push(new Snapshot(curItem['freeChlorine'], curItem['pH'], curItem['cyanuricAcid'], curItem['totalAlkalinity'], curItem['calciumHardness'], curItem['saltLevel'], curItem['snapDate']));
                //console.log(this.snapshotHistory);
            }
        }
    };
    //Save current state of the PoolHistory object to localStorage
    PoolHistory.prototype.saveHistoryToStorage = function () {
        var dataToStore = JSON.stringify(this.getHistory());
        localStorage.setItem("PoolTune", dataToStore);
    };
    //Examine snapshotHistory for most recent levels
    PoolHistory.prototype.getMostRecentLevels = function () {
        //For now it will just return the last snapshot. 
        //Future goal is to examine snapshotHistory until the last record of each chemical level is found.
        if (this.snapshotHistory.length > 0) {
            return this.snapshotHistory[0];
        }
    };
    return PoolHistory;
}());
