app.controller('MainController', ['$scope', function($scope) {
    //Initialize PoolHistory object
    $scope.poolHistory = new PoolHistory();

    //Initialize array to hold records from poolHistory
    $scope.levelsList = [];

    //Function for updating the table containing the most recent record
    $scope.updateMostRecent = function() {
        //Grab last record
        $scope.lastRecord = $scope.poolHistory.getMostRecentLevels();
        //console.log($scope.lastRecord);

        //Bind lastRecord to table
        if($scope.lastRecord != undefined)
        {
            let lastLevelsArray = $scope.lastRecord.getLevelReport();
            //console.log(lastLevelsArray);
            $scope.lastfc = lastLevelsArray[0];
            $scope.lastph = lastLevelsArray[1];
            $scope.lastca = lastLevelsArray[2];
            $scope.lastta = lastLevelsArray[3];
            $scope.lastch = lastLevelsArray[4];
            $scope.lastsl = lastLevelsArray[5];
        }
    }

    //Function for updating the history table
    $scope.updateHistoryTable = function() {
        $scope.levelsList = $scope.poolHistory.getHistory();
    }

    //Add new snapshot to poolHistory
    $scope.saveNewRecord = function() {
        let newSnap = new Snapshot($scope.newfc, $scope.newph, $scope.newca, $scope.newta, $scope.newch, $scope.newsl);
        $scope.poolHistory.addRecord(newSnap);
        $scope.updateMostRecent();
        $scope.updateHistoryTable();
        $scope.poolHistory.saveHistoryToStorage();
        $scope.clearInputs();
        $scope.openHomePage();
    }

    //Clear inputs upon adding new record
    $scope.clearInputs = function() {
        $scope.newfc = '';
        $scope.newph = '';
        $scope.newca = '';
        $scope.newta = '';
        $scope.newch = '';
        $scope.newsl = '';
    }

    $scope.openHomePage = function() {
        $("#tabs-1").show();
        //$("#tabs-1").height(100);
        $("#tabs-2").hide();
        $("#tabs-3").hide();
    }

    $scope.openHistoryPage = function() {
        $("#tabs-1").hide();
        $("#tabs-2").show();
        $("#tabs-3").hide();
    }

    $scope.openNewRecordPage = function() {
        console.log("asdf");
        $("#tabs-1").hide();
        $("#tabs-2").hide();
        $("#tabs-3").show();
    }

    //Get data from localstorage
    $scope.poolHistory.retrieveHistoryFromStorage();
    //Show most recent record on load
    $scope.updateMostRecent();
    $scope.updateHistoryTable();

    //Show the home page
    $scope.openHomePage();
}])