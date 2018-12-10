# Javascript Tempo Timesheets API for node.js

A node.js module which expands on the functionality of existing jira node modules
to include interaction with the Tempo Timesheets Add-On for Jira.

It can currently be used with the ['jira-connector' node module](https://www.npmjs.com/package/jira-connector) 
and the ['jira' node module](https://www.npmjs.com/package/jira) 
(support for the latter might be dropped in future versions)

Jira REST API documentation can be found [here](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)

Tempo Tìmesheets REST API documentation can be found [here](http://developer.tempo.io/doc/timesheets/api/rest/latest/)

## Example with 'jira-connector' node module

First a JiraClient instance must be created, then a JiraTempoClient instance can be created with the JiraClient as a parameter:

```
JiraClient = require('jira-connector');
jira = new JiraClient(options);
//
JiraTempoClient = require('jiratempo').JiraTempoClient;
jiratempo = new JiraTempoClient(jira, tempoApiVersion);
```

Jira methods can be called on the JiraClient instance, Tempo Timesheets methods are called on the JiraTempoClient instance:

```
jira.issue.getIssue(options, function(err, issue) {});
//
jiratempo.getWorklogById(worklogId, function(err, worklog) {});
```


## Example with 'jira' node module

First a JiraApi instance must be created, then a JiraTempoApi instance can be created with the JiraApi as a parameter:

```
JiraApi = require('jira').JiraApi;
jira = new JiraApi(protocol, host, port, username, password, apiVersion, verbose, strictSSL, oauth, base);
//
JiraTempoApi = require('jiratempo').JiraTempoApi;
jiratempo = new JiraTempoApi(jira, tempoApiVersion);
```

Jira methods can be called on the JiraApi instance, Tempo Timesheets methods are called on the JiraTempoApi instance:

```
jira.findIssue(issueNumber, function(error, issue) {});
//
jiratempo.getWorklogById(worklogId, function(res, worklog) {});
```


## Implemented APIs

- Get worklogs
- Get a single worklog by id
- Create a worklog
- Update a worklog
- Delete a worklog