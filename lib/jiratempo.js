
// extension for existing Jira node modules to include the tempo timesheets add-on
// can currently be used with 'jira-connector' node module or 'jira' node module
// (support for the latter might be dropped in future versions)
//
//
// version for 'jira' node module:
//
//
// example:
//
// JiraApi = require('jira').JiraApi;
// jira = new JiraApi(protocol, host, port, username, password, apiVersion, verbose, strictSSL, oauth, base);
//
// JiraTempoApi = require('jiratempo').JiraTempoApi;
// jiratempo = new JiraTempoApi(jira, tempoApiVersion);
//
// jira.findIssue(issueNumber, function(error, issue) {});
// jiratempo.getWorklogById(worklogId, function(res, worklog) {
//   if (worklog) {
//     console.log(worklog);
//   } else {
//     console.log(res); //'res' will have http response code
//   }
// });
//
//
//
//
// takes an instance of the regular JiraApi and the versionnumber of the tempoApi (tested with 3)
module.exports.JiraTempoApi = function(jiraApi, tempoApiVersion) {

    this.tempoBase = 'rest/tempo-timesheets/';


    // gets all worklogs of a user/project/account/team within a certain time period
    //
    // takes a queries object, possible keys:
    // dateFrom    -> starting date of the time period you wish to get worklogs for (yyyy-MM-dd)
    // dateTo      -> ending date of the time period (doesn't work without dateFrom) (yyyy-MM-dd)
    // username    -> name of the user you wish to get worklogs for
    // projectKey  -> key of the project you wish to get worklogs for
    // accountKey  -> key of the account you wish to get worklogs for
    // teamId      -> id of the team you wish to get worklogs for
    this.getWorklogs = function(queries, callback) {

        var querystring = '';

        if (queries.dateFrom) {
            querystring+='dateFrom='+queries.dateFrom+'&';
        }
        if (queries.dateTo) {
            querystring+='dateTo='+queries.dateTo+'&';
        }
        if (queries.username) {
            querystring+='username='+queries.username+'&';
        }
        if (queries.projectKey) {
            querystring+='projectKey='+queries.projectKey+'&';
        }
        if (queries.accountKey) {
            querystring+='accountKey='+queries.accountKey+'&';
        }
        if (queries.teamId) {
            querystring+='teamId='+queries.teamId+'&';
        }

        var options = {
            rejectUnauthorized: jiraApi.strictSSL,
            uri: jiraApi.makeUri('/worklogs?'+querystring, this.tempoBase, tempoApiVersion),
            method: 'GET'
        };

        jiraApi.doRequest(options, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }
            if (response.statusCode === 200) {
                callback(response.statusCode, JSON.parse(body));
                return;
            }
            callback(response.statusCode);

        });

    };


    // gets a worklog by id
    // takes an id of a worklog you wish to get
    this.getWorklogById = function(worklogId, callback) {

        var options = {
            rejectUnauthorized: jiraApi.strictSSL,
            uri: jiraApi.makeUri('/worklogs/' + worklogId, this.tempoBase, tempoApiVersion),
            method: 'GET'
        };

        jiraApi.doRequest(options, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }
            if (response.statusCode === 200) {
                callback(response.statusCode, JSON.parse(body));
                return;
            }
            callback(response.statusCode);

        });

    };


    // creates a new worklog
    //
    //
    // basic worklogBean example:
    //
    // var worklog = {
    //   timeSpentSeconds: timeSpent,
    //   billedSeconds: timeBilled,
    //   dateStarted: date, (yyyy-MM-dd)
    //   comment: comment,
    //   author: {
    //     name: name
    //   },
    //   issue: {
    //     key: key,
    //     remainingEstimateSeconds: seconds
    //   }
    // };
    //
    //
    // takes a worklogBean of the worklog you wish to create
    this.createWorklog = function(worklog, callback) {

        var options = {
            rejectUnauthorized: jiraApi.strictSSL,
            uri: jiraApi.makeUri('/worklogs/', this.tempoBase, tempoApiVersion),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: worklog
        };

        jiraApi.doRequest(options, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }
            if (response.statusCode === 200) {
                callback(response.statusCode, body);
                return;
            }
            callback(response.statusCode);
        });

    };


    // updates an existing worklog
    //
    // add id of the worklog you wish to update to the worklogBean (otherwise same as bean for createWorklog)
    //
    // takes the updated worklogBean of the worklog you wish to update
    this.updateWorklog = function(worklog, callback) {

        var options = {
            rejectUnauthorized: jiraApi.strictSSL,
            uri: jiraApi.makeUri('/worklogs/' + worklog.id, this.tempoBase, tempoApiVersion),
            method: 'PUT',
            followAllRedirects: true,
            json: true,
            body: worklog
        };

        jiraApi.doRequest(options, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }
            if (response.statusCode === 200) {
                callback(response.statusCode, body);
                return;
            }
            callback(response.statusCode);

        });

    };


    // deletes an existing worklog
    // takes an id of a worklog you wish to delete
    this.deleteWorklog = function(worklogId, callback) {

        var options = {
            rejectUnauthorized: jiraApi.strictSSL,
            uri: jiraApi.makeUri('/worklogs/' + worklogId, this.tempoBase, tempoApiVersion),
            method: 'DELETE',
            followAllRedirects: true,
            json: true
        };

        jiraApi.doRequest(options, function(error, response) {

            if (error) {
                callback(error, null);
                return;
            }
            callback(response.statusCode);

        });

    };

};



