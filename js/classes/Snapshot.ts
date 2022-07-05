//Class for storing one snapshot of pool levels
class Snapshot2 {
    freeChlorine: number;
    pH: number;
    cyanuricAcid: number;
    totalAlkalinity: number;
    calciumHardness: number;
    saltLevel: number;
    snapDate: Date;

    constructor(fc, ph, cya, ta, ch, sl) {
        this.freeChlorine = fc;
        this.pH = ph;
        this.cyanuricAcid = cya;
        this.totalAlkalinity = ta;
        this.calciumHardness = ch;
        this.saltLevel = sl;
        this.snapDate = new Date();
    }

    //Returns an array containing the levels and date in an array in order
    getLevelReport(): any[] {
        return [this.freeChlorine, this.pH, this.cyanuricAcid, this.totalAlkalinity, this.calciumHardness, this.saltLevel, this.snapDate];
    }
}