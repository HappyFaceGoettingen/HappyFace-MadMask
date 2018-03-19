angular.module('hf.FacWebservice', [])
    .factory('FacWebservice', ['FacInstances', 'FacRequest', 'FacUIVariables', 'FacPopup', '$timeout', function (FacInstances, FacRequest, FacUIVariables, FacPopup, $timeout) {


        ///////////////////////GoeGrid samples

        // original sample by Haykuhi
//        "http://happyface-goegrid.gwdg.de/webservice/db_backend.py?data" +
//        "=SELECT+hf_runs.id%2C+hf_runs.time%2C+mod_ddm.id%2C+mod_ddm.instance%2C+mod_ddm.run_id%2C+mod_ddm.status%2C+" +
//        "mod_ddm.description%2C+mod_ddm.instruction%2C+mod_ddm.error_string%2C+mod_ddm.destination_efficiency_total%2C+" +
//        "mod_ddm.source_efficiency_total+FROM+hf_runs+INNER+JOIN+mod_ddm+ON+hf_runs.id+%3D+mod_ddm.id+WHERE+%272014-01-01+15%3A30%3A00.000000%27+" +
//        "%3C+hf_runs.time+AND+%272014-04-22+15%3A30%3A00.000000%27+%3E+hf_runs.time%3B+"

        //ascii corrected
//        "http://happyface-goegrid.gwdg.de/webservice/db_backend.py?data=SELECT+hf_runs.id," +
//        "+hf_runs.time,+mod_ddm.id,+mod_ddm.instance,+mod_ddm.run_id,+mod_ddm.status," +
//        "+mod_ddm.description,+mod_ddm.instruction,+mod_ddm.error_string,+mod_ddm.destination_efficiency_total," +
//        "+mod_ddm.source_efficiency_total+" +
//        "FROM+hf_runs+INNER+JOIN+mod_ddm+ON+hf_runs.id+=+mod_ddm.id+WHERE+'2014-01-01+15:30:00.000000'" +
//        "+<+hf_runs.time+AND+'2014-04-22+15:30:00.000000'+>+hf_runs.time%3B+"


        //"http://happyface-goegrid.gwdg.de/webservice/query_result.json"

        /////////////////////////////

        var activeModule = {};
        var moduleTableNames = [];
        var queryUrls = [];
        var subModuleTables = [];
        var ionicTableData = [];

        var activeInstance = function () {
            return FacInstances.getLastActiveInstance();
        };

        function setActiveModule(mod) {
            activeModule = mod;
        }

        function resetVariables() {
            subModuleTables = [];
            moduleTableNames = [];
            queryUrls = [];
            ionicTableData = [];
        }

        function getProperWebserviceUrl() {     //see whether the URL was entered with slash at the end or not
            var wsUrl = activeInstance().webServiceUrl;
            if (wsUrl.charAt(wsUrl.length - 1) == '/') {
                return wsUrl;
            } else {
                return wsUrl + "/";
            }
        }

        function queryResultUrl() {           //program this to return dynamically the right query_result url
            return getProperWebserviceUrl() + "query_result.json";
        }

        function beginLoadingWebservice() {
            FacUIVariables.beginLoading(false);
            FacUIVariables.setIsLoading(true);
        }

        function endLoadingWebservice() {
            $timeout(function () {
                FacUIVariables.setIsLoading(false);
                FacUIVariables.stopLoading(false);
                FacUIVariables.setTimeOutIsGreyedOut(FacInstances.getLastActiveInstance().lastRefreshed);
            }, 800)
        }

        function beginSetTableContentChain() {
            beginLoadingWebservice();
            var mappingOfXmlAndWebserviceModuleNameUrl = getProperWebserviceUrl() + "db_table_list.py";
            FacRequest.Query(mappingOfXmlAndWebserviceModuleNameUrl)
                .then(function (map) {
                    for (var index = 0; index < map.data.length; ++index) {
                        if (map.data[index].module_name == activeModule.name) {
                            moduleTableNames.push({
                                table_name: map.data[index].table_name,
                                table_columns: map.data[index].table_columns
                            });
                        }
                    }
                    prepareQueryUrls();
                },
                function () {
                    console.log('error while getting mapping');
                    FacPopup.showPopupByName('noInternetOrServerWrong');
                    endLoadingWebservice();
                }
            );
        }

        function prepareQueryUrls() {
            var baseUrl = getProperWebserviceUrl() + "db_backend.py?data=SELECT+hf_runs.time,";
            var currentTime = new Date();
            var oldTime = new Date(currentTime.getTime() + (-45) * 60000);   //(-45) is the amount of minutes I want to add to the currentTime, and get a new date
            var date1 = getSuitableDateString(oldTime);
            var date2 = getSuitableDateString(currentTime);
            for (var i = 0; i < moduleTableNames.length; ++i) {
                var tempUrl = baseUrl;
                for (var k = 0; k < moduleTableNames[i].table_columns.length; ++k) {
                    tempUrl += "+" + moduleTableNames[i].table_name + "." + moduleTableNames[i].table_columns[k] + ",";
                }
                tempUrl = tempUrl.slice(0, -1);
                tempUrl += "+FROM+hf_runs+INNER+JOIN+" + moduleTableNames[i].table_name + "+ON+hf_runs.id+=+" + moduleTableNames[i].table_name + ".id" + "+WHERE+\'"
                    + date1 + "\'" + "+<+hf_runs.time+AND+\'" + date2 + "\'+>+hf_runs.time%3B+";
                queryUrls[i] = tempUrl;
            }
            requestWithQueryUrls();
        }


        function requestWithQueryUrls() {
            var i = 0;

            function callback() {
                if (i < queryUrls.length) {
                    FacRequest.Query(queryUrls[i])
                        .then(function () {
                            FacRequest.Query(queryResultUrl())
                                .then(function (res) {
                                    subModuleTables.push(res.data[0]);
                                    i++;
                                    callback();
                                },
                                function () {
                                    console.log('error while downloading query result, iteration ' + i);
                                    FacPopup.showPopupByName('noInternetOrServerWrong');
                                    endLoadingWebservice();
                                }
                            );
                        },
                        function () {
                            console.log('error while queueing, iteration ' + i);
                            FacPopup.showPopupByName('noInternetOrServerWrong');
                            endLoadingWebservice();
                        }
                    );
                } else {
                    reformatTables();
                }
            }

            callback();
        }


        function reformatTables() { //merge content and table_columns of the subModuleTables (bad format of webservice)
//            console.log('reformatting subModuleTables');
//            console.log('there are ' + subModuleTables.length + ' objects in subModuleTables');
            for (var inx = 0; inx < subModuleTables.length; ++inx) {       //every table in table (for example module ddm has 3 subModuleTables)
//                console.log('format iteration '+inx);
                var table_columns = subModuleTables[inx].table_columns.split(','); //makes an array which contains the table_columns strings
                var table_content = subModuleTables[inx].content; //each table comes with at least one content array, one content array for each date in the desired period
//                console.log('there are ' + subModuleTables[inx].content.length + ' objects in subModuleTables['+inx+"].content");
//                console.log(table_columns);
//                console.log(table_content);
                var tmpTableMultipleDates = []; //combining them here
                for (var i = 0; i < table_content.length; ++i) { //for each date in the desired period
                    var tmpTableSingleDate = {};  //each date gets a tmp object
                    for (var k = 0; k < table_columns.length; ++k) {  //each column
//                        console.log(table_columns[k]);
//                        console.log(table_content[i][k]);
                        tmpTableSingleDate[table_columns[k]] = table_content[i][k];  //combining key and value (webservice has a bad return format of the data)
                    }
                    tmpTableMultipleDates.push(tmpTableSingleDate);  //combine the singleDate subModuleTables into one array
                }
                subModuleTables[inx] = tmpTableMultipleDates;  //replace the bad format of the webservice with the good one
            }
//            console.log(subModuleTables);
            shrinkSubModuleTablesToOnlyNewestDate();
        }

        function shrinkSubModuleTablesToOnlyNewestDate() {  //subModuleTables contain multiple dates for each sub module. this function removes all data but the newest
            for (var i = 0; i < subModuleTables.length; ++i) {   //all sub modules
                var tmpDates = [];     //stores the dates of one sub module in an array
                for (var k = 0; k < subModuleTables[i].length; ++k) {  //all dates in a sub module
                    var tmpDate = new Date(subModuleTables[i][k]['hf_runs.time'].substring(0, 19).replace(/-/g, "/")); //that substring represents "2014/04/01 15:23:02" (cuts the milliseconds) slashes are the accepted characters, not minuses
                    tmpDates.push(tmpDate);
                }
                var inxNewestDate = 0;  //variable to store the index of the newest date
                for (k = 1; k < tmpDates.length; k++) {   //run through all dates and save the newest one
                    if (tmpDates[k] > tmpDates[inxNewestDate]) {
                        inxNewestDate = k;
                    }
                }
                if (subModuleTables[i].length != 0) {      //some modules sometimes deliver empty content
                    subModuleTables[i] = subModuleTables[i][inxNewestDate];    //target format [{},{},{}] where the objects are {tables with key value pairs}
                } else {
                    subModuleTables[i] = {};    //target format [{},{},{}] where the objects are {tables with key value pairs}
                }
            }
            prepareIonicTableData();
        }

        function prepareIonicTableData() {
            ionicTableData = []; //target format: [[{name},{time},{},{},...],[{name},{time},{},{},...],[{name},{time},{},{},...]] the sub tables with their key value pairs included
            for (var i = 0; i < subModuleTables.length; ++i) {
                var singleSubModule = {};  //for one module
                singleSubModule['name'] = moduleTableNames[i].table_name;
                if (!angular.equals({}, subModuleTables[i])) {      //some modules sometimes deliver empty content
                    singleSubModule['time'] = subModuleTables[i]['hf_runs.time'].substring(0, 16); //give the table its timestamp (while cropping the seconds)
                    singleSubModule['content'] = [];
                    angular.forEach(subModuleTables[i], function (value, key) {
                        key = key.substring(key.indexOf('.') + 1, key.length);   //get the key without the module name at the beginning
                        if (key != "time") {
                            singleSubModule['content'].push({
                                column_name: key,
                                column_value: value
                            });
                        }
                    });
                    ionicTableData.push(singleSubModule);
                }
            }
            if (ionicTableData.length == 0) {
                FacPopup.showPopupByName('webserviceReturnedEmpty');
            }
            endLoadingWebservice();
        }

        function getSuitableDateString(date) {  //returns a date string, which is suitable for the query url
            var month = date.getMonth() + 1;   //plus 1 because the months start with 0 in javascript
            if (month.toString().length == 1) {  //if month has only one digit, then add the zero
                month = "0" + month;
            }
            var day = date.getDate();
            if (day.toString().length == 1) {  //if day has only one digit, then add the zero
                day = "0" + day;
            }
            var hours = date.getHours();
            if (hours.toString().length == 1) {  //if hours has only one digit, then add the zero
                hours = "0" + hours;
            }
            var minutes = date.getMinutes();
            if (minutes.toString().length == 1) { //if minutes has only one digit, then add the zero
                minutes = "0" + minutes;
            }
            return date.getFullYear() + "-" + month + "-" + day + "+" + hours + ":" + minutes + ":00.000000";
        }

        return {
            setActiveModule: function (mod) {
                setActiveModule(mod);
            },
            getActiveModule: function () {
                return activeModule;
            },
            setTableContent: function () {
                resetVariables();
                beginSetTableContentChain();
            },
            getTableContent: function () {
                return ionicTableData;
            }
        }
    }]);