// version for 'jira-connector' node module:
//
//
// example:
//
// JiraClient = require('jira-connector');
// jira = new JiraClient(options);
//
// JiraTempoClient = require('jiratempo').JiraTempoClient;
// jiratempo = new JiraTempoClient(jira, tempoApiVersion);
//
// jira.issue.getIssue(options, function(err, issue) {});
// jiratempo.getWorklogById(worklogId, function(err, worklog) {
//   if (err) {
//     console.log(err);
//   }
//   if (worklog) {
//     console.log(worklog);
//   }
// });
//
//
//
//
// takes an instance of the regular JiraConnector and the versionnumber of the tempoApi (tested with 3)
module.exports.JiraTempoClient = function(jiraClient, tempoApiVersion) {

  var url = require('url');

  this.tempoBase = 'rest/tempo-timesheets/';


  // gets all worklogs of a user/project/account/team within a certain time period
  //
  // takes a queries object, possible keys:
  // dateFrom    -> starting date of the time period you wish to get worklogs for (yyyy-MM-dd)
  // dateTo      -> ending date of the time period (doesn't work without dateFrom) (yyyy-MM-dd)
  // username    -> name of the user you wish to get worklogs for
  // projectKey  -> key of the project you wish to get worklogs for
  // accountKey  -> key of the account you wish to get worklogs for
  // teamId      -> id of the team you wish to get worklogs for
  this.getWorklogs = function (queries, callback) {

    var querystring = '';

    if (queries.dateFrom) {
      querystring += 'dateFrom=' + queries.dateFrom + '&';
    }
    if (queries.dateTo) {
      querystring += 'dateTo=' + queries.dateTo + '&';
    }
    if (queries.username) {
      querystring += 'username=' + queries.username + '&';
    }
    if (queries.projectKey) {
      querystring += 'projectKey=' + queries.projectKey + '&';
    }
    if (queries.accountKey) {
      querystring += 'accountKey=' + queries.accountKey + '&';
    }
    if (queries.teamId) {
      querystring += 'teamId=' + queries.teamId + '&';
    }

    var options = {
      uri: this.buildTempoURL('/worklogs?' + querystring),
      method: 'GET',
      followAllRedirects: true,
      json: true
    };

    return jiraClient.makeRequest(options, callback);

  };


  // gets a worklog by id
  // takes an id of a worklog you wish to get
  this.getWorklogById = function(worklogId, callback) {

    var options = {
      uri: this.buildTempoURL('/worklogs/' + worklogId),
      method: 'GET',
      followAllRedirects: true,
      json: true
    };

    return jiraClient.makeRequest(options, callback);

  };


  // creates a new worklog
  //
  //
  // basic worklogBean example:
  //
  // var worklog = {
  //   timeSpentSeconds: timeSpent,
  //   billedSeconds: timeBilled,
  //   dateStarted: date, (yyyy-MM-dd)
  //   comment: comment,
  //   author: {
  //     name: name
  //   },
  //   issue: {
  //     key: key,
  //     remainingEstimateSeconds: seconds
  //   }
  // };
  //
  //
  // takes a worklogBean of the worklog you wish to create
  this.createWorklog = function(worklog, callback) {

    var options = {
      uri: this.buildTempoURL('/worklogs/'),
      method: 'POST',
      followAllRedirects: true,
      json: true,
      body: worklog
    };

    return jiraClient.makeRequest(options, callback);
  };


  // updates an existing worklog
  //
  // add id of the worklog you wish to update to the worklogBean (otherwise same as bean for createWorklog)
  //
  // takes the updated worklogBean of the worklog you wish to update
  this.updateWorklog = function(worklog, callback) {

    var options = {
      uri: this.buildTempoURL('/worklogs/' + worklog.id),
      method: 'PUT',
      followAllRedirects: true,
      json: true,
      body: worklog
    };

    return jiraClient.makeRequest(options, callback);
  };


  // deletes an existing worklog
  // takes an id of a worklog you wish to delete
  this.deleteWorklog = function(worklogId, callback) {

    var options = {
      uri: this.buildTempoURL('/worklogs/' + worklogId),
      method: 'DELETE',
      followAllRedirects: true,
      json: true
    };

    return jiraClient.makeRequest(options, callback);
  };


  this.buildTempoURL = function (path) {
    var apiBasePath = jiraClient.path_prefix + this.tempoBase;
    var requestUrl = url.format({
      protocol: jiraClient.protocol,
      hostname: jiraClient.host,
      port: jiraClient.port,
      pathname: apiBasePath + tempoApiVersion + path
    });

    return decodeURIComponent(requestUrl);
  };
};